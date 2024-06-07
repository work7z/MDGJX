package cc.codegen.plugins.RedisDrafts.handler

import bridge_common.FContext
import cc.codegen.plugins.RedisDrafts.redis.bean.RedisConfig
import cc.codegen.plugins.RedisDrafts.redis.factory.RedisFactory
import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cc.codegen.plugins.specification.utils.PUtils
import cn.hutool.core.lang.Assert
import cn.hutool.core.thread.ThreadUtil
import cn.hutool.core.util.StrUtil
import redis.clients.jedis.Jedis
import redis.clients.jedis.JedisPool
import redis.clients.jedis.ScanParams

import java.util.concurrent.Callable
import java.util.concurrent.TimeUnit

class RedisDraftsHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        println JedisPool.class.getCanonicalName()
        ExtHandleItem ext = new ExtHandleItem(params)
        FContext.initByExt(ext)
        RedisConfig redisConfig = null;
        if (params.dbconfig) {
            redisConfig = ext.twa.parse(ext.twa.toJSON(params.dbconfig), RedisConfig.class)
        }
        def fn_create_connection = {
            def connBox = RedisFactory.getConnection(redisConfig)
            connBox.connect()
        }
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "test_my_api"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        return ResFunc.ok([value: JedisPool.class.getCanonicalName()])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "test_connection"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = (bytes_text)
                        Assert.notEmpty(redisConfig, "RedisConfig")
                        redisConfig.setConfigId(PUtils.uuid())
                        def connBox = RedisFactory.getAndOpenConnection(redisConfig)
                        connBox.getSubByIndex(0).testConnection()
                        return ResFunc.ok([value: res])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "create_connection"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        fn_create_connection()
                        return ResFunc.ok([value: 1])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "close_connection"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = (bytes_text)
                        RedisFactory.closeConnection(redisConfig)
                        return ResFunc.ok([value: res])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "read_redis_all_keys"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = (bytes_text)
                        fn_create_connection()
                        def connBox = RedisFactory.getAndOpenConnection(redisConfig)
                        def configId = redisConfig.getConfigId()
                        def dbIndex = redisConfig.getDbIndex()
                        Assert.notEmpty(dbIndex, "DB_INDEX")
                        def configKeyFile = redisConfig.fn_getConfigKeyListFile(ext, dbIndex)
                        def allFiles = []
                        if (!ext.sf.empty(configKeyFile)) {
                            configKeyFile.eachLine {
                                allFiles.add(it)
                            }
                        }
                        return ResFunc.ok([value: allFiles])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "get_keyvalue_for_redis_by_key"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = (bytes_text)
                        fn_create_connection()
                        def connBox = RedisFactory.getAndOpenConnection(redisConfig)
                        def configId = redisConfig.getConfigId()
                        def dbIndex = redisConfig.getDbIndex()
                        def dbKey = redisConfig.getDbKey() as String
                        Assert.notEmpty(dbIndex, "DB_INDEX")
                        def ref = connBox.getSubByIndex(dbIndex).getRef()
                        ref.withCloseable {
                            String val = ref.get(dbKey)
                            return ResFunc.ok([value: val])
                        }
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "reload_redis_all_keys"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        // only read top 500 records
                        setAsExpiredTime(params, 15)
                        def crtBegin = 0
                        def step = 500 //  ext.twa.isDevMode() ? 10 : 100;
                        def crtEnd = step;
                        def res = (bytes_text)
                        def connBox = RedisFactory.getAndOpenConnection(redisConfig)
                        def configId = redisConfig.getConfigId()
                        def dbIndex = redisConfig.getDbIndex()
                        Assert.notEmpty(dbIndex, "DB_INDEX")
                        def configKeyFile = redisConfig.fn_getConfigKeyListFile(ext, dbIndex)
                        def tmpConfigKeyFile = redisConfig.fn_getConfigKeyListFileTmp(ext, dbIndex)
                        synchronized (tmpConfigKeyFile.getAbsolutePath().intern()) {
                            def subConn = connBox.getSubByIndex(dbIndex)
                            def redis = subConn.getRef()
                            redis.withCloseable {
                                ext.sf.del(tmpConfigKeyFile)
                                tmpConfigKeyFile.createNewFile()
                                // start reading it
                                ScanParams scanParams = new ScanParams().count(step);
                                if (!StrUtil.isEmpty(redisConfig.getKeyword())) {
                                    if (!redisConfig.getKeyword().contains("*")) {
                                        redisConfig.setKeyword("*${redisConfig.getKeyword()}*".toString())
                                    }
                                    scanParams = scanParams.match(redisConfig.getKeyword().trim())
                                }
                                def scanResults = redis.scan(crtBegin, scanParams)
                                if (scanResults == null || scanResults.result.empty) {
                                    // do nothing
                                } else {
                                    scanResults.result.each {
                                        tmpConfigKeyFile.append((it + "\n").toString())
                                    }
                                }
                            }
                        }
                        if (!tmpConfigKeyFile.exists()) {
                            tmpConfigKeyFile.createNewFile()
                        }
                        ext.sf.copyFile(tmpConfigKeyFile, configKeyFile)
                        ext.sf.del(tmpConfigKeyFile)

                        return ResFunc.ok([
                                value   : 1,
                                crtBegin: crtBegin,
                                crtEnd  : crtEnd
                        ])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "update_that_key"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        fn_create_connection()
                        def connBox = RedisFactory.getAndOpenConnection(redisConfig)
                        def configId = redisConfig.getConfigId()
                        def dbIndex = redisConfig.getDbIndex()
                        def dbKey = redisConfig.getDbKey() as String
                        def dbValue = redisConfig.getDbValue()
                        connBox.getSubByIndex(dbIndex).getRef().withCloseable {
                            it.set(dbKey, dbValue)
                        }
                        return ResFunc.ok([value: 1])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "delete_that_key"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        fn_create_connection()
                        def connBox = RedisFactory.getAndOpenConnection(redisConfig)
                        def configId = redisConfig.getConfigId()
                        def dbIndex = redisConfig.getDbIndex()
                        def dbKey = redisConfig.getDbKey() as String
                        connBox.getSubByIndex(dbIndex).getRef().withCloseable {
                            it.del(dbKey)
                        }
                        return ResFunc.ok([value: 1])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "get_crt_conn_info"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def hasExist = RedisFactory.hasThatConnExisted(redisConfig)
                        def crtConnectionStatus = [
                                closed: !hasExist
                        ]
                        return ResFunc.ok([value: crtConnectionStatus])
                    }
                },
        ])
    }
}
