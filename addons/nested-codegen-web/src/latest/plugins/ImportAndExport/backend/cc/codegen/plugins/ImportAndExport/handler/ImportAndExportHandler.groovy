package cc.codegen.plugins.ImportAndExport.handler

import bridge_common.utils.AppProxy
import bridge_common.utils.TTT
import cc.codegen.plugins.ImportAndExport.handler.dto.SaveFileEntity
import cc.codegen.plugins.ImportAndExport.handler.dto.SaveMetaStructure
import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.utils.Countable
import cc.codegen.plugins.specification.utils.PUtils
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cn.hutool.core.date.DateUtil
import cn.hutool.core.exceptions.UtilException
import cn.hutool.core.util.ZipUtil
import com.alibaba.fastjson.JSON

import java.nio.charset.Charset

class ImportAndExportHandler extends CodeGenPluginHandler {
    public static core_meta_file_name = "codegen-picturesque-view.json"

    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        AppProxy.init(params)
        if (isPortalMode(params)) {
            return ResFunc.ok([NO_PERM: 1])
        }
        return handleValueFromTextOrFile(action, params, [
//                new HandleTypeAndValue() {
//                    @Override
//                    String getType() {
//                        return "clean_the_result"
//                    }
//
//                    @Override
//                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
//                        def msgId = extHandleItem.params['msg_id']
//                        extHandleItem.setMsgFromRedis(msgId, null)
//                        extHandleItem.setMsgObjFromRedis(msgId, null)
//                        return ResFunc.ok([value: 1])
//                    }
//                },
new HandleTypeAndValue() {
    @Override
    String getType() {
        return "get_crt_msg"
    }

    @Override
    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
        def msgId = extHandleItem.params['msg_id']
        def msg = extHandleItem.getMsgFromRedis(msgId)
        def msgObj = extHandleItem.getMsgObjFromRedis(msgId)
        return ResFunc.ok([value: msg, msgObj: msgObj])
    }
},
new HandleTypeAndValue() {
    @Override
    String getType() {
        return "proceed_my_request"
    }

    @Override
    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
        def ext = extHandleItem
        def msgId = extHandleItem.params['msg_id']
        extHandleItem.setMsgObjFromRedis(msgId, [:])
        extHandleItem.setMsgFromRedis(msgId, TTT.t("Handling the action..."))
        PUtils.highrun({
            def fn_updateMsg = { String msg -> extHandleItem.setMsgFromRedis(msgId, "[${DateUtil.formatTime(new Date())}]: ${msg}".toString())
            }
            try {
                Countable countable = new Countable()
                AppProxy.init(params)
                def twa = extHandleItem.twa;
                def sf = ext.sf;
                def currentWorkspaceDir = twa.getCurrentActiveWorkspace()
                def option_values = params.option_values as List<String>;
                def action_id = params.action_id as String
                def action_type = params.action_type as String
                List<String> finalReport = []
                def fn_addForLoggingReport = { String msg -> finalReport.add("[${DateUtil.formatTime(new Date())}]: ${msg}".toString())
                }
                def fn_combine_update = { String msg ->
                    fn_updateMsg(msg)
                    fn_addForLoggingReport(msg)
                }
                def msgObj = [report: finalReport, result_file_name: null]
                extHandleItem.setMsgObjFromRedis(msgId, msgObj)
                def myBaseTempDir = twa.getTempDirForCurrentWorkspace()
                switch (action_id) {
                    case 'import':
                        // preparing for the temp dir
                        def msg2 = TTT.t("Handling the import action by using the file uploaded from the user...")
                        fn_addForLoggingReport(msg2)
                        fn_updateMsg(msg2)
                        def m_UUID_val = PUtils.uuid()
                        def upload_file_id = params['upload_file_id'] as String
                        def root_saveTempDirRoot = sf.getFileWithNoCheck(myBaseTempDir, "imp_${m_UUID_val}")
                        sf.mkdirs(root_saveTempDirRoot)
                        fn_addForLoggingReport(TTT.t("Created a temporary directory for exacting the archive file, whose location is {0}", root_saveTempDirRoot.toString()))
                        // start decompressing the archive file
                        def file_upload_file_id = sf.getFileWithNoCheck(upload_file_id)
                        if (sf.empty(file_upload_file_id)) {
                            fn_updateMsg("Error: " + TTT.t("The file uploaded from the user is empty or deleted, please kindly check or re-upload it."))
                        } else {
                            def msg200 = TTT.t("Detected the archive file, of which the length is {0}KB", "" + (long) (file_upload_file_id.length() / 1024))
                            fn_updateMsg(msg200)
                            fn_addForLoggingReport(msg200)
                            // decompressing it
                            try {
                                ZipUtil.unzip(file_upload_file_id, root_saveTempDirRoot, Charset.forName("UTF-8"))
                            } catch (UtilException e2) {
                                fn_updateMsg(TTT.t("Failed to decompress it, please check your file firstly."))
                                fn_addForLoggingReport(TTT.t("Error: {0}", PUtils.getErrFromE(e2)))
                            }
                            def totalCtn = 0;
                            def corePictureMetaJSONFile = null;
                            root_saveTempDirRoot.eachFileRecurse {
                                totalCtn++;
                                if (it.getName() == core_meta_file_name) {
                                    corePictureMetaJSONFile = it;
                                }
                            }
                            fn_updateMsg(TTT.t("Decompressed. Found {0} files.", totalCtn))
                            fn_addForLoggingReport(TTT.t("Decompressed. Found {0} files.", totalCtn))
                            if (corePictureMetaJSONFile == null) {
                                throw new RuntimeException(TTT.t("Unable to find the core profile in the archive file, please check the formatting of your archive firstly, we need an unmodified ZIP formatting file."))
                            } else {
                                fn_combine_update(TTT.t("Detected the core file, of which its location is {0}", corePictureMetaJSONFile.getAbsolutePath()))
                                def s_files_dir = sf.getFileWithNoCheck(corePictureMetaJSONFile.getParentFile(), "files")
                                def saveMetaStructure = JSON.parseObject(sf.readAsStringWithSafe(corePictureMetaJSONFile), SaveMetaStructure.class)
                                def merge_strategy = params['merge_strategy']
                                fn_combine_update(TTT.t("Detected the import mode: {0}", merge_strategy))
                                fn_addForLoggingReport(TTT.t("Import the data from the JSON: {0}", "RECEIVED"))
                                def dir_data_database = sf.getFileWithNoCheck(currentWorkspaceDir, "data/database")
                                saveMetaStructure.files.each { eachSaveFileEntity ->
                                    def each_id = eachSaveFileEntity.getId()
                                    def each_src_id_mapped_file = sf.getFileWithNoCheck(s_files_dir, each_id)
                                    def each_dest_id_mapped_file = sf.getFileWithNoCheck(currentWorkspaceDir, eachSaveFileEntity.getRelativePath())
                                    sf.mkdirsP(each_dest_id_mapped_file)
                                    def is_crt_data_database_mode = each_dest_id_mapped_file.getAbsolutePath().startsWith(dir_data_database.getAbsolutePath())
                                    def should_write_it = true;
                                    switch (merge_strategy) {
                                        case 'overwrite':
                                            if (each_dest_id_mapped_file.exists()) {
                                                if (is_crt_data_database_mode) {
                                                    // data
                                                } else {
                                                    // not data
                                                }
                                            }
                                            break;
                                        case 'merge':
                                            if (each_dest_id_mapped_file.exists()) {
                                                if (is_crt_data_database_mode) {
                                                    // data
                                                } else {
                                                    // not data
                                                    fn_combine_update(TTT.t("Unable to merge the file as it's a database file, of which the location is {0}", each_dest_id_mapped_file.getAbsolutePath()))
                                                    should_write_it = false;
                                                }
                                            }
                                            break;
                                    }
                                    if (should_write_it) {
                                        if (each_dest_id_mapped_file.exists()) {
                                            sf.del(each_dest_id_mapped_file)
                                        }
                                        fn_updateMsg(TTT.t("Importing the resource file: {0}",eachSaveFileEntity.getRelativePath()))
                                        sf.copyFile(each_src_id_mapped_file, each_dest_id_mapped_file)
                                    }
                                }
                                fn_addForLoggingReport(TTT.t("Finished importing the archive file."))
                            }
                        }
                        break;
                    case 'export':
                        def msg2 = TTT.t("Being back the workspace {0} up...", currentWorkspaceDir.getAbsolutePath())
                        fn_addForLoggingReport(msg2)
                        fn_updateMsg(msg2)
                        def allExtDataFiles = [];
                        sf.getFileWithNoCheck(currentWorkspaceDir, "data/database").listFiles().each { File eachExtDir ->
                            eachExtDir.eachFileRecurse { File eachFile ->
                                if (eachFile.isFile()) {
                                    allExtDataFiles.add(eachFile)
                                }
                            }
                        }
                        def m_UUID_val = PUtils.uuid()
                        def root_saveTempDirRoot = sf.getFileWithNoCheck(myBaseTempDir, "exp_${m_UUID_val}")
                        def handleLogicArr = [[id   : "workspace_data",
                                               files: [*allExtDataFiles,
                                                       sf.getFileWithNoCheck(currentWorkspaceDir, "database/sharing_gen_server_root/ref.mv.db"),]],
                                              [id   : 'clipboard_history_data',
                                               files: [sf.getFileWithNoCheck(currentWorkspaceDir, "database/notes_clipboard/ref.mv.db"),]],
                                              [id   : 'cache_data',
                                               files: [sf.getFileWithNoCheck(currentWorkspaceDir, "temp/v_cache.db"),]]]
                        fn_addForLoggingReport(TTT.t("Created a temporary directory for storing prepared files, whose location is {0}", root_saveTempDirRoot.toString()))
                        def saveJSONFile = sf.getFileWithNoCheck(root_saveTempDirRoot, core_meta_file_name)
                        // init begin
                        def saveJSONValue = new SaveMetaStructure()
                        saveJSONValue.setOptionValues(option_values)
                        saveJSONValue.setActionId(action_id)
                        saveJSONValue.setActionType(action_type)
                        // init end
                        def root_SaveFilesDir = sf.getFileWithNoCheck(root_saveTempDirRoot, "files")
                        handleLogicArr.each { eachLogicMap ->
                            def id = eachLogicMap.id as String
                            def files = eachLogicMap.files as List<File>;
                            if (option_values.contains(id)) {
                                fn_addForLoggingReport(TTT.t("Included the option {0} with {1} files", id, files.size()))
                                files.each { eachFile ->
                                    fn_updateMsg(TTT.t("Found the file: {0}", eachFile.getAbsolutePath()))
                                    SaveFileEntity crtSaveFileEntity = new SaveFileEntity()
                                    crtSaveFileEntity.setId(PUtils.uuid())
                                    def relativePath = eachFile.getAbsolutePath()
                                            .replaceFirst(currentWorkspaceDir.getAbsolutePath(), "")
                                    crtSaveFileEntity.setRelativePath(relativePath)
                                    fn_updateMsg(TTT.t("Copying the file to the temporary directory: {0}", eachFile.getAbsolutePath()))
                                    def newFile = sf.getFileWithNoCheck(root_SaveFilesDir, "${crtSaveFileEntity.getId()}")
                                    sf.mkdirsP(newFile)
                                    sf.copyFile(eachFile, newFile)
                                    saveJSONValue.files.add(crtSaveFileEntity)
                                    fn_updateMsg(TTT.t("Copied the file to the temporary directory: {0}", eachFile.getAbsolutePath()))
                                }
                            } else {
                                fn_addForLoggingReport(TTT.t("Excluded the option {0}", id))
                            }
                        }
                        fn_updateMsg(TTT.t("Packing the files into the one archive file..."))
                        saveJSONFile.write(PUtils.toJSONWithBeautify(saveJSONValue))
                        def saveZipFile = sf.getFileWithNoCheck(myBaseTempDir, "r_${m_UUID_val}.zip")
                        fn_addForLoggingReport(TTT.t("Created a ZIP file for compressing files, whose location is {0}", saveZipFile.toString()))
                        ZipUtil.zip(saveZipFile, Charset.forName("UTF-8"), false, root_saveTempDirRoot)
                        msgObj.result_file_name = saveZipFile.getName()
                        fn_updateMsg(TTT.t("Packed the files into the one archive file."))
                        break;
                }
                fn_addForLoggingReport(TTT.t("Exited at {0}", DateUtil.formatDateTime(new Date())))
                fn_updateMsg(TTT.t("Done. Elapsed time: {0}", countable.countMiles()))
            } catch (Throwable e) {
                e.printStackTrace()
                fn_updateMsg(TTT.t("An Error Occurred, {0}", PUtils.getErrFromE(e)))
            }
        })
        return ResFunc.ok([value: 1])
    }
}])
    }
}
