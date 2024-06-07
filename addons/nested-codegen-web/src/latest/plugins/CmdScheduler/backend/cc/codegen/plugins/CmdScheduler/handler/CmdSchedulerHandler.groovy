package cc.codegen.plugins.CmdScheduler.handler

import bridge_common.utils.AppProxy
import bridge_common.utils.TTT
import cc.codegen.plugins.CmdScheduler.sync.CmdSchedulerHistoryItem
import cc.codegen.plugins.CmdScheduler.sync.I_sync_tasks
import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.cron.JobRunnable
import cc.codegen.plugins.specification.definition.CpSystemRunningTask
import cc.codegen.plugins.specification.definition.NameTask
import cc.codegen.plugins.specification.definition.SaveTableRecord
import cc.codegen.plugins.specification.exp.JobClosedException
import cc.codegen.plugins.specification.services.EachUserHistPayload
import cc.codegen.plugins.specification.services.HistService
import cc.codegen.plugins.specification.utils.PCScriptLogFile
import cc.codegen.plugins.specification.utils.PUtils
import cn.hutool.core.date.DateUtil
import cn.hutool.core.io.FileUtil
import cn.hutool.core.util.RuntimeUtil
import cn.hutool.cron.CronUtil
import cn.hutool.cron.Scheduler
import cn.hutool.cron.TaskExecutor
import cn.hutool.cron.listener.TaskListener
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

import java.util.concurrent.TimeUnit

class CmdSchedulerHandler extends CodeGenPluginHandler {

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
                e.printStackTrace()
                handleException(ext, id, e, ext.fn_getFromRedis('CmdScheduler_jobRunnable') as JobRunnable)
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
                def a = new JobRunnable(ext) {
                    Set<String> taskIdSet = new HashSet<>();
                    Scheduler scheduler = new Scheduler();
                    List<NameTask> nameTaskList = []

                    @Override
                    void whenClosed() {
                        AppProxy.init(params)
                        ext.clearFlagTrueFalse()
                        if (this.scheduler && this.scheduler.isStarted()) {
                            taskIdSet.each {
                                NameTask nameTask = (NameTask) scheduler.getTask(it)
                                if (nameTask != null) {
                                    ext.saveTableRecord(it, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Closed"),
                                            recordStatus: "STOPPED")), getErrLogRef())
                                    ext.setFlagTrueFalse(it, false)
                                }
                            }
                            scheduler.stop(true)
                        }
                    }

                    @Override
                    void handleException(Throwable e) {
                        AppProxy.init(params)
//                        this.whenClosed()
                        e.printStackTrace()
                    }

                    @Override
                    Object call() throws Exception {
                        scheduler.setMatchSecond(true)
                        AppProxy.init(params)
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
                                    if (nameTask != null) {
                                        def taskId = nameTask.getId();
                                        ext.saveTableRecord(taskId, formatRecord(new SaveTableRecord(recordMessage: exception.getMessage(),
                                                recordStatus: "ERROR")), getOutLogRef())
                                        getErrLogRef().severe("[${nameTask.getName()}] An Error Occurred.")
                                        getErrLogRef().severe(PUtils.getErrFromE(exception))
                                    }
                                }
                            }
                        })
                        HistService histService = new HistService(ext, "CmdScheduler")
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
                                        def cmdSchedulerHistoryItem = eachHistoryItem.formatSnapJSON(CmdSchedulerHistoryItem.class)
                                        if (cmdSchedulerHistoryItem.sync_tasks) {
                                            def list = cmdSchedulerHistoryItem.sync_tasks
                                            list.each { I_sync_tasks i_sync_task ->
                                                def id = i_sync_task.getId()
                                                def key_for_sync_task_flag = i_sync_task.getId()
                                                if (!ext.hasFlagTrue(key_for_sync_task_flag)) {
                                                    if (i_sync_task.getRecord_type() != 'stored') {
                                                        getOutLogRef().info("Skipped the disabled item: ${i_sync_task.getName()}")
                                                        return;
                                                    } else {
                                                        getOutLogRef().info("Started running the item: ${i_sync_task.getName()}")
                                                    }
                                                    try {
                                                        ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Initializing..."),
                                                                recordStatus: "PREPARATION")), getOutLogRef())
                                                        def val_nameTask = new NameTask() {
                                                            @Override
                                                            void execute() {
                                                                AppProxy.init(params)
                                                                synchronized (id.toString().intern()) {
                                                                    getOutLogRef().info("Running the named task: ${i_sync_task.getName()}")
                                                                    ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Started running..."),
                                                                            recordStatus: "START")), getOutLogRef())
                                                                    checkPoint()
                                                                    sleep(100)
                                                                    checkPoint()
                                                                    def crtTask = i_sync_task;
                                                                    def name = crtTask.name;
                                                                    def remarks = crtTask.remarks;
                                                                    def script_content = crtTask.script_content;
                                                                    def execution_strategy = crtTask.execution_strategy;
                                                                    def cron_expr = crtTask.cron_expr;
                                                                    def exec_file_path = crtTask.exec_file_path;
                                                                    def sleep_before_running = crtTask.sleep_before_running
//                                                                    def execution_timing = crtTask.execution_timing;
                                                                    // start sleeping
                                                                    if (sleep_before_running != null && sleep_before_running != 0) {
                                                                        ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Started sleeping {0} ms",
                                                                                sleep_before_running),
                                                                                recordStatus: "SLEEPING")), getOutLogRef())
                                                                        checkPoint()
                                                                        sleep(sleep_before_running)
                                                                        checkPoint()
                                                                    }
                                                                    ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Writing the script content..."),
                                                                            recordStatus: "HANDLING",
                                                                            lastFinishedTime: System.currentTimeMillis())), getOutLogRef())
                                                                    PCScriptLogFile pcScriptLogFile = new PCScriptLogFile("CmdScheduler",
                                                                            id,
                                                                            ext)
                                                                    def file = pcScriptLogFile.file;
                                                                    def logsFile = pcScriptLogFile.logsFile
                                                                    def errFile = pcScriptLogFile.errFile
                                                                    if (ext.sf.readAsStringWithSafe(file) != script_content) {
                                                                        ext.sf.del(file)
                                                                        ext.sf.del(logsFile)
                                                                        ext.sf.del(errFile)
                                                                        if (!file.exists()) {
                                                                            ext.sfWrapper.mkdirsP(file)
                                                                            file.createNewFile()
                                                                        }
                                                                        if (ext.win()) {
                                                                            script_content = script_content.replaceAll("\n", "\r\n")
                                                                        }
                                                                        file.write(script_content)
                                                                    }
                                                                    if (!ext.win()) {
                                                                        try {
                                                                            RuntimeUtil.exec("chmod", "755", file.toString())
                                                                        } catch (Throwable throwable) {
                                                                            throwable.printStackTrace()
                                                                        }
                                                                    }
                                                                    def p = RuntimeUtil.exec(file.toString())
                                                                    System.addShutdownHook {
                                                                        try {
                                                                            p.destroyForcibly()
                                                                            p.destroy()
                                                                        } catch (Throwable eee) {
                                                                            eee.printStackTrace()
                                                                        }
                                                                    }
                                                                    ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Executing", DateUtil.formatTime(new Date())),
                                                                            recordStatus: "EXECUTING",
                                                                            lastFinishedTime: System.currentTimeMillis())), getOutLogRef())
                                                                    checkPoint();
                                                                    p.consumeProcessOutput(ext.sf.getFos(logsFile),
                                                                            ext.sf.getFos(errFile))
                                                                    while (true) {
                                                                        checkPoint()
                                                                        def isOk = p.waitFor(1L, TimeUnit.SECONDS)
                                                                        if (!isOk) {
                                                                            checkPoint()
                                                                        } else {
                                                                            checkPoint()
                                                                            break;
                                                                        }
                                                                    }
                                                                    if (!ext.sf.empty(errFile)) {
                                                                        checkPoint();
                                                                        ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("An Error Occurred", DateUtil.formatTime(new Date())),
                                                                                recordStatus: "ERROR",
                                                                                lastFinishedTime: System.currentTimeMillis())), getOutLogRef())
                                                                    } else {
                                                                        checkPoint();
                                                                        ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Executed at {0}", DateUtil.formatTime(new Date())),
                                                                                recordStatus: "EXECUTED",
                                                                                lastFinishedTime: System.currentTimeMillis())), getOutLogRef())
                                                                    }
                                                                    checkPoint()
                                                                }
                                                            }

                                                            @Override
                                                            String getName() {
                                                                return i_sync_task.getName()
                                                            }

                                                            @Override
                                                            String getId() {
                                                                return id
                                                            }
                                                        }
                                                        AppProxy.init(params)
                                                        nameTaskList.add(val_nameTask)
                                                        if (scheduler.getTask(id) != null) {
                                                            scheduler.deschedule(id)
                                                        }
                                                        ext.setFlagTrueFalse(key_for_sync_task_flag, true)
                                                        if (i_sync_task.execution_strategy == 'run_it_once_only') {
                                                            PUtils.highrun({
                                                                AppProxy.init(params)
                                                                val_nameTask.execute()
                                                            })
                                                        } else {
                                                            scheduler.schedule(id, i_sync_task.getCron_expr(), val_nameTask)
                                                            ext.saveTableRecord(id, formatRecord(new SaveTableRecord(recordMessage: TTT.t("Waiting for the timing"),
                                                                    recordStatus: "IDLE")), getOutLogRef())
                                                        }
                                                        taskIdSet.add(id)
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
                        ext.fn_setFromRedis('CmdScheduler_scheduler', scheduler)
                        ext.fn_setFromRedis('CmdScheduler_taskIdSet', taskIdSet)
                        ext.fn_setFromRedis('CmdScheduler_nameTaskList', nameTaskList)
                        ext.fn_setFromRedis('CmdScheduler_jobRunnable', jobRunnable)
                        while (1) {
                            checkPoint()
                            fn_launch()
                            sleep(1200)
                        }
                    }
                }
                a.whenClosed()
                return a
            }
            def task = new CpSystemRunningTask(external: false,
                    prop: "CmdScheduler",
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
                Scheduler scheduler = ext.fn_getFromRedis('CmdScheduler_scheduler')
                def id = ext.params['id']
                if (scheduler != null) {
                    List<NameTask> CmdScheduler_nameTaskList = ext.fn_getFromRedis('CmdScheduler_nameTaskList')
                    if (CmdScheduler_nameTaskList != null) {
                        CmdScheduler_nameTaskList.each {
                            NameTask nameTask = it;
                            if (nameTask != null && nameTask.getId() == id) {
                                callTaskId(params, ext, id, nameTask)
                            }
                        }
                    }

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
                                                                  Scheduler scheduler = ext.fn_getFromRedis('CmdScheduler_scheduler')
                                                                  if (scheduler != null) {
                                                                      List<NameTask> CmdScheduler_nameTaskList = ext.fn_getFromRedis('CmdScheduler_nameTaskList')
                                                                      if (CmdScheduler_nameTaskList != null) {
                                                                          CmdScheduler_nameTaskList.each {
                                                                              NameTask nameTask = it;
                                                                              if (nameTask != null) {
                                                                                  callTaskId(params, ext, nameTask.getId(), nameTask)
                                                                              }
                                                                          }
                                                                      }
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
