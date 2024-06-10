package cc.codegen.plugins.SQLDrafts.handler

import bridge_common.utils.AppProxy
import bridge_common.utils.GooUtils
import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import org.codehaus.groovy.runtime.ScriptBytecodeAdapter
import sql_pass_vm.meta.SQLPassPassUtils
import sql_pass_vm.meta.requests.ConnectByConnIdRequestBody
import sql_pass_vm.meta.requests.DestroyRetrieveResultRequestBody
import sql_pass_vm.meta.requests.DisConnectByConnIdRequestBody
import sql_pass_vm.meta.requests.GetBucketNumResultRequestBody
import sql_pass_vm.meta.requests.GetColumnStatusRequestBody
import sql_pass_vm.meta.requests.GetConnStatusRequestBody
import sql_pass_vm.meta.requests.GetDatabasesStatusRequestBody
import sql_pass_vm.meta.requests.GetRetrieveResultRequestBody
import sql_pass_vm.meta.requests.GetTablesStatusRequestBody
import sql_pass_vm.meta.requests.PostQueryRequestBody
import sql_pass_vm.meta.requests.SetDriverFileRequestBody
import sql_pass_vm.meta.requests.TestConnectionRequestBody
import sql_pass_vm.meta.requests.UpdateBucketNumRequestBody
import sql_pass_vm.meta.requests.common.SQLStats
import sql_pass_vm.meta.requests.impl.GetAllColumnsReq
import sql_pass_vm.meta.requests.impl.GetAllDatabaseReq
import sql_pass_vm.meta.requests.impl.GetAllTablesReq
import sql_pass_vm.meta.response.impl.GetPartBucketDataResultRes
import sql_pass_vm.meta.types.DBConfig
import sql_pass_vm.meta.types.DBType
import sql_pass_vm.meta.types.SQLRequestType

class SQLDraftsHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        def api_name = "sql_tun_handler"
        def connectionHandleTypeAndValues = [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "test_connection"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                markNoExpireChecking(params)
                def appProxy = new AppProxy(params)
                def dbconfig = DBConfig.initFromDBConfig(params['dbconfig'] as Map)
                def body = new TestConnectionRequestBody(dbType: dbconfig.getDbType(),
                        dbConfig: dbconfig)
                def m = SQLPassPassUtils.getMapByType(SQLRequestType.TEST_CONNECTION, body, params as Map);
                def res = extHandleItem.callExterior(api_name, m)
                return ResFunc.ok([value: '100'])
            }
        },

                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "get_database_list_by_conn_id"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new GetDatabasesStatusRequestBody(connId: params.connId,
                                                             queryConfig: GooUtils.copy(params.queryConfig, GetAllDatabaseReq.class))
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.GET_ALL_DATABASES_BY_CONN_ID,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
//                                                     GooUtils.deAndGeJSON
                                                     return ResFunc.ok((res))
                                                 }
                                             },
                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "get_tables_by_conn_id"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new GetTablesStatusRequestBody(connId: params.connId,
                                                             queryConfig: GooUtils.copy(params.queryConfig, GetAllTablesReq.class))
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.GET_ALL_TABLES_BY_CONN_ID,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
//                                                     res = GooUtils.deAndGeJSON(res)
                                                     return ResFunc.ok(res)
                                                 }
                                             },

                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "async_post_a_query_action"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new PostQueryRequestBody(connId: params.connId,
                                                             sqlStats: GooUtils.copy(params.sqlStats, SQLStats.class))
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.ASYNC_POST_QUERY_BY_CONN_ID,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
//                                                     res = GooUtils.deAndGeJSON(res)
                                                     return ResFunc.ok(res)
                                                 }
                                             },
                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "get_part_bucket_data"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new GetBucketNumResultRequestBody(
                                                             bucketNum: params.bucketNum as Integer,
                                                             connId: params.connId,
                                                             retrieveId: params.retrieveId,
                                                     )
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.GET_PART_BUCKET_DATA_BY_RETRIEVE_ID_AND_BUCKET_NUM,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
                                                     return ResFunc.ok(res.result)
                                                 }
                                             },
                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "retrieve_column_result"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new GetRetrieveResultRequestBody(connId: params.connId,
                                                             retrieveId: params.retrieveId,
                                                             maxReadBucketNum: params.maxReadBucketNum as Integer
                                                     )
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.RETRIEVE_COLUMN_RESULT_BY_RETRIEVE_AND_CONN_ID,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
                                                     return ResFunc.ok(res.result)
                                                 }
                                             },
                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "cancel_statement"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new UpdateBucketNumRequestBody(connId: params.connId,
                                                     )
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.CANCEL_STATEMENT,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
                                                     return ResFunc.ok(res.result)
                                                 }
                                             },
                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "update_max_bucket_num"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new UpdateBucketNumRequestBody(connId: params.connId,
                                                             retrieveId: params.retrieveId,
                                                             maxReadBucketNum: params.maxReadBucketNum as Integer
                                                     )
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.UPDATE_MAX_BUCKET_NUM,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
                                                     return ResFunc.ok(res.result)
                                                 }
                                             },
                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "destroy_retrieve_result_item"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new DestroyRetrieveResultRequestBody(connId: params.connId,
                                                             retrieveId: params.retrieveId,)
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.DESTROY_RETRIEVE_RESULT_BY_DEL_THEM,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
                                                     return ResFunc.ok(res)
                                                 }
                                             },
                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "async_post_a_execute_action"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new PostQueryRequestBody(connId: params.connId,
                                                             sqlStats: GooUtils.copy(params.sqlStats, SQLStats.class))
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.ASYNC_POST_EXECUTE_BY_CONN_ID,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
//                                                     res = GooUtils.deAndGeJSON(res)
                                                     return ResFunc.ok(res)
                                                 }
                                             },
                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "get_columns_by_conn_id"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new GetColumnStatusRequestBody(connId: params.connId,
                                                             queryConfig: GooUtils.copy(params.queryConfig, GetAllColumnsReq.class))
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.GET_ALL_COLUMNS_BY_CONN_ID,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
//                                                     res = GooUtils.deAndGeJSON(res)
                                                     return ResFunc.ok(res)
                                                 }
                                             },
                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "get_tab_id_status"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new GetConnStatusRequestBody(connId: params.connId)
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.GET_CONN_ID_STATUS,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
                                                     return ResFunc.ok([value: res])
                                                 }
                                             },
                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     // test2
                                                     return "connect_by_conn_id"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new ConnectByConnIdRequestBody(connId: params.connId,)
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.CONNECT_BY_CONN_ID,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
                                                     return ResFunc.ok([value: res])
                                                 }
                                             },
                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "disconnect_by_conn_id"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def body = new DisConnectByConnIdRequestBody(connId: params.connId)
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.DISCONNECT_BY_CONN_ID,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
                                                     return ResFunc.ok([value: res])
                                                 }
                                             },
                                             new HandleTypeAndValue() {
                                                 @Override
                                                 String getType() {
                                                     return "open_connection"
                                                 }

                                                 @Override
                                                 ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                     def appProxy = new AppProxy(params)
                                                     def dbconfig = DBConfig.initFromDBConfig(params['dbconfig'] as Map)
                                                     def body = new TestConnectionRequestBody(dbType: dbconfig.getDbType(),
                                                             dbConfig: dbconfig)
                                                     def m = SQLPassPassUtils.getMapByType(SQLRequestType.ESTABLISH_CONNECTION_AND_GET_CONN_ID,
                                                             body,
                                                             [*: params])
                                                     def res = extHandleItem.callExterior(api_name, m)
                                                     return ResFunc.ok([value: '100', value: res.result])
                                                 }
                                             },]
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "get_all_database_type"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                def m = SQLPassPassUtils.getMapByType(SQLRequestType.RETRIEVE_ALL_DATABASE_TYPES,
                        null,
                        [*: params])
                def res = extHandleItem.callExterior(api_name, m)
                return ResFunc.ok([value: res.result.obj])
            }
        },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "install_driver_by_name"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  def m = SQLPassPassUtils.getMapByType(SQLRequestType.AUTO_INSTALL_FOR_DRIVER_FILE,
                                                                          new SetDriverFileRequestBody(dbType: DBType.valueOf(params['dbType'] as String),),
                                                                          [*: params])
                                                                  def res = extHandleItem.callExterior(api_name, m)
                                                                  return ResFunc.ok([value: '1'])
                                                              }
                                                          },
                                                          *connectionHandleTypeAndValues,
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "new_example_database"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  def appProxy = new AppProxy(params)
                                                                  def tempFile = appProxy.getAppSFWrapper().createTempFile("", "")
                                                                  return ResFunc.ok([value: '1', path: tempFile.getAbsolutePath()])
                                                              }
                                                          },

                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "save_driver_by_name"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  def filePath = extHandleItem.sfWrapper.getFileWithUploadedFile(params['filePath'] as String)
                                                                  def m = SQLPassPassUtils.getMapByType(SQLRequestType.SET_FOR_DRIVER_FILE,
                                                                          new SetDriverFileRequestBody(dbType: DBType.valueOf(params['dbType'] as String),
                                                                                  filePath: filePath.toString()),
                                                                          [*: params])
                                                                  def res = extHandleItem.callExterior(api_name, m)
                                                                  return ResFunc.ok([value: '1'])
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
        println("hello, world")
    }
}
