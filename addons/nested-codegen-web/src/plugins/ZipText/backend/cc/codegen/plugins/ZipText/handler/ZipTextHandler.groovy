package cc.codegen.plugins.ZipText.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import cn.hutool.core.codec.Base64
import cn.hutool.core.util.ZipUtil
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class ZipTextHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "encode"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                def res = Base64.encode(ZipUtil.gzip(bytes_text), "UTF-8")
                return ResFunc.ok([value: res])
            }
        },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "decode"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  def finval = new String(ZipUtil.unGzip(Base64.decode(value)), "UTF-8")
                                                                  return ResFunc.ok([value: finval])
//                                                                  def decodeBytes = Base64.decode(value, "UTF-8")
//                                                                  def res = ZipUtil.unGzip(
//                                                                          decodeBytes
//                                                                  )
//                                                                  return ResFunc.ok([value: new String(res, "UTF-8")])
                                                              }
                                                          },])
    }
}
