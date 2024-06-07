package cc.codegen.plugins.ServerStatic.handler


import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.subsystem.server.RunScriptVM
import cc.codegen.plugins.specification.subsystem.server.ServerBaseCommonHandler
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cc.codegen.plugins.specification.wrapper.vm.NodeRunEnv

class ServerStaticHandler extends ServerBaseCommonHandler {

    @Override
    public void sub_initFromDatabase(DBWrapper rootServerDatabase) {
        initForStaticServer(rootServerDatabase)
    }


    @Override
    RunScriptVM getServerExecFile(Map params, NodeRunEnv nodeRunEnv, File backendRootPath) {
        def g = DBWrapper.init(params);
        def twa = ToolWrapper.init(params)
        def sf = SFWrapper.init(params)
        def SFUtils = sf;
        def GUtils = twa;
        def SF = sf;
        def userDir = twa.getCommonUserDir()
        return new RunScriptVM(
                SF.getFile(backendRootPath, "node/ServerStatic/entry.js"),
                SF.getFile(backendRootPath, "node/ServerStatic")
        )
    }

    @Override
    String getExtAppId() {
        return "ServerStatic";
    }

//    @Override
//    String getFactualExtDir() {
//        try {
//            return ServerStaticHandler.class.getProtectionDomain().getCodeSource().getLocation().getFile();
//        } catch (Throwable throwable) {
//            throwable.printStackTrace()
//            return throwable.getMessage()
//        }
//    }

    @Override
    String getCurrentBusinessConfigTable() {
        return "g_static_server_config"
    }

    public void initForStaticServer(DBWrapper rootServerDatabase) {
        rootServerDatabase.newTable("g_static_server_config", """
create table if not exists g_static_server_config (
${DBWrapper.idColumn},
public_dir text,
clean_urls_bool boolean default true,
clean_urls_array_str text,
rewrite_array_str text,
headers_array_str text,
directory_listings_bool boolean default true,
directory_listings_array_str text,
unlisted_array_str text,
trailing_slash boolean default true,
render_signle_file boolean default false, 
use_symlinks boolean default true,
use_etag boolean default false,
${DBWrapper.createTimeColumn}
)
""")

        rootServerDatabase.execSafe("alter table g_static_server_config add column LISTEN_PORT int")
        rootServerDatabase.execSafe("alter table g_static_server_config add column SERVER_UID varchar(32) not null")
        rootServerDatabase.execSafe("alter table g_static_server_config add column TAB_HIST_ID bigint not null")


        rootServerDatabase.execSafe("alter table g_static_server_config add column REWRITE_BOOL boolean default true")
        rootServerDatabase.execSafe("alter table g_static_server_config add column REDIRECT_BOOL boolean default true")
        rootServerDatabase.execSafe("alter table g_static_server_config add column HEADERS_BOOL boolean default true")
        rootServerDatabase.execSafe("alter table g_static_server_config add column USE_COMPRESS_MODE boolean default true")

        rootServerDatabase.execSafe("alter table g_static_server_config add column REDIRECT_ARRAY_STR text")
        rootServerDatabase.execSafe("alter table g_static_server_config add column USE_STATIC_MODE boolean default true")
        rootServerDatabase.execSafe("alter table g_static_server_config add column USE_SSL_MODE boolean default true")
        rootServerDatabase.execSafe("alter table g_static_server_config add column SSL_PUBLIC_VALUE text")
        rootServerDatabase.execSafe("alter table g_static_server_config add column SSL_PRIVATE_VALUE text")
        rootServerDatabase.execSafe("alter table g_static_server_config add column SSL_PHRASE_VALUE text")

        def rows = rootServerDatabase.query("select * from g_static_server_config")
        println(rows)
    }

}
