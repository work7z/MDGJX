package cc.codegen.plugins.RedisDrafts.redis.factory

import bridge_common.FContext
import cc.codegen.plugins.RedisDrafts.redis.bean.RedisConfig
import cc.codegen.plugins.RedisDrafts.redis.bean.RedisConnectionBox
import cn.hutool.core.lang.Assert

class RedisFactory {

    public static void closeConnection(RedisConfig redisConfig) {
        synchronized (redisConfig.configId.intern()) {
            def configId = redisConfig.getConfigId()
            Assert.notEmpty(configId)
            def prevInst = innerGetByConfigId(configId)
            if (prevInst != null) {
                RedisConnectionBox a = prevInst;
                a.close()
            }
        }
    }

    public static RedisConnectionBox getAndOpenConnection(RedisConfig redisConfig) {
        def a = getConnection(redisConfig)
        a.connect();
        return a
    }

    private static RedisConnectionBox innerGetByConfigId(String configId){
        def prevInst = FContext.fn_getFromRedis(configId)
        if(prevInst != null && prevInst.getClass() != RedisConnectionBox.class){
            prevInst = null;
        }
        return prevInst;
    }

    public static RedisConnectionBox getConnection(RedisConfig redisConfig) {
        synchronized (redisConfig.configId.intern()) {
            def configId = redisConfig.getConfigId()
            Assert.notEmpty(configId)
            def prevInst = innerGetByConfigId(configId)
            if (prevInst == null) {
                prevInst = new RedisConnectionBox(redisConfig)
                FContext.fn_setFromRedis(configId, prevInst)
            }
            return prevInst;
        }
    }

    public static boolean hasThatConnExisted(RedisConfig redisConfig) {
        synchronized (redisConfig.configId.intern()) {
            def configId = redisConfig.getConfigId()
            Assert.notEmpty(configId)
            def prevInst = innerGetByConfigId(configId)
            return prevInst != null
        }
    }

}
