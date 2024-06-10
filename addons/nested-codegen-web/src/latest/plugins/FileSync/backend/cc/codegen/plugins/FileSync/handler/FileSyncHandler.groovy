package cc.codegen.plugins.FileSync.handler

import bridge_common.utils.AppProxy
import bridge_common.utils.TTT
import cc.codegen.plugins.FileSync.sync.FileSyncHistoryItem
import cc.codegen.plugins.FileSync.sync.I_FilePath_Row
import cc.codegen.plugins.FileSync.sync.I_sync_tasks
import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.cron.JobRunnable
import cc.codegen.plugins.specification.definition.CpSystemRunningTask
import cc.codegen.plugins.specification.definition.NameTask
import cc.codegen.plugins.specification.definition.SaveTableRecord
import cc.codegen.plugins.specification.exp.JobClosedException
import cc.codegen.plugins.specification.services.EachUserHistPayload
import cc.codegen.plugins.specification.services.HistService
import cc.codegen.plugins.specification.utils.PFile
import cc.codegen.plugins.specification.utils.PUtils
import cn.hutool.core.date.DateUtil
import cn.hutool.core.io.FileUtil
import cn.hutool.cron.CronUtil
import cn.hutool.cron.Scheduler
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cn.hutool.cron.TaskExecutor
import cn.hutool.cron.listener.TaskListener
import org.apache.commons.lang3.StringUtils

import java.nio.file.StandardCopyOption
import java.util.regex.Pattern

class FileSyncHandler extends CodeGenPluginHandler {

    public static SaveTableRecord formatRecord(SaveTableRecord saveTableRecord) {
        if (saveTableRecord.getRecordStatus() != null) {
            saveTableRecord.setRecordStatus(saveTableRecord.getRecordStatus())
        }
        return saveTableRecord
    }

    public static void handleException(ExtHandleItem ext, String id, Throwable e, JobRunnable jobRunnable) {
        ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: e.getMessage(),
                recordStatus: e.getMessage() == 'JOE_CLOSED_NORMALLY' ? 'SYSTEM' : "ERROR")), jobRunnable.getErrLogRef())
    }

    public static void callTaskId(Map<String, Object> params, ExtHandleItem ext, String id, NameTask nameTask) {
        PUtils.highrun({
            try {
                AppProxy.init(params)
                nameTask.execute()
            } catch (Throwable e) {
                handleException(ext, id, e, ext.fn_getFromRedis('FileSync_jobRunnable') as JobRunnable)
            }
        })
    }

    @Override
    ResFunc init(String action, Map<String, Object> params) {
        CronUtil.setMatchSecond(true);
        AppProxy.init(params)
        def ext = new ExtHandleItem(params)
        ext.with {
            def fn_jobRunnable = {
                return new JobRunnable(ext) {
                    Set<String> taskIdSet = new HashSet<>();
                    Scheduler scheduler = new Scheduler()
                    List<NameTask> nameTaskList = []

                    @Override
                    void whenClosed() {
                        AppProxy.init(params)
                        if (this.scheduler && this.scheduler.isStarted()) {
                            taskIdSet.each {
                                NameTask nameTask = (NameTask) scheduler.getTask(it)
                                ext.saveTableRecord(nameTask.getId(), formatRecord(new SaveTableRecord(recordMessage: TTT.t("Closed"),
                                        recordStatus: "STOPPED")), getErrLogRef())
                            }
                            scheduler.stop(true)
                        }
                    }

                    @Override
                    void handleException(Throwable e) {
                        AppProxy.init(params)
                        e.printStackTrace()
                    }

                    @Override
                    Object call() throws Exception {
                        AppProxy.init(params)
                        scheduler.setMatchSecond(true)
                        // start the scheduler
                        scheduler.addListener(new TaskListener() {
                            @Override
                            void onStart(TaskExecutor executor) {
                                NameTask nameTask = (NameTask) executor.getTask();
                                getOutLogRef().info("[${nameTask.getName()}] " + "started the task.")
                            }

                            @Override
                            void onSucceeded(TaskExecutor executor) {
                                NameTask nameTask = (NameTask) executor.getTask();
                                getOutLogRef().fine("[${nameTask.getName()}] finished executing the task.")
                            }

                            @Override
                            void onFailed(TaskExecutor executor, Throwable exception) {
                                if (exception instanceof JobClosedException) {
                                    //
                                } else {
                                    NameTask nameTask = (NameTask) executor.getTask();
                                    def taskId = nameTask.getId();
                                    ext.saveTableRecord(taskId, formatRecord(new SaveTableRecord(recordMessage: exception.getMessage(),
                                            recordStatus: "ERROR")), getOutLogRef())
                                    getErrLogRef().severe("[${nameTask.getName()}] An Error Occurred.")
                                    getErrLogRef().severe(PUtils.getErrFromE(exception))
                                }
                            }
                        })
                        HistService histService = new HistService(ext, "FileSync")
                        checkPoint()
                        def jobRunnable = this;
                        def fn_launch = {
                            def allHistItems = histService.getAllHistConfigItems()
                            allHistItems.each { EachUserHistPayload eachUserHistPayload ->
                                checkPoint()
                                def crtHistItem = eachUserHistPayload.getHistItemListWithReadable(ext)
                                crtHistItem.each {
                                    def eachHistoryItem = it.call()
                                    if (eachHistoryItem.getNotEmpty()) {
                                        def fileSyncHistoryItem = eachHistoryItem.formatSnapJSON(FileSyncHistoryItem.class)
                                        if (fileSyncHistoryItem.sync_tasks) {
                                            fileSyncHistoryItem.sync_tasks.each { I_sync_tasks i_sync_task ->
                                                def id = i_sync_task.getId()
                                                if (scheduler.getTask(id) == null) {
                                                    if (i_sync_task.getRecord_type() != 'stored') {
                                                        getOutLogRef().info("Skipped the disabled item: ${i_sync_task.getName()}")
                                                        return;
                                                    }
                                                    try {
                                                        ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Initializing..."),
                                                                recordStatus: "PREPARATION")), getOutLogRef())
                                                        def val_nameTask = new NameTask() {
                                                            @Override
                                                            void execute() {
                                                                AppProxy.init(params)
                                                                synchronized (id.toString().intern()) {
                                                                    ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Started copying the files..."),
                                                                            recordStatus: "START")), getOutLogRef())
                                                                    checkPoint()
                                                                    sleep(100)
                                                                    checkPoint()
                                                                    def crtTask = i_sync_task;
                                                                    def fn_format_path_list = { List<I_FilePath_Row> file_logic ->
                                                                        if (file_logic == null) {
                                                                            file_logic = []
                                                                        }
                                                                        file_logic.each {
                                                                            def file = new PFile(it.getFilepath())
                                                                            if (!file.exists()) {
                                                                                throw new RuntimeException(TTT.t("Source Directory cannot be empty, please check: {0}",
                                                                                        it.getFilepath()))
                                                                            }
                                                                        }
                                                                        return file_logic;
                                                                    }
                                                                    def countFilesCtn = 0;
                                                                    def from_path_list = fn_format_path_list(crtTask.getFrom_path())
                                                                    def to_path_list = crtTask.getTo_path()
                                                                    if (from_path_list == null || from_path_list.isEmpty()) {
                                                                        throw new RuntimeException(TTT.t("Source directories cannot be empty."))
                                                                    }
                                                                    if (to_path_list == null || to_path_list.isEmpty()) {
                                                                        throw new RuntimeException(TTT.t("Destination directories cannot be empty."))
                                                                    }
                                                                    def copyMode = crtTask.getCopy_mode()
                                                                    def ignore_files_list = crtTask.getIgnore_files().collect({
                                                                        return Pattern.compile(it.getFilename())
                                                                    })
                                                                    if (copyMode == 'clean_dest_before_copying') {
                                                                        ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Removing destination files before copying..."),
                                                                                recordStatus: "CLEANING")), getOutLogRef())
                                                                        to_path_list.each {
                                                                            def toFile = ext.sfWrapper.getFileWithNoCheck(it.getFilepath())
                                                                            ext.sfWrapper.del(toFile)
                                                                        }
                                                                    }
                                                                    def fn_copyFile = { File source, File dest ->
                                                                        countFilesCtn++
//                                                                        def findObj = ignore_files_list.find { eachPatt -> return source.toString().matches(eachPatt)
//                                                                        }
                                                                        def findObj = ignore_files_list.find { eachPatt -> return source.toString().find(eachPatt) != null }
                                                                        if (findObj != null) {
                                                                            println "skipping the files"
                                                                            return;
                                                                        }
                                                                        if (dest.exists() && !(source.isDirectory() == dest.isDirectory() || source.isFile() == dest.isFile())) {
                                                                            getOutLogRef().warning(TTT.t("Two files type does not matched, the one is {0} and the other one is {0}",
                                                                                    source.getAbsolutePath(),
                                                                                    dest.getAbsolutePath()))
                                                                        }
                                                                        if (copyMode == 'do_not_overwrite') {
                                                                            if (dest.exists()) {
                                                                                return;
                                                                            }
                                                                        }
                                                                        if (source.isFile()) {
                                                                            ext.sfWrapper.mkdirsP(dest)
                                                                        } else {
                                                                            ext.sfWrapper.mkdirs(dest)
                                                                        }
                                                                        if (copyMode == 'atomic_move_files') {
                                                                            // move operation
                                                                            FileUtil.move(source, dest, true)
                                                                        } else {
                                                                            // copy operation
                                                                            if (copyMode == 'copying_files_simply') {
                                                                                if (dest.exists() && (
                                                                                        dest.lastModified() == source.lastModified()
                                                                                                &&
                                                                                                dest.length() == source.length()
                                                                                )) {
                                                                                    return;
                                                                                }
                                                                            }
                                                                            FileUtil.del(dest)
                                                                            def last = source.lastModified()
                                                                            FileUtil.copyFile(source, dest, StandardCopyOption.REPLACE_EXISTING)
                                                                            dest.setLastModified(last)
                                                                        }
                                                                    }
                                                                    from_path_list.each { eachFromPath ->
                                                                        to_path_list.each { eachToPath ->
                                                                            def fromFile = ext.sfWrapper.getFileWithNoCheck(eachFromPath.getFilepath())
                                                                            def toFile = ext.sfWrapper.getFileWithNoCheck(eachToPath.getFilepath())
                                                                            if (fromFile.isFile()) {
                                                                                ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Copied the single file..."),
                                                                                        recordStatus: "COPYING")), getOutLogRef())
                                                                                fn_copyFile(fromFile, toFile)
                                                                            } else {
                                                                                fromFile.eachFileRecurse { eachFromFile ->
                                                                                    ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Copied {0} files...", countFilesCtn),
                                                                                            recordStatus: "COPYING")), getOutLogRef())
                                                                                    if (eachFromFile.isDirectory()) {
                                                                                        return;
                                                                                    }
                                                                                    checkPoint()
                                                                                    def subFilePath = eachFromFile.toString().replaceFirst(fromFile.toString(), "")
                                                                                    def eachToFile = ext.sfWrapper.getFileWithNoCheck(toFile, subFilePath)
//                                                                                    def findObj = ignore_files_list.find { eachPatt -> return eachFromFile.toString().find(eachPatt) != null }
//                                                                                    if (findObj != null) {
//                                                                                        println "skipping the files"
//                                                                                        return;
//                                                                                    } else {
//                                                                                    }
                                                                                    fn_copyFile(eachFromFile, eachToFile);
                                                                                    if (crtTask.getDelayAfterCopyingAFile() != null && crtTask.getDelayAfterCopyingAFile().trim() != '') {
                                                                                        if (StringUtils.isNumeric(crtTask.getDelayAfterCopyingAFile())) {
                                                                                            sleep(crtTask.getDelayAfterCopyingAFile().toInteger())
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    checkPoint()
                                                                    ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Synchronized at {0}", DateUtil.formatTime(new Date())),
                                                                            recordStatus: "SYNCHRONIZED",
                                                                            lastFinishedTime: System.currentTimeMillis())), getOutLogRef())
                                                                }
                                                            }

                                                            @Override
                                                            String getName() {
                                                                return i_sync_task.getName()
                                                            }

                                                            @Override
                                                            String getId() {
                                                                return i_sync_task.getId()
                                                            }
                                                        }
                                                        nameTaskList.add(val_nameTask)
                                                        scheduler.schedule(id, i_sync_task.getCron_expr(), val_nameTask)
                                                        taskIdSet.add(id)
                                                        ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Waiting for the timing"),
                                                                recordStatus: "IDLE")), getOutLogRef())
                                                    } catch (Throwable e) {
                                                        e.printStackTrace()
                                                        handleException(ext, id, e, jobRunnable)
                                                        throw e;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        fn_launch()

                        checkPoint()

                        scheduler.start()
                        ext.fn_setFromRedis('FileSync_scheduler', scheduler)
                        ext.fn_setFromRedis('FileSync_taskIdSet', taskIdSet)
                        ext.fn_setFromRedis('FileSync_nameTaskList', nameTaskList)
                        ext.fn_setFromRedis('FileSync_jobRunnable', jobRunnable)
                        while (1) {
                            checkPoint()
                            fn_launch()
                            sleep(1200)
                        }
                    }
                }
            }
            def task = new CpSystemRunningTask(external: false,
                    prop: "FileSync",
                    description: "Usages: Synchronized your files and directories locally.",
                    name: "File Sync Service",
                    fn_internalRefCloseable: fn_jobRunnable,
                    fn_internalRefCallable: fn_jobRunnable,)
            ext.addTask(task)
            return ResFunc.ok([:])
        }
    }

    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        AppProxy.init(params)
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "synconefile"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                Scheduler scheduler = ext.fn_getFromRedis('FileSync_scheduler')
                def id = ext.params['id']
                if (scheduler != null) {
                    List<NameTask> fileSync_nameTaskList = ext.fn_getFromRedis('FileSync_nameTaskList')
                    if (fileSync_nameTaskList != null) {
                        fileSync_nameTaskList.each {
                            NameTask nameTask = it;
                            if (nameTask != null && nameTask.getId() == id) {
                                callTaskId(params, ext, id, nameTask)
                            }
                        }
                    }
//                            Set<String> taskIdSet = ext.fn_getFromRedis('FileSync_taskIdSet')
//                            taskIdSet.each {
//                                NameTask nameTask = (NameTask) scheduler.getTask(it)
//                                if (nameTask != null) {
//                                    PUtils.highrun({
//                                        nameTask.execute()
//                                    })
//                                }
//                            }
                }
                def res = 1
                return ResFunc.ok([value: res])
            }
        },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "syncfiles"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                                                                  Scheduler scheduler = ext.fn_getFromRedis('FileSync_scheduler')
                                                                  if (scheduler != null) {
                                                                      List<NameTask> fileSync_nameTaskList = ext.fn_getFromRedis('FileSync_nameTaskList')
                                                                      if (fileSync_nameTaskList != null) {
                                                                          fileSync_nameTaskList.each {
                                                                              NameTask nameTask = it;
                                                                              callTaskId(params, ext, nameTask.getId(), nameTask)
                                                                          }
                                                                      }
//                            Set<String> taskIdSet = ext.fn_getFromRedis('FileSync_taskIdSet')
//                            taskIdSet.each {
//                                NameTask nameTask = (NameTask) scheduler.getTask(it)
//                                if (nameTask != null) {
//                                    PUtils.highrun({
//                                        nameTask.execute()
//                                    })
//                                }
//                            }
                                                                  }
                                                                  def res = 1
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
                                                          }])
    }

}
