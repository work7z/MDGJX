package cc.codegen.plugins.RedisDrafts.redis.bean

import redis.clients.jedis.Jedis
import redis.clients.jedis.JedisPool

class SubRedisInstance {
    JedisPool jedisPool;
    Integer databaseIndex;

    SubRedisInstance(JedisPool jedisPool, Integer databaseIndex) {
        this.jedisPool = jedisPool
        this.databaseIndex = databaseIndex
    }

    Jedis getRef() {
        def resource = jedisPool.getResource()
        return resource
    }

    void testConnection() {
        def ref = getRef();
        ref.withCloseable {
            ref.exists(testKey)
        }
    }

    void m1() {
        def ref = getRef();
        ref.withCloseable {
            ref.exists(testKey)
        }
    }

    public static final String testKey = "test-codegen-key"

}
