package cc.codegen.plugins.BizMyBatis.handler

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

class BizMyBatisHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        def extName = 'biz_mybatis'
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "list_jdbc_type_for_mybatis"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = extHandleItem.callExterior(extName, [
                                type: 'get_all_jdbc_types'
                        ])
                        return ResFunc.ok([value: res])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "get_mybatis_template_files"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = extHandleItem.callExterior(extName, [
                                type: 'get_mybatis_template_files'
                        ])
                        return ResFunc.ok([value: res])
                    }
                },

                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "read_all_files_by_config"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = [];
                        return ResFunc.ok([value: res])
                    }
                },

                // handling logic
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "run_mybatis_task"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = extHandleItem.callExterior(extName, [
                                type: 'run_mybatis_task',
                                *   : params
                        ])
                        return ResFunc.ok([value: res])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "query_mybatis_status"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = extHandleItem.callExterior(extName, [
                                type: 'query_mybatis_status',
                                *   : params
                        ])
                        return ResFunc.ok([value: res])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "query_mybatis_files_for_generated_only"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = extHandleItem.callExterior(extName, [
                                type: 'query_mybatis_files_for_generated_only',
                                *   : params
                        ])
                        return ResFunc.ok([list: res.list])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "cancel_mybatis_task"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = extHandleItem.callExterior(extName, [
                                type: 'cancel_mybatis_task',
                                *   : params
                        ])
                        return ResFunc.ok([value: res])
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
                }

        ]

        )
    }
}
