package cc.codegen.plugins.FileArchive.handler

import bridge_common.utils.AppProxy
import bridge_common.utils.TTT
import cc.codegen.plugins.FileArchive.sync.FileArchiveHistoryItem
import cc.codegen.plugins.FileArchive.sync.I_FilePath_Row
import cc.codegen.plugins.FileArchive.sync.I_archive_tasks
import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.cron.JobRunnable
import cc.codegen.plugins.specification.definition.CpSystemRunningTask
import cc.codegen.plugins.specification.definition.NameTask
import cc.codegen.plugins.specification.definition.SaveTableRecord
import cc.codegen.plugins.specification.exp.JobClosedException
import cc.codegen.plugins.specification.services.EachUserHistPayload
import cc.codegen.plugins.specification.services.HistService
import cc.codegen.plugins.specification.utils.DZipWrapper
import cc.codegen.plugins.specification.utils.FileSizeFormatter
import cc.codegen.plugins.specification.utils.PFile
import cc.codegen.plugins.specification.utils.JSONFileWrapper
import cc.codegen.plugins.specification.utils.MyDateUtils
import cc.codegen.plugins.specification.utils.PUtils
import cn.hutool.core.date.DateUtil
import cn.hutool.cron.CronUtil
import cn.hutool.cron.Scheduler
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cn.hutool.cron.TaskExecutor
import cn.hutool.cron.listener.TaskListener
import org.apache.commons.lang3.StringUtils

import java.util.regex.Pattern

class FileArchiveHandler extends CodeGenPluginHandler {

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
                handleException(ext, id, e, ext.fn_getFromRedis('FileArchive_jobRunnable') as JobRunnable)
            }
        })
    }

    @Override
    ResFunc init(String action, Map<String, Object> params) {
        CronUtil.setMatchSecond(true);
        AppProxy.init(params)
        def ext = new ExtHandleItem(params)
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
                    HistService histService = new HistService(ext, "FileArchive")
                    checkPoint()
                    def jobRunnable = this;
                    def fn_launch = {
                        def allHistItems = histService.getAllHistConfigItems()
                        allHistItems.each { EachUserHistPayload eachUserHistPayload ->
                            checkPoint()
                            def crtHistItem = eachUserHistPayload.getHistItemListWithReadable(ext)
                            crtHistItem.each { fn_eachHistoryItem ->
                                def eachHistoryItem = fn_eachHistoryItem.call()
                                if (eachHistoryItem.getNotEmpty()) {
                                    def fileArchiveHistoryItem = eachHistoryItem.formatSnapJSON(FileArchiveHistoryItem.class)
                                    if (fileArchiveHistoryItem.sync_tasks) {
                                        def allTasks = fileArchiveHistoryItem.sync_tasks
                                        allTasks.each { I_archive_tasks task ->
                                            def id = task.getId()
                                            if (scheduler.getTask(id) == null) {
                                                if (task.getRecord_type() != 'stored') {
                                                    getOutLogRef().info("Skipped the disabled item: ${task.getName()}")
                                                    return;
                                                }
                                                try {
                                                    ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Initializing..."),
                                                            recordStatus: "PREPARATION")), getOutLogRef())
                                                    def val_nameTask = new NameTask() {
                                                        @Override
                                                        void execute() {
                                                            def todayStr = DateUtil.formatDate(new Date())
                                                            Long lastFileSize = 0;
                                                            AppProxy.init(params)
                                                            synchronized (id.toString().intern()) {
                                                                ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Started packing the files..."),
                                                                        recordStatus: "START")), getOutLogRef())
                                                                checkPoint()
                                                                sleep(100)
                                                                checkPoint()
                                                                def crtTask = task;
                                                                def fn_format_path_list = { List<I_FilePath_Row> file_logic ->
                                                                    if (file_logic == null) {
                                                                        file_logic = []
                                                                    }
                                                                    file_logic.each { eachFilePathRow ->
                                                                        def file = new PFile(eachFilePathRow.getFilepath())
                                                                        if (!file.exists() && !file.hasLock()) {
                                                                            throw new RuntimeException(TTT.t("Source Directory cannot be empty, please check: {0}",
                                                                                    eachFilePathRow.getFilepath()))
                                                                        }
                                                                    }
                                                                    return file_logic;
                                                                }
                                                                def countFilesCtn = 0;
                                                                def ignoreFilesCtn = 0;
                                                                def from_path_list = fn_format_path_list(crtTask.getFrom_path())
                                                                def to_path_list = crtTask.getTo_path()
                                                                if (from_path_list == null || from_path_list.isEmpty()) {
                                                                    throw new RuntimeException(TTT.t("Source directories cannot be empty."))
                                                                }
                                                                if (to_path_list == null || to_path_list.isEmpty()) {
                                                                    throw new RuntimeException(TTT.t("Destination directories cannot be empty."))
                                                                }
                                                                def copyMode = crtTask.getCopy_mode()
                                                                def ignore_files_list = crtTask.getIgnore_files().collect({ eachRow -> return Pattern.compile(eachRow.getFilename())
                                                                })

                                                                to_path_list.each { eachToPath ->
                                                                    def toDir = ext.sfWrapper.getFileWithNoCheck(eachToPath.getFilepath())
                                                                    def fn_getSubZipFile = { String fileName ->
                                                                        // get zip file
                                                                        return ext.sfWrapper.getFileWithNoCheck(toDir, fileName + ".zip")
                                                                    }
                                                                    def fn_actualFileName = { Integer seqId -> return PUtils.formatDateFileName(task.file_name_formatting, seqId)
                                                                    }
                                                                    JSONFileWrapper jsonFileWrapper = new JSONFileWrapper(new PFile(toDir, "${task.getMeta_file_name()}/${task.getId()}.txt"),
                                                                            [
                                                                                    crtMaximumId: 0,
                                                                                    archives    : []
                                                                            ]
                                                                    )
                                                                    Integer crtMaximumId = 0;
                                                                    jsonFileWrapper.readJSON { Map m ->
                                                                        crtMaximumId = m.crtMaximumId
                                                                    }
                                                                    File toFile = null;
                                                                    def lastFileName = null;
                                                                    REF_LOOP:
                                                                    while (true) {
                                                                        crtMaximumId++
                                                                        def crtFileName = fn_actualFileName(crtMaximumId)
                                                                        if (crtFileName != null && lastFileName == crtFileName) {
                                                                            getErrLogRef().warning("Out of the loop for fear of the perpetual iteration.")
                                                                            break;
                                                                        } else {
                                                                            lastFileName = crtFileName;
                                                                        }
                                                                        toFile = fn_getSubZipFile(crtFileName)
                                                                        if (toFile.exists()) {
                                                                            def quit_this_switch = false;
                                                                            SUB_LOOP:
                                                                            switch (task.clash_resolution) {
                                                                                case 'int_solution':
                                                                                    if (!task.file_name_formatting.contains("SEQUENCEID")) {
                                                                                        task.file_name_formatting = task.file_name_formatting + "_SEQUENCEID"
                                                                                    }
                                                                                    break;
                                                                                case 'overwrite':
                                                                                    quit_this_switch = true;
                                                                                    break;
                                                                            }
                                                                            if (quit_this_switch) {
                                                                                break;
                                                                            }
                                                                        } else {
                                                                            break REF_LOOP;
                                                                        }
                                                                    }
                                                                    jsonFileWrapper.modifyJSON { Map m ->
                                                                        m.crtMaximumId = crtMaximumId
                                                                        return m;
                                                                    }
                                                                    ext.sfWrapper.mkdirsP(toFile)
                                                                    DZipWrapper dZipWrapper = DZipWrapper.create(task.withSrcDir,
                                                                            new PFile(toFile.getAbsolutePath()),
                                                                            task.charset == null || task.charset.isBlank() ? 'UTF-8' : task.charset)
                                                                    dZipWrapper.withCloseable { d_zip ->
                                                                        d_zip.lock()
                                                                        from_path_list.each { eachFromPath ->
                                                                            def allFiles = [];
                                                                            def fromFile = ext.sfWrapper.getFileWithNoCheck(eachFromPath.getFilepath())
                                                                            def fn_copyFile = { File source, File dest ->
                                                                                def findObj = ignore_files_list.find { eachPatt -> return source.toString().find(eachPatt) != null }
                                                                                if (findObj != null) {
                                                                                    ignoreFilesCtn++
                                                                                    ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Ignoring {0} files...", ignoreFilesCtn),
                                                                                            recordStatus: "PACKING")), null)
                                                                                    println "skipping the files"
                                                                                    return;
                                                                                }
                                                                                countFilesCtn++
//                                                                                allFiles.add(source)
                                                                                checkPoint()
                                                                                d_zip.addFile(source, fromFile.getCanonicalPath())
                                                                                checkPoint()
                                                                            }
                                                                            if (fromFile.isFile()) {
                                                                                ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Packing the single file..."),
                                                                                        recordStatus: "PACKING")), getOutLogRef())
                                                                                fn_copyFile(fromFile, toDir)
                                                                            } else {
                                                                                fromFile.eachFileRecurse { eachFromFile ->
                                                                                    ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Packing {0} files...", countFilesCtn),
                                                                                            recordStatus: "PACKING")), null)
                                                                                    if (eachFromFile.isDirectory()) {
                                                                                        return;
                                                                                    }
                                                                                    checkPoint()
                                                                                    fn_copyFile(eachFromFile, null);
                                                                                    if (crtTask.getDelayAfterCopyingAFile() != null && crtTask.getDelayAfterCopyingAFile().trim() != '') {
                                                                                        if (StringUtils.isNumeric(crtTask.getDelayAfterCopyingAFile())) {
                                                                                            sleep(crtTask.getDelayAfterCopyingAFile().toInteger())
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        lastFileSize += dZipWrapper.zipFile.length()
                                                                        jsonFileWrapper.modifyJSON { Map m ->
                                                                            def uuid = PUtils.uuid()
                                                                            m.archives.push([id       : uuid,
                                                                                             charset  : dZipWrapper.getCharset(),
                                                                                             filepath : dZipWrapper.getZipFile().toString(),
                                                                                             filename : dZipWrapper.getZipFile().getName(),
                                                                                             date     : todayStr,
                                                                                             timestamp: System.currentTimeMillis(),])
                                                                        }
                                                                        jsonFileWrapper.modifyJSON { Map m ->
                                                                            List archives = m.archives;
                                                                            archives = archives.sort {
                                                                                return it.timestamp * -1
                                                                            }
                                                                            def keepArchivesMap = [:]
                                                                            def long_time_archives_strategy = task.getLong_time_archives_strategy()
                                                                            if (long_time_archives_strategy == 'disable') {
                                                                                getOutLogRef().info(TTT.t("Disabled the long time archives strategy."))
                                                                            } else {
                                                                                def remainDays = long_time_archives_strategy.replace('remain_', '').trim().toInteger()
                                                                                def recentDaysArr = MyDateUtils.getRecentDays(remainDays).collect {
                                                                                    return DateUtil.formatDate(it)
                                                                                }
                                                                                archives.each { eachArchive ->
                                                                                    if (recentDaysArr.contains(eachArchive.date)) {
                                                                                        if (keepArchivesMap[eachArchive.date] == null || keepArchivesMap[eachArchive.date].timestamp < eachArchive.timestamp) {
                                                                                            keepArchivesMap[eachArchive.date] = eachArchive
                                                                                        }
                                                                                    }
                                                                                }
                                                                                def values_keep_archives = keepArchivesMap.values()
                                                                                archives = archives.findAll { eachAr ->
                                                                                    def isPass = false;
                                                                                    if (eachAr.date == todayStr) {
                                                                                        isPass = true;
                                                                                    } else if (values_keep_archives.findIndexOf { eachObj -> return eachObj.id == eachAr.id
                                                                                    } != -1) {
                                                                                        isPass = true;
                                                                                    }
                                                                                    if (!isPass) {
                                                                                        getOutLogRef().info(TTT.t("Deleted the expired file due to the daily files strategy, whose file path is {0}",
                                                                                                eachAr.filepath))
                                                                                        ext.sfWrapper.del(new PFile(eachAr.filepath))
                                                                                    }
                                                                                    return isPass
                                                                                }
                                                                            }
                                                                            def keepArchiveSize = 0;
                                                                            def maximum_archive_files = task.getMaximum_archive_files()
                                                                            if (maximum_archive_files != null && !maximum_archive_files.isBlank()) {
                                                                                archives = archives.findAll {
                                                                                    keepArchiveSize++
                                                                                    def isPass = keepArchiveSize <= maximum_archive_files.toInteger()
                                                                                    if (!isPass) {
                                                                                        ext.sfWrapper.del(new PFile(it.filepath))
                                                                                        getOutLogRef().info(TTT.t("Deleted the expired file due to the maximum archive files rule, whose file path is {0}",
                                                                                                it.filepath))
                                                                                    }
                                                                                    return isPass;
                                                                                }
                                                                            }
                                                                            m.archives = archives
                                                                        }
                                                                    }
                                                                }
                                                                checkPoint()
                                                                ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Finished at {0}, its total size is {1}", DateUtil.formatTime(new Date()),
                                                                        FileSizeFormatter.format(lastFileSize),),
                                                                        recordStatus: "PACKED",
                                                                        lastFinishedTime: System.currentTimeMillis())), getOutLogRef())
                                                            }
                                                        }

                                                        @Override
                                                        String getName() {
                                                            return task.getName()
                                                        }

                                                        @Override
                                                        String getId() {
                                                            return task.getId()
                                                        }
                                                    }
                                                    nameTaskList.add(val_nameTask)
                                                    scheduler.schedule(id, task.getCron_expr(), val_nameTask)
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
                    ext.fn_setFromRedis('FileArchive_scheduler', scheduler)
                    ext.fn_setFromRedis('FileArchive_taskIdSet', taskIdSet)
                    ext.fn_setFromRedis('FileArchive_nameTaskList', nameTaskList)
                    ext.fn_setFromRedis('FileArchive_jobRunnable', jobRunnable)
                    while (1) {
                        checkPoint()
                        fn_launch()
                        sleep(1200)
                    }
                }
            }
        }
        def task = new CpSystemRunningTask(external: false,
                prop: "FileArchive",
                description: "Usages: Back your files and directories up locally.",
                name: "File Archive Service",
                fn_internalRefCloseable: fn_jobRunnable,
                fn_internalRefCallable: fn_jobRunnable,)
        ext.addTask(task)
        return ResFunc.ok([:])
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
                Scheduler scheduler = ext.fn_getFromRedis('FileArchive_scheduler')
                def id = ext.params['id']
                if (scheduler != null) {
                    List<NameTask> FileArchive_nameTaskList = ext.fn_getFromRedis('FileArchive_nameTaskList')
                    if (FileArchive_nameTaskList != null) {
                        FileArchive_nameTaskList.each {
                            NameTask nameTask = it;
                            if (nameTask != null && nameTask.getId() == id) {
                                callTaskId(params, ext, id, nameTask)
                            }
                        }
                    }
//                            Set<String> taskIdSet = ext.fn_getFromRedis('FileArchive_taskIdSet')
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
                                                                  Scheduler scheduler = ext.fn_getFromRedis('FileArchive_scheduler')
                                                                  if (scheduler != null) {
                                                                      List<NameTask> FileArchive_nameTaskList = ext.fn_getFromRedis('FileArchive_nameTaskList')
                                                                      if (FileArchive_nameTaskList != null) {
                                                                          FileArchive_nameTaskList.each {
                                                                              NameTask nameTask = it;
                                                                              callTaskId(params, ext, nameTask.getId(), nameTask)
                                                                          }
                                                                      }
//                            Set<String> taskIdSet = ext.fn_getFromRedis('FileArchive_taskIdSet')
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
