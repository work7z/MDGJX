
package cc.codegen.plugins.EncryptSM4.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class EncryptSM4Handler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        params['return_error'] = true
        def en_de_api_name = "encryption_and_decryption"
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
            @Override
            String getType() {
                return "init_key"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext) {
                def res = ext.callExterior(en_de_api_name, [
                        g_encode_mode: params['g_encode_mode'],
                        type: 'sm4_get_pri_key'
                ])
                return ResFunc.ok([value: res])
            }
        },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "encrypt"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  if(extHandleItem.empty){
                                                                      return ResFunc.noEmpty()
                                                                  }
                                                                  def res = extHandleItem.callExterior(en_de_api_name, [
                                                                          g_encode_mode: params['g_encode_mode'],
                                                                          type       : 'sm4_encrypt_by_bytes',
                                                                          bytes_value: bytes_text,
                                                                          pri_key    : params['config_prikey_value']
                                                                  ])
                                                                  return ResFunc.ok([value: res.result])
                                                              }
                                                          },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "decrypt"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  if(extHandleItem.empty){
                                                                      return ResFunc.noEmpty()
                                                                  }
                                                                  def res = extHandleItem.callExterior(en_de_api_name, [
                                                                          g_encode_mode: params['g_encode_mode'],
                                                                          type       : 'sm4_decrypt_by_bytes',
                                                                          bytes_value: bytes_text,
                                                                          pri_key    : params['config_prikey_value']
                                                                  ])
                                                                  return ResFunc.ok([value: res.result])
                                                              }
                                                          },
        ])
    }
}
