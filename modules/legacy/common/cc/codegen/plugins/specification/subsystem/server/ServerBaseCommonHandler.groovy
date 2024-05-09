package cc.codegen.plugins.specification.subsystem.server

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cc.codegen.plugins.specification.utils.cmd.CommandRequest
import cc.codegen.plugins.specification.utils.cmd.CommandResponseRef
import cc.codegen.plugins.specification.wrapper.ServiceRedisTaskWrapper
import cc.codegen.plugins.specification.wrapper.vm.NodeRunEnv
import cc.codegen.plugins.specification.wrapper.vm.ServiceLocation
import cc.codegen.plugins.specification.wrapper.vm.ServiceRunnable
import cc.codegen.plugins.specification.wrapper.vm.ServiceSustainResult
import cn.hutool.core.date.DateUtil
import cn.hutool.core.thread.ThreadUtil
import cn.hutool.core.util.RandomUtil
import cn.hutool.core.util.RuntimeUtil
import com.alibaba.fastjson.JSON

abstract class ServerBaseCommonHandler extends CodeGenPluginHandler {

    public abstract String getCurrentBusinessConfigTable();

    public static DBWrapper getRootServerDatabase(Map<String, Object> params) {
        return DBWrapper.initScopeSharingRefByName(params, "gen_server_root")
    }

    @Override
    ResFunc init(String action, Map<String, Object> params) {
        def res = super.init(action, params)
        def rootServerDatabase = getRootServerDatabase(params)
        sub_initFromDatabase(rootServerDatabase)
        try {
            def key_clean_up_for_system = "key_clean_up_for_system"
            def fn_getFromRedis = params['fn_getFromRedis']
            def fn_setFromRedis = params['fn_setFromRedis']
            def fn_delFromRedis = params['fn_delFromRedis']
            if (fn_getFromRedis(key_clean_up_for_system) == null) {
                fn_setFromRedis(key_clean_up_for_system, [stop: {
                    handle("stop_all_service", params)
                }])
            }
        } catch (Throwable throwable) {
            throwable.printStackTrace()
        }
        return res;
    }

    public abstract void sub_initFromDatabase(DBWrapper rootServerDatabase);

    public abstract RunScriptVM getServerExecFile(Map params, NodeRunEnv nodeRunEnv, File backendRootPath);

    public abstract String getExtAppId();


    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        def tmp_1 = this;
        return handleValueFromTextOrFile(action, params, [getForStopAllServices(params, tmp_1),
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "stop_service"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  def fn_initGeneralDatabase = params['fn_initGeneralDatabase']
                                                                  def dbWrapper = extHandleItem.dbWrapper;
                                                                  def g = extHandleItem.g;
                                                                  def sfWrapper = extHandleItem.sfWrapper
                                                                  def sf = sfWrapper;
                                                                  def ext = extHandleItem;
                                                                  def twa = ext.twa
                                                                  def res = [:]
                                                                  def config_map = params['config'] as Map
                                                                  def SERVER_UID = config_map['SERVER_UID'] as String
                                                                  def key = ServiceRedisTaskWrapper.getServiceResId_static_method(SERVER_UID)
                                                                  def mobj = extHandleItem.fn_getFromRedis(key as String)
                                                                  if (mobj != null) {
                                                                      mobj.stop()
                                                                  }
                                                                  def key_for_status = ServiceRedisTaskWrapper.getServiceStatus_static_method(SERVER_UID)
                                                                  def fn_delFromRedis = params['fn_delFromRedis']
                                                                  def loggingFile = sf.getExecLogFile(twa, SERVER_UID as String)
                                                                  sf.del(loggingFile)
                                                                  sf.mkdirsP(loggingFile)
                                                                  loggingFile.write("Stopped it by user action.")
                                                                  fn_delFromRedis(key)
                                                                  fn_delFromRedis(key_for_status)
                                                                  def runtime = sf.getRuntimeStatusFile(twa, SERVER_UID)
                                                                  sf.del(runtime)
                                                                  return ResFunc.ok([status: 1])
                                                              }
                                                          },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "get_service_status"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  def fn_initGeneralDatabase = params['fn_initGeneralDatabase']
                                                                  def dbWrapper = extHandleItem.dbWrapper;
                                                                  def g = extHandleItem.g;
                                                                  def sfWrapper = extHandleItem.sfWrapper
                                                                  def sf = sfWrapper;
                                                                  def ext = extHandleItem;
                                                                  def twa = ext.twa
                                                                  def res = [:]
                                                                  def config_map = params['config'] as Map
                                                                  def SERVER_UID = config_map['SERVER_UID'] as String
                                                                  def key = ServiceRedisTaskWrapper.getServiceStatus_static_method(SERVER_UID)
                                                                  def status = extHandleItem.fn_getFromRedis(key as String)
                                                                  if (status == null) {
                                                                      status = [done: true]
                                                                  }
                                                                  def status_map = twa.toMap(twa.toJSONWithBeautify(status))
                                                                  def n_1 = sf.getRuntimeStatusFile(twa, SERVER_UID)
                                                                  if (n_1.exists()) {
                                                                      try {
                                                                          def status_map_2 = twa.toMapByFile(n_1)
                                                                          status_map.putAll(status_map_2)
                                                                      } catch (Throwable e) {
                                                                          e.printStackTrace()
                                                                      }
                                                                  }
                                                                  return ResFunc.ok([status: status_map])
                                                              }
                                                          },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "start_service"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  def fn_initGeneralDatabase = params['fn_initGeneralDatabase']
                                                                  def dbWrapper = extHandleItem.dbWrapper;
                                                                  def g = extHandleItem.g;
                                                                  def sfWrapper = extHandleItem.sfWrapper
                                                                  def sf = sfWrapper;
                                                                  def ext = extHandleItem;
                                                                  def twa = ext.twa
                                                                  def res = [:]
                                                                  def config_map = params['config'] as Map
                                                                  def rootServerDatabase = getRootServerDatabase(params)
                                                                  def configTableName = getCurrentBusinessConfigTable()
                                                                  def crtRecord = rootServerDatabase.queryFirst("select * from ${configTableName} where SERVER_UID=:SERVER_UID", [SERVER_UID: config_map['SERVER_UID']]);
                                                                  def server_uid = config_map['SERVER_UID'] as String
                                                                  def fileName = server_uid
                                                                  def configFile = sf.getRuntimeConfigFile(twa, server_uid)
                                                                  def statusFile = sf.getRuntimeStatusFile(twa, server_uid)
                                                                  sf.mkdirsP(statusFile)
                                                                  statusFile.write(twa.toJSON([isOk      : false,
                                                                                               isErr     : false,
                                                                                               error     : null,
                                                                                               updateTime: null]))
                                                                  crtRecord = [*         : crtRecord,
                                                                               statusFile: statusFile.toString()]
                                                                  configFile.write(twa.toJSON(crtRecord))
                                                                  ServiceRedisTaskWrapper serviceRedisTaskWrapper = new ServiceRedisTaskWrapper(extHandleItem, new ServiceRunnable() {
                                                                      @Override
                                                                      ServiceSustainResult runAndReturnQuickly() {
                                                                          def loggingFile = sf.getExecLogFile(twa, server_uid)
                                                                          try {
                                                                              def nodeRunEnv = getNodeJSRunEnv(params)
                                                                              def backendRootPath = getBackendRootPath(params)
                                                                              def nodeBaseDir = nodeRunEnv.nodeBaseDir;
                                                                              def nodeExecFile = nodeRunEnv.nodeBinaryFile
                                                                              def serverExecVM = getServerExecFile(params, nodeRunEnv, backendRootPath)
                                                                              def cmd_str = ["${nodeExecFile}",
                                                                                             "${serverExecVM.execFile}",
                                                                                             "${configFile}"].collect { it -> return it.toString()
                                                                              }
                                                                              sf.del(loggingFile)
                                                                              sf.mkdirsP(loggingFile)
                                                                              loggingFile.append("[StartAt] ${DateUtil.now()}\n")
                                                                              loggingFile.append("[Execute Path] ${cmd_str.join(" ")}\n")
                                                                              loggingFile.append("[Logging File] ${loggingFile}\n")
                                                                              loggingFile.append("[Factual ExtDir] ${getFactualExtDir()}\n")
                                                                              def cmdResRef = runCmd(new CommandRequest(params,
                                                                                      cmd_str,
                                                                                      serverExecVM.pwd,
                                                                                      loggingFile))
                                                                              ThreadUtil.execAsync(new Runnable() {
                                                                                  @Override
                                                                                  void run() {
                                                                                      def exitValue = cmdResRef.waitForProcess()
                                                                                      status.exitValue = exitValue;
                                                                                  }
                                                                              })
                                                                              return new ServiceSustainResult() {
                                                                                  @Override
                                                                                  void stop() {
                                                                                      cmdResRef.stop()
                                                                                  }

                                                                                  @Override
                                                                                  ServiceLocation getServiceLocation() {
                                                                                      return new ServiceLocation(getExtAppId(), crtRecord['TAB_HIST_ID'] as Integer)
                                                                                  }
                                                                              }
                                                                          } catch (Throwable throwable) {
                                                                              throwable.printStackTrace()
                                                                              loggingFile.append("An error occurred: ${ToolWrapper.ref_getErrToStr(throwable)}\n")
                                                                              throw throwable;
                                                                          }
                                                                          return null;
                                                                      }

                                                                      @Override
                                                                      String getKey() {
                                                                          return server_uid
                                                                      }

                                                                  }, true)
                                                                  serviceRedisTaskWrapper.startAsync()
                                                                  return ResFunc.ok([previousRecord: crtRecord, config_map: config_map])
                                                              }
                                                          },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "update_config_to_table"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  def fn_initGeneralDatabase = params['fn_initGeneralDatabase']
                                                                  def dbWrapper = extHandleItem.dbWrapper;
                                                                  def g = extHandleItem.g;
                                                                  def sfWrapper = extHandleItem.sfWrapper
                                                                  def ext = extHandleItem;
                                                                  def twa = ext.twa
                                                                  def res = [:]
                                                                  def config_map = params['config'] as Map
                                                                  def new_config_map = [:]
                                                                  config_map.eachWithIndex { Map.Entry<Object, Object> entry, int i ->
                                                                      def entry_key = entry.getKey() as String
                                                                      def entry_value = entry.getValue()
                                                                      if (entry_key.endsWith("_ARRAY_STR")) {
                                                                          entry_value = JSON.toJSONString(entry_value)
                                                                      }
                                                                      new_config_map[entry_key] = entry_value;
                                                                  }
                                                                  def previousRecord = null;
                                                                  def rootServerDatabase = getRootServerDatabase(params)
                                                                  def configTableName = getCurrentBusinessConfigTable()
                                                                  synchronized ("modify_ref".intern()) {
                                                                      previousRecord = rootServerDatabase.queryFirst("select * from ${configTableName} where SERVER_UID=:SERVER_UID", [SERVER_UID: new_config_map['SERVER_UID']])
                                                                      if (previousRecord == null) {
                                                                          rootServerDatabase.modify_own(configTableName, "insert", [*: new_config_map])
                                                                      } else {
                                                                          new_config_map["ID"] = previousRecord["ID"]
                                                                          rootServerDatabase.modify_own(configTableName, "update", [*: new_config_map])
                                                                      }
                                                                  }

                                                                  return ResFunc.ok([previousRecord: previousRecord, new_config_map: new_config_map])
                                                              }
                                                          },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "update_tab_name"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  def fn_initGeneralDatabase = params['fn_initGeneralDatabase']
                                                                  def dbWrapper = extHandleItem.dbWrapper;
                                                                  def g = extHandleItem.g;
                                                                  def sfWrapper = extHandleItem.sfWrapper
                                                                  def ext = extHandleItem;
                                                                  def twa = ext.twa
                                                                  def NEW_TAB_NAME = params['NEW_TAB_NAME'] as String
                                                                  def hist_info = params['hist_info'] as Map
                                                                  def history_table_id = hist_info['history_table_id'] as String
                                                                  def crtHist = hist_info['crtHist']
                                                                  params.fn_update_hist_tab_name(history_table_id, NEW_TAB_NAME,crtHist['ID'])
//                                                                  def opt_record_name = getExtHistTable(params, history_table_id)
//                                                                  g.exec("update ${opt_record_name} set TAB_NAME=:NEW_TAB_NAME where ID=:ID", [*           : crtHist,
//                                                                                                                                               NEW_TAB_NAME: NEW_TAB_NAME])
//                                                                  def res = g.queryFirst("select * from ${opt_record_name}")
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

    public HandleTypeAndValue getForStopAllServices(Map<String, Object> params, tmp_1) {
        new HandleTypeAndValue() {
            @Override
            String getType() {
                return "stop_all_service"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                def entireRedisMap = params['fn_getEntireRedis']() as Map<String, Object>
                entireRedisMap.collect {
                    return it.getKey()
                }.each {
                    if (it.startsWith(ServiceRedisTaskWrapper.key_service_res)) {
                        tmp_1.handle("stop_service", [*     : params,
                                                      config: [SERVER_UID: it.replace(ServiceRedisTaskWrapper.key_service_res, "")]])
                    }
                }
                return ResFunc.ok([status: 1])
            }
        }
    }

    static String getExtHistTable(Map params, String history_table_id) {
        return "g_ca_${justOnlyCharacter(params, history_table_id)}_history"
    }

    public static String justOnlyCharacter(Map params, String str) {
//        if (params['val_p_mode'] != null && params['val_p_mode'] == true) {
//            return "portal"
//        }
        return str.replaceAll("[^a-zA-Z_-]", "");
    }

    static void main(String[] args) {
        println(justOnlyCharacter([:], "ss',>0-- dkkw?wllm=1 %23q__kdkdkeoq1103"))
    }

}
