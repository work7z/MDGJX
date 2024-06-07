package cc.codegen.plugins.CDNTool100.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cn.hutool.core.date.DateUtil
import cn.hutool.core.thread.ThreadUtil
import cn.hutool.http.HttpUtil
import com.alibaba.fastjson.JSON

import java.util.concurrent.Callable
import java.util.concurrent.Future

class CDNTool100Handler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        def getLibFile = { extHandleItem ->
            def allFile = getLibDirByName("cdn_resources_1.5.0", params)
            def subDir = null;
            allFile.eachDirRecurse {
                if (it.getName() == 'sub') {
                    subDir = it;
                }
            }
            def libraryJson = extHandleItem.sfWrapper.getFileWithNoCheck(subDir.getParentFile(),
                    "libraries.min.json");
            return libraryJson;
        }

        return handleValueFromTextOrFile(action, params, [
                //
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "update_cdn_lib_from_online"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def CDN_update_lib_flag = extHandleItem.fn_getFromRedis('CDN_update_lib_flag')
                        def todayStr = DateUtil.today()
                        File libraryJson = getLibFile(extHandleItem)
                        try {
                            synchronized ("lock-for-cdn-update".intern()) {
                                if (CDN_update_lib_flag != todayStr) {
                                    def libraryURL = "https://api.cdnjs.com/libraries?fields=name,description,github"
                                    def libraryRes = HttpUtil.get(libraryURL)
                                    def libJSON = JSON.parseObject(libraryRes, Map.class)
                                    def libArr = []
                                    libJSON.results.each { def eachResult ->
                                        def starNum = eachResult.github == null ? 0 : eachResult.github.stargazers_count;
                                        libArr.push([eachResult.name,
                                                     eachResult.description,
                                                     starNum,])
                                    }
                                    libraryJson.write(JSON.toJSONString(libArr, true))
                                    extHandleItem.getSfWrapper().getFileWithNoCheck(
                                            libraryJson.toString() + "_lastupdated"
                                    ).write(System.currentTimeMillis() + "")
                                }
                            }
                        } catch (Throwable eee) {
                            eee.printStackTrace()
                            throw eee;
                        }
                        return ResFunc.ok([libraries: 1])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "get_cdn_lib"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        synchronized ("lock-for-cdn-update".intern()) {
                            def libraryJson = getLibFile(extHandleItem)
                            def libraries = JSON.parseArray(libraryJson.getText("UTF-8"))
                            def lastUpdatedTimestamp = null;
                            try {
                                def bfile = extHandleItem.getSfWrapper().getFileWithNoCheck(
                                        (libraryJson).toString() + "_lastupdated"
                                )
                                if (!extHandleItem.sfWrapper.empty(bfile)) {
                                    lastUpdatedTimestamp = bfile.getText("UTF-8")
                                }
                            } catch (Throwable ee) {
                                ee.printStackTrace()
                            }
                            return ResFunc.ok([lastUpdatedTimestamp: lastUpdatedTimestamp, libraries: libraries])
                        }
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "update_cdn_detail"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        setAsExpiredTime(params, 20)
                        synchronized ("lock-for-cdn-update".intern()) {
                            synchronized ("lock-for-cdn-detail".intern()) {
                                def libraryJson = getLibFile(extHandleItem) as File
                                def libraries_root = JSON.parseArray(libraryJson.getText("UTF-8"))
                                def id = noJumpText(params['id'] as String)
                                def minJSON = extHandleItem.sfWrapper.getFileWithNoCheck(libraryJson.getParentFile(),
                                        "sub/${id}.min.json");
                                def lastUpdateFile = extHandleItem.sfWrapper.getFileWithNoCheck(libraryJson.getParentFile(),
                                        "sub/${id}.last_updated2");
                                def todayStr = DateUtil.today()
                                if (extHandleItem.sfWrapper.empty(lastUpdateFile) || (
                                        lastUpdateFile.getText("UTF-8") != todayStr
                                )) {
                                    def a = ThreadUtil.execAsync(new Callable<Object>() {
                                        @Override
                                        Object call() throws Exception {
                                            def searchDetailURL = "https://api.cdnjs.com/libraries/${id}?fields=name,author,description,filename,version,repository,autoupdate,assets,versions,keywords,license"
                                            def searchDetailRes = JSON.parseObject(HttpUtil.get(searchDetailURL), Map.class)
                                            def npmName = searchDetailRes.name;
                                            if (searchDetailRes.autoupdate && searchDetailRes.autoupdate.source == 'npm') {
                                                npmName = searchDetailRes.autoupdate.target
                                            }
                                            searchDetailRes.versions = searchDetailRes.versions.reverse()
                                            searchDetailRes.assets = searchDetailRes.versions.collect({
                                                def crt_version = it
                                                return JSON.parseObject(HttpUtil.get("https://api.cdnjs.com/libraries/${id}/${crt_version}?fields=files,version"), Map.class)
                                            })
                                            libraries_root.each {
                                                if (searchDetailRes.name == it[0]) {
                                                    searchDetailRes.stars = it[2]
                                                }
                                            }
                                            searchDetailRes.npmName = npmName
                                            minJSON.write(JSON.toJSONString(searchDetailRes))
                                            lastUpdateFile.write(todayStr)
                                            return null;
                                        }
                                    })
                                    a.get()
                                }
                                return ResFunc.ok([ok: 1])
                            }
                        }
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "get_cdn_detail"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        synchronized ("lock-for-cdn-update".intern()) {
                            synchronized ("lock-for-cdn-detail".intern()) {
                                def libraryJson = getLibFile(extHandleItem) as File
                                def id = noJumpText(params['id'] as String)
                                def minJSON = extHandleItem.sfWrapper.getFileWithNoCheck(libraryJson.getParentFile(),
                                        "sub/${id}.min.json")
                                def hasDetailValue = !extHandleItem.sfWrapper.empty(minJSON);
                                def obj = [:]
                                if (hasDetailValue) {
                                    obj = JSON.parseObject(minJSON.getText("UTF-8"), Map.class)
                                }
                                return ResFunc.ok([hasDetailValue: hasDetailValue, obj: obj])
                            }
                        }
                    }
                }
                //
        ])
    }


    static void main(String[] args) {
    }

}
