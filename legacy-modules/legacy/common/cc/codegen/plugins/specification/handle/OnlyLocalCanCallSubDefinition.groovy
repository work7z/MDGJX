package cc.codegen.plugins.specification.handle

import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cc.codegen.plugins.specification.utils.PCScriptLogFile
import cc.codegen.plugins.specification.utils.ToolWrapper

class OnlyLocalCanCallSubDefinition {
    public static List<HandleTypeAndValue> getMyDefinitions() {
        return [

                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "pcscript_read_logs"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext) {
                        def params = ext.params
                        def pid = ext.twa.noJumpText(params['pid'] as String)
                        def log_id = ext.twa.noJumpText(params['log_id'] as String)
                        PCScriptLogFile pcScriptLogFile = new PCScriptLogFile(
                                pid,
                                log_id,
                                ext
                        )
                        def file = pcScriptLogFile.file;
                        def logsFile = pcScriptLogFile.logsFile
                        def errFile = pcScriptLogFile.errFile
                        return ResFunc.ok([
                                msg: ext.sf.readAsStringWithSafe(logsFile),
                                err: ext.sf.readAsStringWithSafe(errFile)
                        ])
                    }
                },

                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "fn_common_get_temp_dir"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext) {
                        def tempDir = ToolWrapper.init(ext.params).getTempDirForCurrentWorkspace()
                        def tempFIleUSEr = ext.sfWrapper.getFileWithNoCheck(tempDir, "users/${ext.twa.uuid()}");
                        ext.sfWrapper.mkdirs(tempFIleUSEr)
                        return ResFunc.ok([value: tempFIleUSEr])
                    }
                },

                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "fn_file_status"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext) {
                        def filepath = ext.params['filepath'] as String
                        def r_filepath = ext.sfWrapper.getFileWithNoCheck(filepath)
                        return ResFunc.ok([exist  : r_filepath.exists(),
                                           length : r_filepath.length(),
                                           is_file: r_filepath.isFile() && r_filepath.exists()])
                    }
                },

        ]
    }
}
