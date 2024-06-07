package cc.codegen.plugins.Caniuse.handler

import bridge_common.utils.AppProxy
import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.definition.AccessLockByExt
import cc.codegen.plugins.specification.definition.SyncableCloudFile
import cc.codegen.plugins.specification.utils.PUtils
import cn.hutool.cache.impl.TimedCache
import com.alibaba.fastjson.JSON
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class CaniuseHandler extends CodeGenPluginHandler {
    public static final String KEY_CANIUSE_MAP_RESOURCE = "KEY_CANIUSE_MAP_RESOURCE"
    public static final String KEY_CANIUSE_MAP_INIT_FLAG = "KEY_CANIUSE_MAP_INIT_FLAG"
    public static final String KEY_CANIUSE_MAP_REFRESH_REF = "KEY_CANIUSE_MAP_REFRESH_REF"
    static def refreshMapRef = new TimedCache<>(300 * 1000)

    public void runCheckInit(ExtHandleItem ext) {
        def params = ext.params
        def lib_dir_caniuse_data_2023 = getLibDirByName("caniuse_data_2023", params)
        try {
            def val_KEY_CANIUSE_MAP_REFRESH_REF = refreshMapRef.get(KEY_CANIUSE_MAP_REFRESH_REF)
            if (val_KEY_CANIUSE_MAP_REFRESH_REF == null || ext.twa.isDevMode()) {
                // 1. initialize local file
                // 2. pass function as its argument, so as to apply it into both cloud and local
                def dataJsonLocalFile = lib_dir_caniuse_data_2023.subFile("data.json_local")
                if (dataJsonLocalFile != null) {
                    SyncableCloudFile syncableCloudFile = new SyncableCloudFile(ext,
                            "/meta/caniuse/data.json",
                            dataJsonLocalFile.getAbsolutePath(),
                            ext.twa.isDevMode() ? 10 : 60,
                            { File file -> return PUtils.validJSONFile(file)
                            })
                    syncableCloudFile.applyByFile({ File file ->
                        def val_parseJSONFileIfPossible = PUtils.parseJSONFileIfPossible(file)
                        if (val_parseJSONFileIfPossible != null) {
                            def map_10 = val_parseJSONFileIfPossible
                            Map m1 = map_10.agents
                            m1.eachWithIndex { Map.Entry<Object, Object> entry, int i ->
                                entry.getValue().versions = null
                            }
                            def data_keys = []
                            Map data = map_10.data
                            def willPutFnArr = []
                            data.eachWithIndex { Map.Entry<Object, Object> entry, int i ->
                                data_keys.push([entry.getKey(), [
                                        k: entry.value.keywords,
                                        t: entry.value.title]])
                                def newStats = [:];
                                Map statForMap = entry.getValue().stats;
                                statForMap.eachWithIndex { Map.Entry<Object, Object> entry_forBrowser, int i_forBrowser ->
                                    Map rawStatCrtMap = entry_forBrowser.value
                                    def nextStatCrtMapArr = []
                                    def sortArrNumArr = rawStatCrtMap.keySet().toList()
                                    sortArrNumArr.each { String crtVerName ->
                                        def crtVerStatus = rawStatCrtMap[crtVerName]
                                        nextStatCrtMapArr.push([
                                                version: crtVerName,
                                                value  : crtVerStatus,
                                        ])
                                    }
                                    newStats[entry_forBrowser.key] = nextStatCrtMapArr
                                }
                                willPutFnArr.push({

                                })
                                entry.getValue().stats = newStats
                                statForMap = null;
                            }

                            map_10.data_keys = data_keys
                            ext.fn_setFromRedis(KEY_CANIUSE_MAP_RESOURCE, map_10)
                            ext.fn_setFromRedis(KEY_CANIUSE_MAP_INIT_FLAG, 1)
                            refreshMapRef.put(KEY_CANIUSE_MAP_REFRESH_REF, 1)
                        }
                    })
                }
            }
        } catch (Throwable e) {
            e.printStackTrace()
        }
    }

    @Override
    ResFunc init(String action, Map<String, Object> params) {
        AppProxy.init(params)
        def ext = new ExtHandleItem(params)
        AccessLockByExt accessLockByExt = new AccessLockByExt(ext, "prefix-caniuse-lck")
        try {
            PUtils.highrun({
                while (true) {
                    accessLockByExt.checkPoint()
                    runCheckInit(ext)
                    sleep(5000)
                }
            })
        } catch (Throwable e) {
            e.printStackTrace()
            throw e;
        } finally {
//            lck.unlock()
        }
        return super.init(action, params)
    }

    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        def fn_waitInitFlagFn = { ExtHandleItem ext ->
            def i = 0;
            while (i++ <= 10) {
                def initFlag = ext.fn_getFromRedis(KEY_CANIUSE_MAP_INIT_FLAG)
                if (initFlag != null) {
                    break;
                } else {
                    sleep(500)
                }
            }
        }
        return handleValueFromTextOrFile(action, params, [
                //
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "caniuse_init"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                        setAsExpiredTime(params, 60)
                        fn_waitInitFlagFn(ext)
                        def caniuse_map_resource = ext.fn_getFromRedis(KEY_CANIUSE_MAP_RESOURCE)
                        if (caniuse_map_resource == null) {
                            return ResFunc.ok([keys: [], not_yet_inited: 1])
                        }
                        return ResFunc.ok([
                                b       : 1,
                                keys    : caniuse_map_resource.data_keys,
                                statuses: caniuse_map_resource.statuses,
                                cats    : caniuse_map_resource.cats,
                                updated : caniuse_map_resource.updated,
                                eras    : caniuse_map_resource.eras,
                                agents  : caniuse_map_resource.agents,
                        ])
                    }
                },

                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "get_caniuse_detail"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                        setAsExpiredTime(params, 30)
                        fn_waitInitFlagFn(ext)
                        def id = params['id']
                        def caniuse_map_resource = ext.fn_getFromRedis(KEY_CANIUSE_MAP_RESOURCE)
                        if (caniuse_map_resource == null) {
                            return ResFunc.ok([results: [], not_yet_inited: 1])
                        }
                        return ResFunc.ok([detailObj: caniuse_map_resource.data[id]])
                    }
                },
                //
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "mvn_search"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                        setAsExpiredTime(params, 30)
                        fn_waitInitFlagFn(ext)
                        def search_str = params['search_str']
                        def caniuse_map_resource = ext.fn_getFromRedis(KEY_CANIUSE_MAP_RESOURCE)
                        if (caniuse_map_resource == null) {
                            return ResFunc.ok([results: [], not_yet_inited: 1])
                        }
                        def arr = []
                        return ResFunc.ok([results: arr, b: caniuse_map_resource.data_keys])
                    }
                },
        ])
    }
}
