package cc.codegen.plugins.NotesClipBoard.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.definition.PaginationHandleTypeAndValue
import cc.codegen.plugins.specification.definition.SQLCondition
import cc.codegen.plugins.specification.definition.TableCondition
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cn.hutool.core.swing.clipboard.ClipboardListener
import cn.hutool.core.swing.clipboard.ClipboardUtil
import cn.hutool.core.thread.ThreadUtil
import cn.hutool.core.util.RandomUtil

import java.awt.datatransfer.Clipboard
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.Transferable

class NotesClipBoardHandler extends CodeGenPluginHandler {

    public static final String BASE_PAGE_ID = 'base'

    public static final String cp_base_str = 'cp_base_str'

    @Override
    public ResFunc init(String action, Map<String, Object> params) {
        def g = DBWrapper.init(params)
        def g_notes_clipboard = getNotesClipboardDbRef(params)
        def twa = ToolWrapper.init(params)
        def sf = SFWrapper.init(params)
        def SFUtils = sf;
        def SF = sf;
        def userDir = twa.getCommonUserDir()
        def backupRootDir = twa.getBackupDir()
        def fn_gcc_callDSL = params['fn_gcc_callDSL']
        def fn_getFromRedis = params['fn_getFromRedis']
        def fn_setFromRedis = params['fn_setFromRedis']
        def fn_delFromRedis = params['fn_delFromRedis']
        def val_pid = params['val_pid']
        g_notes_clipboard.newTable("g_clipboard_config", """
create table if not exists g_clipboard_config(
    ${DBWrapper.idColumn},
    page_id varchar(32),    
    cp_run_stat varchar(10) default 'true',
    cp_stat_interval int default 3,
    ${DBWrapper.createTimeColumn}
)
""")
        g_notes_clipboard.execSafe("""
alter table g_clipboard_config add column total_count bigint default 0
""")

        // str, img
        g_notes_clipboard.newTable("g_clipboard_hist", """
create table if not exists g_clipboard_hist(
    ${DBWrapper.idColumn},
    data_type varchar(32) default 'str',
    data_content clob,
    ${DBWrapper.createTimeColumn}
)
""")
        synchronized ("init_clipboard".intern()) {
            def ctn = g_notes_clipboard.ctn("select * from g_clipboard_config where page_id=:page_id", [page_id: BASE_PAGE_ID])
            if (ctn == 0) {
                g_notes_clipboard.modify_own("g_clipboard_config", "insert", [page_id: BASE_PAGE_ID])
            }
        }
        def cpRunPid = "${KEY_CACHE_USE}_note_clipboard_usage"
        synchronized ("chk_cp_event".intern()) {
            def chk_flag = fn_getFromRedis(cpRunPid)
            if (chk_flag == null) {
                def latestUpdateId = RandomUtil.randomUUID().toString()
                fn_setFromRedis(cpRunPid, latestUpdateId)
                Thread a_thread = new Thread(new Runnable() {
                    @Override
                    void run() {
                        def lastValue = null;
                        while (true) {
                            try {
                                def str = ClipboardUtil.getStr()
                                if (str != lastValue && str != null && str.trim().length() != 0) {
//                                    synchronized (cp_base_str.intern()) {
                                    def crtConfig = g_notes_clipboard.queryFirst("select * from g_clipboard_config where page_id=:page_id", [page_id: BASE_PAGE_ID])
                                    if (crtConfig['CP_RUN_STAT'] == 'true') {
                                        println str
                                        lastValue = str;
                                        g_notes_clipboard.exec("update g_clipboard_config set total_count=total_count+1 where page_id=:page_id", [page_id: BASE_PAGE_ID])
                                        g_notes_clipboard.modify_own("g_clipboard_hist", "insert", [DATA_TYPE   : 'str',
                                                                                                    DATA_CONTENT: str,])
                                    }
//                                    }
                                }
                            } catch (Throwable throwable) {
                                // do nothing if copy failed
//                                throwable.printStackTrace()
                            }
                            if (fn_getFromRedis(cpRunPid) != latestUpdateId) {
                                break;
                            }
                            Thread.sleep(350)
                        }
                    }
                })
                a_thread.setPriority(Thread.MAX_PRIORITY)
                a_thread.start()
            }
        }

        return ResFunc.ok([:])
    }

    public DBWrapper getNotesClipboardDbRef(Map<String, Object> params) {
        return DBWrapper.initGeneralByName(params, "notes_clipboard")
    }

    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        def g_notes_clipboard = getNotesClipboardDbRef(params)
        def fn_getCrtConfig = {
            def crtConfig = g_notes_clipboard.queryFirst("select * from g_clipboard_config where page_id=:page_id", [page_id: BASE_PAGE_ID])
            return crtConfig;
        }
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "save_config_by_page_id"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                def page_id = params['page_id']
                def updateVM = params['updateVM'] as Map
                updateVM.remove("COUNT")
                updateVM.remove("LIST")
                updateVM.remove("TOTAL_COUNT")
                g_notes_clipboard.modify_own("g_clipboard_config", "upset", [
                        *: updateVM,
                ])
                def res = 1
                return ResFunc.ok([value: res])
            }
        },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "erase_clipboard_data"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext) {
//                                                                  synchronized (cp_base_str.intern()) {
                                                                  g_notes_clipboard.exec("truncate table g_clipboard_hist")
                                                                  g_notes_clipboard.exec("update g_clipboard_config set total_count=0", [
                                                                          page_id: params['page_id']
                                                                  ])
                                                                  def crtConfig = fn_getCrtConfig()
                                                                  def ctn_val = g_notes_clipboard.query("select * from g_clipboard_config")
                                                                  return ResFunc.ok([
                                                                          list  : ctn_val,
                                                                          config: crtConfig
                                                                  ])
//                                                                  }
                                                              }
                                                          },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "get_config_by_page_id"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                                                                  def page_id = params['page_id']
                                                                  def res = g_notes_clipboard.queryFirst("""
select * from g_clipboard_config where page_id=:page_id
""", [page_id: page_id])
                                                                  return ResFunc.ok([value: res])
                                                              }
                                                          },
                                                          new PaginationHandleTypeAndValue() {
                                                              @Override
                                                              SQLCondition getRawSQLCondition(ExtHandleItem ext) {
                                                                  return new SQLCondition(g_notes_clipboard,
                                                                          "select * from g_clipboard_hist order by id desc",
                                                                          [:]
                                                                  )
                                                              }

                                                              @Override
                                                              SQLCondition getCountSQLCondition(ExtHandleItem ext) {
                                                                  def crtConfig = fn_getCrtConfig()
                                                                  return new SQLCondition(g_notes_clipboard, "select ${crtConfig['TOTAL_COUNT']} as CTN", [:])
                                                              }

                                                              @Override
                                                              TableCondition getOptTableName() {
                                                                  return new TableCondition(g_notes_clipboard, "g_clipboard_hist")
                                                              }

                                                              @Override
                                                              void updateCountValue(Integer diffValue) {
                                                                  g_notes_clipboard.exec("update g_clipboard_config set total_count=total_count+(${diffValue}) where page_id=:page_id", [page_id: BASE_PAGE_ID])
                                                              }

                                                              @Override
                                                              String getType() {
                                                                  return "get_clipboard_data"
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

        ])
    }

    static void main(String[] args) {
        System.setProperty("apple.awt.UIElement", "true");
        java.awt.Toolkit.getDefaultToolkit();
//        System.setProperty("java.awt.headless", "true");
        def lastValue = null;
        while (true) {
            def str = ClipboardUtil.getStr()
            if (str != lastValue) {
                println str
                lastValue = str;
            }
            Thread.sleep(1000)
        }
//        ClipboardUtil.listen(new ClipboardListener() {
//            @Override
//            Transferable onChange(Clipboard clipboard, Transferable transferable) {
//                println("transfering")
//                println(transferable.getTransferData(DataFlavor.stringFlavor))
//                return transferable
//            }
//        }, true)
    }
}
