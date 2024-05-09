package cc.codegen.plugins.specification.handle

import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cc.codegen.plugins.specification.utils.ToolWrapper

class PortalCanCallSubDefinitions {
    public static List<HandleTypeAndValue> getMyDefinitions() {
        return [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return 'qrcode_decode'
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext) {
                        def params = ext.params;
                        def fileRef = params['fileRef'] as String
                        def file = ext.sfWrapper.getFileWithNoCheck(fileRef)
                        if (!file.exists()) {
                            throw new RuntimeException("Invalid File Reference")
                        }
                        def resValue = ext.callExterior("qr_code_handler", [
                                type: 'decode',
                                file: file
                        ])
                        return ResFunc.ok([
                                value: resValue['value']
                        ])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "list_all_ext_tabs"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext) {
                        def fn_hist_action_call = ext.params['fn_hist_action_call']
                        def res = fn_hist_action_call('list_hist', [
                                TABLE_ID: ext.params['extId']
                        ])
                        return ResFunc.ok(res)
                    }
                }
        ]
    }
}
