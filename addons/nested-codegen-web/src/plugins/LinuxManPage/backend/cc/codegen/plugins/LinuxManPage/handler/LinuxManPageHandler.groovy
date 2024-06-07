package cc.codegen.plugins.LinuxManPage.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.PUtils
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import cn.hutool.core.codec.Base32
import cn.hutool.core.util.StrUtil
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class LinuxManPageHandler extends CodeGenPluginHandler {

    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        def docsName = "ubuntu16.04"
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "get_app_lang"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                def arr = ['en_US',
                           'zh_CN',
                           'zh_HK']
                if (arr.indexOf(params['config_page_lang'] as String) == -1) {
                    throw new RuntimeException("Unknown language")
                }
                def menuZipDir = extHandleItem.getStFilesAndExactIfNeeded("${docsName}", "/menu.zip") as File
                def jsonFile = extHandleItem.sfWrapper.getFileWithNoCheck(menuZipDir, (params['config_page_lang'] as String) + ".json")
                def finalLangObj = JSON.parseObject(jsonFile.readLines().join("\n"), Map.class)
                finalLangObj.collect {
                    def eachManObj = it.getValue() as Map
                    def newManObj = [:]
                    eachManObj.each {
//                        def decodeVal = URLDecoder.decode(it.getKey() as String)
//                        if (decodeVal.contains("%")) {
//                            decodeVal = URLDecoder.decode(
//                                    URLDecoder.decode(
//                                            decodeVal
//                                    )
//                            )
//                        }
                        eachManObj[it.getKey()] = it.getValue()
                    }
                }
                return ResFunc.ok([value: finalLangObj])
            }
        },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "get_page_data"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  try {
                                                                      def arr = ['en_US',
                                                                                 'zh_CN',
                                                                                 'zh_HK']
                                                                      if (arr.indexOf(params['config_page_lang'] as String) == -1) {
                                                                          throw new RuntimeException("Unknown language")
                                                                      }
                                                                      def config_page_mandetail_id = params['config_page_mandetail_id'] as String
                                                                      def config_page_manpage_id = params['config_page_manpage_id'] as String
                                                                      if (config_page_manpage_id != 'all' && !config_page_manpage_id.matches("man\\d")) {
                                                                          throw new RuntimeException("Illicit request!")
                                                                      }
                                                                      if (config_page_mandetail_id.contains("..")
                                                                              ||
                                                                              config_page_mandetail_id.contains("/")
                                                                              ||
                                                                              config_page_mandetail_id.contains(":")
                                                                      ) {
                                                                          throw new RuntimeException("Illicit request!")
                                                                      }
                                                                      // handling
                                                                      def thatFile = extHandleItem.getStFilesAndExactIfNeeded("${docsName}", "/${params['config_page_lang']}/${config_page_manpage_id}/${(config_page_mandetail_id)}.html") as File
                                                                      def ctn = thatFile.readLines().join("\n")
                                                                      ctn += "<div class='hidden' data-formatKey><a href='https://codegen.cc'>linux footnote</a></div><div style='color:transparent;height: 1em;'>THE END</div>"
                                                                      return ResFunc.ok([value: ctn.toString()])
                                                                  } catch (Throwable throwable) {
                                                                      return ResFunc.ok(value: """
<div>
<h2>Resource not found.</h2>
<div>
${extHandleItem.isPortalMode() ? "Unavailable" : PUtils.getErrFromE(throwable)}
</div>
</div>
""".toString())
                                                                  }
                                                              }
                                                          },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "transform"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  def res = (bytes_text)
                                                                  return ResFunc.ok([value: res])
                                                              }
                                                          }])
    }

    static void main(String[] args) {
        def a = "static::name//skke";
        a = "c%2525252B%2525252B";
        println(
                URLDecoder.decode(
                        URLDecoder.decode(URLDecoder.decode(URLDecoder.decode(a)))
                )
        )
        println(Base32.encode("static::name"))
//        println(URLEncoder.encode(a))
//        def k = URLEncoder.encode(URLEncoder.encode(a))
//        println(k)
//        println(URLDecoder.decode(URLDecoder.decode(k)))
    }

}
