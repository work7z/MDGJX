package cc.codegen.plugins.RedisDrafts.redis.bean

import bridge_common.FContext
import redis.clients.jedis.JedisPool
import redis.clients.jedis.JedisPoolConfig
import redis.clients.jedis.Protocol

class RedisConnectionBox implements Closeable, Cloneable {
    RedisConfig redisConfig;
    List<SubRedisInstance> subInstArr = []

    RedisConnectionBox(RedisConfig redisConfig) {
        this.redisConfig = redisConfig
    }

    private JedisPool getInstByIndex(Integer databaseIndex) {
        // POOl CONFIG
        JedisPoolConfig config = new JedisPoolConfig()
        config.setTestOnBorrow(true)
        config.setTestOnCreate(true)
        config.setTestOnReturn(true)
        config.setMaxTotal(5)
        // DETAIL CONFIG
        def ssl = redisConfig.getUseSSL();
        def host = redisConfig.getHost()
        def port = redisConfig.getPort();
        def connectionTimeout = redisConfig.getConnectTimeout();
        def soTimeout = redisConfig.getSocketTimeout();
        Integer timeout = null;
        def password = redisConfig.password;
        def database = databaseIndex;
        String clientName = null;
        // utilities
        def strOr = { String value, String defaultValue ->
            if (value == null || value.trim().length() == 0) {
                return defaultValue
            } else {
                return value;
            }
        }
        def intOr = { Integer value, Integer defaultValue ->
            if (value == null) {
                return defaultValue
            } else {
                return value;
            }
        }
        // CONFIG END
        JedisPool jedisPool = new JedisPool(config,
                // 地址
                strOr(host, Protocol.DEFAULT_HOST) as String,
                // 端口
                intOr(port, Protocol.DEFAULT_PORT) as Integer,
                // 连接超时
                intOr(connectionTimeout, intOr(timeout, Protocol.DEFAULT_TIMEOUT)) as Integer,
                // 读取数据超时
                intOr(soTimeout, intOr(timeout, Protocol.DEFAULT_TIMEOUT)) as Integer,
                // 密码
                strOr(password, null) as String,
                // 数据库序号
                intOr(database, Protocol.DEFAULT_DATABASE) as Integer,
                // 客户端名
                strOr(clientName, "CodeGen") as String,
                // 是否使用SSL
                ssl as Boolean,
                // SSL相关，使用默认
                null, null, null)
        return jedisPool
    }

    private boolean isConnectedBefore = false;

    void connect() {
        synchronized (redisConfig.configId.intern()) {
            if (isConnectedBefore) {
                return;
            }
            def allArr = [];
            for (def databaseIndex = 0; databaseIndex <= 15; databaseIndex++) {
                def inst = getInstByIndex(databaseIndex)
                def eachSubInst = new SubRedisInstance(inst, databaseIndex)
                allArr.push(eachSubInst)
            }
            this.subInstArr = allArr
            isConnectedBefore = true;
        }
    }


    @Override
    void close() throws IOException {
        synchronized (redisConfig.configId.intern()) {
            subInstArr.each {
                it.jedisPool.close()
            }
            FContext.fn_delFromRedis(this.redisConfig.configId)
            isConnectedBefore=false;
        }
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return new RedisConnectionBox(redisConfig)
    }



    SubRedisInstance getSubByIndex(Integer databaseIndex) {
        return subInstArr.find({ it.getDatabaseIndex() == databaseIndex })
    }
}
