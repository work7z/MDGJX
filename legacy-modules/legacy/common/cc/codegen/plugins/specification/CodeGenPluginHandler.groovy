package cc.codegen.plugins.specification

import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cc.codegen.plugins.specification.exp.UploadFileExpiredException
import cc.codegen.plugins.specification.exp.UserDefinedException
import cc.codegen.plugins.specification.handle.OnlyLocalCanCallSubDefinition
import cc.codegen.plugins.specification.handle.PortalCanCallSubDefinitions
import cc.codegen.plugins.specification.keys.PHolder
import cc.codegen.plugins.specification.utils.Countable
import cc.codegen.plugins.specification.utils.PCacheDir
import cc.codegen.plugins.specification.utils.PFile
import cc.codegen.plugins.specification.utils.LastFileReader
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cc.codegen.plugins.specification.utils.cmd.CommandRequest
import cc.codegen.plugins.specification.utils.cmd.CommandResponseRef
import cc.codegen.plugins.specification.wrapper.vm.NodeRunEnv
import cn.hutool.cache.impl.TimedCache
import cn.hutool.core.date.DateUtil
import cn.hutool.core.io.FileUtil
import cn.hutool.core.thread.ThreadUtil
import cn.hutool.core.util.RandomUtil
import cn.hutool.core.util.RuntimeUtil
import cn.hutool.core.util.StrUtil
import cn.hutool.crypto.digest.DigestUtil
import cn.hutool.http.HttpUtil
import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.serializer.SerializeConfig
import com.alibaba.fastjson.serializer.SerializerFeature

import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicLong

/**
 * CodeGen Plugin Basic handler*/
abstract class CodeGenPluginHandler {
    public static final String KEY_LOGFILE_SPLITER = "_CG2016_WR_N_"
    boolean isInit = false;

    public PCacheDir getCacheDirByLimits(Map params, String keyName, Integer cacheLimits) {
        def ext = new ExtHandleItem(params)
        return new PCacheDir(ext, keyName, cacheLimits)
    }

    public TimedCache getTimeCachedFromParams(params, String key, long timeout) {
        def ext = new ExtHandleItem(params)
        def m = ext.fn_getFromRedis(key)
        if (m == null) {
            m = new TimedCache<>(timeout)
            ext.fn_setFromRedis(key, m)
        }
        return m;
    }

    public String formatValue(def apiResponse) {
        return JSON.toJSONString(apiResponse, new SerializeConfig(true), SerializerFeature.WriteMapNullValue)
    }

    public CommandResponseRef runCmd(CommandRequest commandRequest) {
        def params = commandRequest.params;
        def g = DBWrapper.init(params);
        def twa = ToolWrapper.init(params)
        def sf = SFWrapper.init(params)
        def SFUtils = sf;
        def GUtils = twa;
        def SF = sf;
        def userDir = twa.getCommonUserDir()
        def backupRootDir = twa.getBackupDir()
        def exec = RuntimeUtil.exec(commandRequest.getEnv(),
                commandRequest.getPwd(),
                (commandRequest.getCommand().toArray()) as String[])
        exec.addShutdownHook {
            try {
                exec.destroy()
            } catch (Throwable throwable) {
                throwable.printStackTrace()
            }
        }
        def tempDirForGlobal = GUtils.getTempDirForGlobal()
        def loggingFile = commandRequest.getLoggingFile() == null ? SFUtils.getExecLogFile(twa, RandomUtil.randomUUID()) : commandRequest.getLoggingFile()
        SFUtils.mkdirsP(loggingFile)
        println(loggingFile)
        CommandResponseRef commandResponseRef = new CommandResponseRef();
        commandResponseRef.setLoggingFile(loggingFile)
        commandResponseRef.setProcess(exec)
        return commandResponseRef
    }

    public String getFactualExtDir_str() {
        return getFactualExtDir().toString()
    }

    public String getM1() {
        return this.getClass().getProtectionDomain().getCodeSource().getLocation().getFile()
    }

    public File getFactualExtDir() {
        def file_str = getM1()
        File file = new File(file_str)
        while (true) {
            if (file.getName() == 'backend') {
                return file;
            }
            file = file.getParentFile()
        }
        return null;
    }

    public static List<Map> getAlgListings() {
        return [[label: "HS256",
                 value: "HMAC256",],
                [label: "HS384",
                 value: "HMAC384"],
                [label: "HS512",
                 value: "HMAC512"],
                [label : "RS256",
                 value : "RSA256",
                 "type": "pub_pri"],
                [label : "RS384",
                 value : "RSA384",
                 "type": "pub_pri"],
                [label : "RS512",
                 value : "RSA512",
                 "type": "pub_pri"],
//                [
//                        label  : "ES256",
//                        value    : "ECDSA256",
//                        "type": "pub_pri"
//                ],
//                [
//                        label  : "ES384",
//                        value    : "ECDSA384",
//                        "type": "pub_pri"
//                ],
//                [
//                        label  : "ES512",
//                        value    : "ECDSA512",
//                        "type": "pub_pri"
//                ]
        ].collect {
            return [*: it,]
        }
    }

    public boolean markNoExpireChecking(Map params) {
        params['no_expire_checking'] = true;
    }

    public File getFileFromTextIfHas(String text, SFWrapper sfWrapper) throws UploadFileExpiredException {
        if (text.startsWith("[CG_FILE_003]")) {
            def tmp_text = text.replace("[CG_FILE_003]", "")
            def newFile = sfWrapper.getFile(tmp_text.trim())
            if (newFile.exists()) {
                return newFile;
            } else {
                throw new UploadFileExpiredException()
            }
        }
        return null;
    }

    public ResFunc init(String action, Map<String, Object> params) {
        def g = DBWrapper.init(params);
        def twa = ToolWrapper.init(params)
        def sf = SFWrapper.init(params)
        def SFUtils = sf;
        def SF = sf;
        def userDir = twa.getCommonUserDir()
        def backupRootDir = twa.getBackupDir()
        return ResFunc.ok([:])
    }

    public static final String KEY_CACHE_USE = 'cgdev_cache_'

    public void setAsExpiredTime(Map params, Integer seconds) {
        params['max_expired_time'] = 8;
    }

    public Integer getExpiredTime(Map params) {
        def m_value = params['max_expired_time'] as Integer
        if (m_value == null) {
            m_value = 12;
        }
        return m_value
    }

    public static boolean isPortalMode(Map params) {
        return params['val_p_mode'] == true
    }

    public ResFunc handleValueFromTextOrFile(String action,
                                             Map<String, Object> params,
                                             List<HandleTypeAndValue> handleTypeAndValueList = []) {

//        def inst_1 = new SubPortalCanCallHandler();
//        def inst_1_res = inst_1.handle(action, params)
//        if (inst_1_res != null) {
//            return inst_1_res;
//        }
        def isPortalMode = params['val_p_mode'] == true

        if (handleTypeAndValueList) {
            handleTypeAndValueList.addAll(PortalCanCallSubDefinitions.getMyDefinitions())
            if (!isPortalMode) {
                handleTypeAndValueList.addAll(OnlyLocalCanCallSubDefinition.getMyDefinitions())
            }
            handleTypeAndValueList.add(
                    new HandleTypeAndValue() {
                        @Override
                        String getType() {
                            return 'qrcode_create'
                        }

                        @Override
                        ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext) {
                            synchronized ("all-block".intern()) {
                                def url = params['url'] as String
                                if (url == '' || url == null) {
                                    return ResFunc.ok([
                                            data_url_link: ''
                                    ])
                                }
                                def no_write_file = isPortalMode
                                if (no_write_file) {
                                    params['config_qr_height'] = '800'
                                    params['config_qr_width'] = '800'
                                }
                                def resValue = ext.callExterior("qr_code_handler", [
                                        no_write_file: no_write_file,
                                        isPortalMode : no_write_file,
                                        type         : 'encode',
                                        content      : url,
                                        otherConfig  : params['otherConfig'],
                                        icon_img_path: ext.twa.getClzFile("icon.png").toString()
                                ])
                                return ResFunc.ok([
                                        data_url_link: "data:image/jpeg;base64,${resValue['result']}".toString()
                                ])
                            }
                        }
                    }

            )
            handleTypeAndValueList.add(new HandleTypeAndValue() {
                @Override
                String getType() {
                    return 'load_static'
                }

                @Override
                ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext) {
                    def file_arr = []
                    def all_files = []
                    params['runtime_listings'].each {
                        def allFile = getLibDirByName(it['prop'] as String, params)
//                        all_files.add(allFile.toString())
                        ext.sfWrapper.loopFiles(allFile, new FileFilter() {
                            @Override
                            boolean accept(File pathname) {
                                if (pathname.getName().endsWith(".js")) {
                                    file_arr.add([
                                            name : pathname.getName(),
                                            value: ext.sfWrapper.readAsString(pathname)
                                    ])
                                }
                                return true
                            }
                        })
                    }
                    return ResFunc.ok([
                            all_files: all_files,
                            file_arr : file_arr
                    ])
                }
            })
        }
        def expiredTime = getExpiredTime(params);
        def fn_getFromRedis = params['fn_getFromRedis']
        def fn_setFromRedis = params['fn_setFromRedis']
        def fn_delFromRedis = params['fn_delFromRedis']

        AtomicLong previous_counter = fn_getFromRedis('AtomicInteger_ctn')
        if (previous_counter == null) {
            synchronized ("lock_all_now".intern()) {
                previous_counter = new AtomicLong(RandomUtil.randomDouble(1) as Long)
                fn_setFromRedis('AtomicInteger_ctn', previous_counter)
            }
        }
        def simpleUUID = 'THREAD_CHK_' + previous_counter.incrementAndGet()
        fn_setFromRedis(simpleUUID, '1')
        def ref = Thread.currentThread()
        def feature_value = ThreadUtil.execAsync(new Runnable() {
            @Override
            void run() {
                ThreadUtil.sleep(expiredTime, TimeUnit.SECONDS)
                def value = fn_getFromRedis(simpleUUID)
                if (value != null && params['no_expire_checking'] != true) {
                    ref.stop()
                }
            }
        })
        try {
            def config_charset = params['config_charset'] as String
            if (config_charset == null || config_charset == '') {
                config_charset = 'UTF-8'
            }
            def g = DBWrapper.init(params);
            def twa = ToolWrapper.init(params)
            def sf = SFWrapper.init(params)
            def SFUtils = sf;
            def SF = sf;
            def userDir = twa.getCommonUserDir()
            def backupRootDir = twa.getBackupDir()
            def duplicateJsonFile = sf.getFileWithNoCheck(params['val_DSLFolder'] as String, "dto/duplicate.json")
//   || params['flag_isDev'] == true
            def fn_gcc_callDSL = params['fn_gcc_callDSL']
            def val_pid = params['val_pid']
            def initKey = KEY_CACHE_USE + val_pid
            if (fn_getFromRedis(initKey) == null) {
                init(action, params)
                fn_setFromRedis(initKey, '1')
            }
//        markInited()
//        if (fn_getFromRedis(val_pid + 'init') == null) {
//            init(action, params)
//            if (params['flag_isDev'] != true) {
//                fn_setFromRedis(val_pid + 'init', '1')
//            }
//        }
            def val_logDir = sf.getFileWithNoCheck(params['val_logDir'] as String)
            def DSL_subFile = sf.getFileWithNoCheck(userDir, "DSL")
            def DSLFolder = twa.getDSLFolder();
            def sfWrapper = sf;
            def result = callCommonProcedures(action, params)
            if (result != null) {
                return result;
            }
            def text = params['text'] as String;
            // handling
            byte[] bytes_text = null;
            def file = null;
            if (text != null) {
                try {
                    if (text == null) {
                        text = ''
                    }
                    file = getFileFromTextIfHas(text, sfWrapper)
                    if (file != null) {
                        bytes_text = sf.readAsBytes(file)
                        text = sf.readAsString(file, config_charset)
                    } else {
                        bytes_text = text.toString().getBytes(config_charset)
                    }
                } catch (UploadFileExpiredException ignored) {
                    return getExpiredResult()
                }
            }
            if (bytes_text == null && text != null) {
                bytes_text = text.getBytes(config_charset)
            }

//            if (){
//                return ResFunc.ok([
//                        value: "Error: Value cannot be empty."
//                ])
//            }

            def typeStr = params['type']
            def matchItem = handleTypeAndValueList.find({
                return it.getType() == typeStr || it.getType() == action
            })
            if (matchItem != null) {
                def item = new ExtHandleItem()
                item.empty = (text == null || text.trim().length() == 0 || bytes_text == null || bytes_text.length == 0)
                item.fn_setFromRedis = fn_setFromRedis;
                item.fn_getFromRedis = fn_getFromRedis;
                item.fn_delFromRedis = fn_delFromRedis;
                item.params = params;
                item.dbWrapper = g;
                item.g = g;
                item.sfWrapper = SF;
                item.twa = twa;
                PHolder.EXT_HANDLE_HOLDER.set(item)
                def m100200 = matchItem.handle(text, bytes_text, file, item)
                return m100200
            }

            return ResFunc.ok([not_ack: 1,
                               action : action,
                               type   : typeStr,
                               text   : params['text'],]);
        } catch (Throwable throwable) {
            throwable.printStackTrace()
            if (params['return_error']) {
                return ResFunc.ok([value: "Error: ${throwable.getMessage()}".toString()])
            } else {
                throw throwable
            }
        } finally {
            try {
                fn_delFromRedis(simpleUUID)
            } catch (Throwable throwable1) {
                throwable1.printStackTrace()
            }
            try {
                feature_value.cancel(true)
            } catch (Throwable throwable1) {
                throwable1.printStackTrace()
            }
        }
    }

    public static String getInitDoneJsonName() {
        return "codegen-init-done.json"
    }

    public static ResFunc getExpiredResult() {
        return ResFunc.ok([value: 'File is Expired.'])
    }

    public boolean isNeedInit() {
        return !isInit
    }

    public void markInited() {
        isInit = true;
    }

    public static String getEscapeSpliter(String str) {
        return str.toString()
                .replaceAll("\\\\n", "\n")
                .replaceAll("\\\\t", "\t")
                .replaceAll("\\\\r", "\r")
    }

    public void saveLoggingWithFull(File logFile2, String logType, String logContent, List<String> arglist) {
        if (!logFile2.exists()) {
            def p = logFile2.getParentFile()
            if (!p.exists()) {
                p.mkdirs()
            }
            logFile2.write("")
        }
        if (logType == 'raw') {
            logFile2.append("${logContent}" + "\n")
        } else {
            logType = logType.toUpperCase()
            def mymap = [timestamp : System.currentTimeMillis(),
                         logType   : logType,
                         logContent: logContent,
                         arglist   : arglist]
            String completeLogContent = "${JSON.toJSONString(mymap)}"
            logFile2.append("${completeLogContent.replaceAll("\n", KEY_LOGFILE_SPLITER)}" + "\n")
        }
    }

    /**
     * Once F/E side launch any kind of request,
     * the local service will redirect the request to and invoke this method
     * @param action
     * @param params
     * @param serviceRequest
     * @return
     */
    public abstract ResFunc handle(String action, Map<String, Object> params);

    /**
     * if you want to disable this handler, please overwrite this method and return false
     * @return
     */
    public boolean available() {
        return true;
    }

    public ResFunc pre_handle(String action, Map<String, Object> params) {
//        println "received ${action} ${params}"
        def g = DBWrapper.init(params);
//        if (action == 'get_config_value') {
//            def prop = params['prop']
//            def myval = g.queryFirst("select * from g_ca_config where prop=:PROP", [PROP: prop])
//            if (myval != null) {
//                myval = myval['crt_value']
//            }
//            return ResFunc.ok([crt_value: myval])
//        }
//        if (action == 'set_config_value') {
//            def prop = params['prop']
//            def value = params['crt_value']
//            g.exec("update g_ca_config set crt_value=:VALUE where prop=:PROP", [PROP : prop,
//                                                                                value: value])
//            return ResFunc.ok([value: 'ok'])
//        }
        return null;
    }

    public void newErr(String err) {
        throw new UserDefinedException(err)
    }

    public File getFileByRecursive(File dir, String filename) {
        def r = null;
        // TODO: added some cache operation
        dir.eachFileRecurse {
            if (it.getName() == filename) {
                r = it
            }
        }
        return r;
    }

    public PFile getLibDirByName(String name, def params) {
        def g = DBWrapper.init(params);
        def twa = ToolWrapper.init(params)
        def sf = SFWrapper.init(params)
        def SFUtils = sf;
        def SF = sf;
        def userDir = twa.getCommonUserDir()
        def backupRootDir = twa.getBackupDir()
        def libDir = twa.getCommonLibraryDir()
        def nodeJSExtDir = sf.getFile(libDir, "${noJumpText(name)}")
        return new PFile(nodeJSExtDir)
    }

    public static String noJumpText(String str) {
        return str.replaceAll("\\.\\.", "").replaceAll("/", "")
    }


    public NodeRunEnv getNodeJSRunEnv(def params) {
        def g = DBWrapper.init(params);
        def twa = ToolWrapper.init(params)
        def sf = SFWrapper.init(params)
        def SFUtils = sf;
        def SF = sf;
        def userDir = twa.getCommonUserDir()
        def backupRootDir = twa.getBackupDir()
        def libDir = twa.getCommonLibraryDir()
        NodeRunEnv nodeRunEnv = new NodeRunEnv()
        def nodeJSExtDir = sf.getFile(libDir, "nodejs_v18.0.0")
        File flagFile = new PFile(nodeJSExtDir, "done.txt")
        def nodeExecFile = null;
        sf.loopFiles(nodeJSExtDir, new FileFilter() {
            @Override
            boolean accept(File pathname) {
                if (nodeExecFile != null) {
                    return false;
                }
                if (pathname.getName().equalsIgnoreCase("node") || pathname.getName().equalsIgnoreCase("node.exe")) {
                    nodeExecFile = pathname;
                    return false;
                }
                return true
            }
        })
        def isWindows = FileUtil.isWindows()
        if (!isWindows) {
            try {
                RuntimeUtil.exec("chmod", "755", nodeExecFile.getAbsolutePath())
            } catch (Throwable throwable) {
                throwable.printStackTrace()
            }
        }

        File nodeBaseDir = nodeExecFile.getParentFile().getParentFile()
        if (twa.isDevMode()) {
//            nodeBaseDir = new File((nodeExecFile.toString().replace("plugins_dist", "plugins") as String))
        }
        nodeRunEnv.setNodeBaseDir(nodeBaseDir)
        nodeRunEnv.setNodeBinaryFile(nodeExecFile)
        nodeRunEnv.setNodeNpmCliFile(
                getNpmCliJs(sf, nodeBaseDir, flagFile)
        )
        return nodeRunEnv
    }

    public File getNodeLogicDir(Map<String, Object> params) {
        def backendRootPath = getBackendRootPath(params)
        def ext = new ExtHandleItem(params)
        def node = ext.sfWrapper.getFileWithNoCheck(backendRootPath,
                "node")
        return ext.sfWrapper.getFileWithNoCheck(node.toString().replace('plugins_dist', 'plugins'))
    }

    public File getBackendRootPath(params) {
        def g = DBWrapper.init(params);
        def twa = ToolWrapper.init(params)
        def sf = SFWrapper.init(params)
        def SFUtils = sf;
        def SF = sf;
        def userDir = twa.getCommonUserDir()
        def backupRootDir = twa.getBackupDir()
        def backendRootPath = getFactualExtDir_str()
        def isDevMode = twa.isDevMode()
        if (isDevMode) {
            backendRootPath = backendRootPath.replaceAll("plugins", "plugins_dist")
        }
        return SFUtils.getFile(backendRootPath).getParentFile()
    }

    public File getNpmCliJs(SFWrapper sfWrapper, File nodejs, File flagFile) {
        def a_file = sfWrapper.getFile(nodejs, "lib/node_modules/npm/bin/npm-cli.js")
        if (a_file.exists()) {
            return a_file;
        }
        if (sfWrapper.empty(nodejs)) {
            throw new RuntimeException("empty nodejs file")
        }
        a_file = sfWrapper.getFile(sfWrapper.listFiles(nodejs)[0], "node_modules/npm/bin/npm-cli.js")
        if (a_file.exists()) {
            return a_file;
        }
        def finalOkFile = null;
        FileUtil.loopFiles(nodejs as File, new FileFilter() {
            @Override
            boolean accept(File pathname) {
                if (finalOkFile != null) {
                    return false;
                }
                if (pathname.getName() == 'npm-cli.js') {
                    finalOkFile = pathname
                    return true;
                }
                return true;
            }
        })
        if (finalOkFile == null) {
            if (flagFile != null) {
                sfWrapper.del(flagFile)
            }
            throw new RuntimeException("cannot trigger finalOkFile: ${finalOkFile}")
        }
        return finalOkFile;
//        FileUtil.loopFiles(file, new FileFilter() {
//            @Override
//            boolean accept(File pathname) {
//                if (pathname.getName() == 'npm-cli.js') {
//                    finalOkFile = pathname;
//                } else {
//                    return false
//                }
//                return false
//            }
//        })
//        return finalOkFile
    }

    public File getNodeBaseDir(File p_dir) {
        if (FileUtil.isWindows()) {
            return p_dir.getParentFile()
        }
        return p_dir.getParentFile().getParentFile()
    }

    public static String getCmdJson(CommandRequest commandRequest) {
        try {
            return JSON.toJSONString([
                    loggingFile: Objects.toString(commandRequest.getLoggingFile()),
                    pwd        : commandRequest.getPwd(),
                    env        : commandRequest.getEnv(),
                    command    : commandRequest.getCommand(),
            ], true)
        } catch (Throwable t) {
            return t.getMessage() + "[${commandRequest}]"
        }
    }


    public ResFunc callCommonProcedures(String action, Map<String, Object> params) {
        def g = DBWrapper.init(params);
        def twa = ToolWrapper.init(params)
        def should_run = !twa.isPortalModeInner()
        if (!should_run) {
            return null;
        }
        def sf = SFWrapper.init(params)
        def SFUtils = sf;
        def SF = sf;
        def userDir = twa.getCommonUserDir()
        def backupRootDir = twa.getBackupDir()

        def duplicateJsonFile = sf.getFile(params['val_DSLFolder'] as String, "dto/duplicate.json")
        if (isNeedInit()) {
            markInited()
        }
        // declaration

        def fn_gcc_callDSL = params['fn_gcc_callDSL']
        def fn_getEntireRedis = params['fn_getEntireRedis']
        def fn_getFromRedis = params['fn_getFromRedis']
        def fn_delFromRedis = params['fn_delFromRedis']
        def fn_setFromRedis = params['fn_setFromRedis']
        def val_logDir = sf.getFile(params['val_logDir'] as String)
        def getRuntimeLogFile = params['getRuntimeLogFile']
        def DSL_subFile = sf.getFile(userDir, "DSL")
        def DSLFolder = twa.getDSLFolder();
        // common start

        def fn_getrefid_by_nodedir = { def nodeDir -> return "g_init_ref_" + DigestUtil.md5("1235" + nodeDir.toString()).encodeHex().toString()
        }
        def fn_getNodeJsLoggingFile = { String ref_id ->
            def tempDirForGlobal = twa.getTempDirForGlobal()
            def loggingFile = SFUtils.getExecLogFile(twa, ref_id)
            return loggingFile;
        }
        def fn_getBackendRootPath = {
            def backendRootPath = getBackendRootPath(params)
            def isDevMode = twa.isDevMode()
            if (isDevMode) {
//                backendRootPath = backendRootPath.toString().replaceAll("plugins", "plugins_dist")
            }
            return backendRootPath
        }
        if (should_run) {
            if (action == 'fn_stop_all_by_ref') {
                Map redisMap = fn_getEntireRedis();
                redisMap.keySet().findAll({
                    return it.toString().startsWith(params['script_stop_prefix'] as String)
                }).each {
                    try {
                        def obj = fn_getFromRedis(it)
                        if (obj != null) {
                            obj.stop()
                            try {
                                redisMap.remove(it)
                            } catch (Throwable e) {
                                e.printStackTrace()
                            }
                        }
                    } catch (Throwable e) {
                        e.printStackTrace()
                    }
                }
            }
            if (action == 'read_buffer_logs') {
                def file_id = params['file_id'] as String
                def loggingFile = sf.getExecLogFile(twa, file_id)
                def num_offset = params['num_offset']
                if (num_offset == null) {
                    num_offset = 0
                }
                def num_size = params['num_size']
                if (num_size == null) {
                    num_size = 1024 * 10
                }
                RandomAccessFile randomAccessFile = new RandomAccessFile(loggingFile, "r")
                byte[] buffer = new byte[num_size]
                def m_len = loggingFile.length() as int
                if (num_offset > loggingFile.length()) {
                    num_offset = loggingFile.length()
                }
                if (num_offset + num_size >= m_len) {
                    num_size = m_len - num_offset
                }
                int read_factual_size = 0;
                try {
                    randomAccessFile.seek(num_offset as long)
                    read_factual_size = randomAccessFile.read(buffer, 0, num_size as int)
                } catch (Throwable t) {
                    t.printStackTrace()
                }
                def no_more = read_factual_size == 0
                def bufferStr = ""
                if (!no_more) {
                    bufferStr = StrUtil.utf8Str(buffer)
                }
                return ResFunc.ok([
                        no_more          : no_more,
                        str              : bufferStr,
                        num_offset       : num_offset,
                        num_size         : num_size,
                        next_offset      : num_offset,
                        next_offset_value: num_offset + read_factual_size,
                ])
            }
            if (action == 'read_exec_logs') {
                def file_id = params['file_id']
                def loggingFile = sf.getExecLogFile(twa, file_id as String)
                def ctn = ''
                if (loggingFile.exists()) {
                    LastFileReader lastFileReader = new LastFileReader(loggingFile)
                    def mxava = 50;
                    def arr = lastFileReader.lastNLines(mxava).getContent().split("\n");
                    if (arr != null && arr.length == mxava) {
                        arr = [
                                "LogFile: ${loggingFile.toString()}",
                                *arr
                        ].toArray()
                    }
                    ctn = arr.join("\n")
//                    ctn = loggingFile.readLines().takeRight(20000).join("\n")
                }
                return ResFunc.ok([log_content: ctn])
            }
            if (action == 'get_latest_nodejs_loggings') {
                def backendRootPath = fn_getBackendRootPath();
                def backendRootFile = backendRootPath
                def nodeDir = sf.getFile(backendRootFile, "node")
                def ref_id = fn_getrefid_by_nodedir(nodeDir)
                def waitUpdatingFiles = fn_getFromRedis(ref_id + "_status")
                def loggingFile = fn_getNodeJsLoggingFile(ref_id)
                def latestLoggingContent = ''
                if (loggingFile.exists()) {
                    latestLoggingContent = loggingFile.readLines().takeRight(20000).join("\n")
                }
                return ResFunc.ok([latestLoggingContent: latestLoggingContent,
                                   waitUpdatingFiles   : waitUpdatingFiles.collect {
                                       return [*: it, path: null]
                                   }])
            }
            if (action == 'remove_all_nodejs_services') {
                def backendRootPath = fn_getBackendRootPath()
                def backendRootFile = sf.getFile(backendRootPath)
                def nodeDir = sf.getFile(backendRootFile, "node")
                def ref_id = fn_getrefid_by_nodedir(nodeDir)
                def waitUpdatingFiles = []
                def allShouldFiles = []
                if (nodeDir.exists()) {
                    sf.loopFiles(nodeDir, new FileFilter() {
                        @Override
                        boolean accept(File pathname) {
                            if (pathname.getAbsolutePath().contains("node_modules")) {
                                return false;
                            }
                            if (pathname.getName() == (getInitDoneJsonName())) {
                                sf.del(pathname)
                                return false;
                            }
                            return true
                        }
                    })
                }
                return ResFunc.ok([:])
            }
            if (action == 'checking_nodejs_services') {
                def backendRootPath = fn_getBackendRootPath();
                def backendRootFile = sf.getFile(backendRootPath)
                def nodeDir = sf.getFile(backendRootFile, "node")
                def ref_id = fn_getrefid_by_nodedir(nodeDir)
                def waitUpdatingFiles = []
                def allShouldFiles = [];
                if (nodeDir.exists()) {
                    sf.loopFiles(nodeDir, new FileFilter() {
                        @Override
                        boolean accept(File pathname) {
                            if (pathname.getAbsolutePath().contains("node_modules")) {
                                return false;
                            }
                            println("chking pathname: ${pathname}")
                            println("chking pathname filename: ${pathname.getName()}")
                            if (pathname.getName() == ("package.json")) {
                                def doneJson = sf.getFile(pathname.getParentFile(), getInitDoneJsonName())
                                def sub_node_modules = sf.getFile(pathname.getParentFile(), "node_modules")
                                if (sf.empty(doneJson)
                                        || sf.readAsString(doneJson) != sf.readAsString(pathname)
                                        || sf.empty(sub_node_modules)
                                ) {
                                    waitUpdatingFiles.add([
                                            time_str: '',
                                            status  : 'not_init_yet',
                                            name    : pathname.getParentFile().getName(),
                                            path    : pathname.getAbsolutePath()
                                    ])
                                }
                            }
                            return true
                        }
                    })
                }
                if (waitUpdatingFiles.size() != 0) {
                    def loggingFile = fn_getNodeJsLoggingFile(ref_id)
                    def isChina = params['lang'] == 'zh_CN'
                    def isWindows = FileUtil.isWindows()
                    def file_sep = isWindows ? "\\" : '/'
                    synchronized (ref_id.intern()) {
                        def preItem = fn_getFromRedis(ref_id)
                        if (params['force_push_init']) {
                            if (preItem != null) {
                                preItem.stop();
                            }
                            preItem = null;
                        }
                        if (preItem == null) {
                            sf.del(loggingFile)
                            sf.mkdirsP(loggingFile)
                            Thread thread = new Thread(new Runnable() {
                                @Override
                                void run() {
                                    def fn_writeLogging = { String type, String message -> loggingFile.append("[${DateUtil.now()}][${type.toUpperCase().toString()}] ${message.toString()}\n".toString())
                                    }
                                    try {
                                        fn_writeLogging("info", "Start initializing node.js related services...")
                                        fn_writeLogging("info", "Windows Platform: ${isWindows}")
                                        fn_writeLogging("info", "Using China Mirror: ${isChina}")
                                        fn_writeLogging("info", "Logging File: ${loggingFile.toString()}")
                                        def libDir = twa.getCommonLibraryDir()
                                        def nodeJSExtDir = sf.getFile(libDir, "nodejs_v18.0.0")
                                        def flagFile = new PFile(nodeJSExtDir, "done.txt")
                                        fn_writeLogging("info", "Node Extension Dir: ${nodeJSExtDir.toString()}")
                                        def nodeExecFile = null;
                                        sf.loopFiles(nodeJSExtDir, new FileFilter() {
                                            @Override
                                            boolean accept(File pathname) {
                                                if (nodeExecFile != null) {
                                                    return false;
                                                }
                                                if (pathname.getName().equalsIgnoreCase("node") || pathname.getName().equalsIgnoreCase("node.exe")) {
                                                    nodeExecFile = pathname;
                                                    return false;
                                                }
                                                return true
                                            }
                                        })
                                        if (!isWindows) {
                                            try {
                                                RuntimeUtil.exec("chmod", "755", nodeExecFile.getAbsolutePath())
                                            } catch (Throwable throwable) {
                                                throwable.printStackTrace()
                                            }
                                        }

                                        def nodeBaseDir = getNodeBaseDir(nodeExecFile)
                                        fn_writeLogging("info", "Node Base Dir: ${nodeBaseDir}")
                                        fn_writeLogging("info", "Node Execute File: ${nodeExecFile}")
                                        fn_writeLogging("info", "-----------------------")
                                        def cmd_str = null;
                                        def cmdResRef = null;
                                        if (isChina) {
                                            cmd_str = ["${nodeExecFile}",
                                                       "${getNpmCliJs(sf, nodeBaseDir, flagFile)}",
                                                       "config",
                                                       "set",
                                                       "registry",
                                                       "http://mirrors.cloud.tencent.com/npm/"]
                                            fn_writeLogging("exec", "" + cmd_str.join(" "))
                                            def cmdreq = new CommandRequest(
                                                    params,
                                                    cmd_str,
                                                    nodeBaseDir,
                                                    loggingFile
                                            )
                                            fn_writeLogging("exec", "" + getCmdJson(cmdreq))
                                            cmdResRef = runCmd(
                                                    cmdreq
                                            )
                                            cmdResRef.waitForProcess()
                                            fn_writeLogging("exec", "Executed")
                                        } else {
                                            cmd_str = ["${nodeExecFile}",
                                                       "${getNpmCliJs(sf, nodeBaseDir, flagFile)}",
                                                       "config",
                                                       "delete",
                                                       "registry"]
                                            fn_writeLogging("exec", "" + cmd_str.join(" "))
                                            def cmdreq_2 = new CommandRequest(
                                                    params,
                                                    cmd_str,
                                                    nodeBaseDir,
                                                    loggingFile
                                            )
                                            fn_writeLogging("exec", "" + getCmdJson(cmdreq_2))
                                            cmdResRef = runCmd(cmdreq_2)
                                            cmdResRef.waitForProcess()
                                            fn_writeLogging("exec", "Executed")
                                        }
                                        waitUpdatingFiles.each {
                                            def crt_file = sf.getFile(it['path'] as String)
                                            def crt_p = crt_file.getParentFile()
                                            def node_modules_dir = sf.getFile(crt_p, "node_modules")
                                            sf.del(node_modules_dir)
                                            sf.del(sf.getFile(crt_p, 'package-lock.json'))
                                            fn_writeLogging("info", "Detected module ${it['name']}, handling...")
                                            fn_writeLogging("info", "Init Dir Path: ${it['path']}")
                                            it['status'] = 'handling'
                                            it['time_str'] = DateUtil.now()
                                            cmd_str = ["${nodeExecFile}",
                                                       "${getNpmCliJs(sf, nodeBaseDir, flagFile)}",
                                                       "install",
                                                       "${crt_p}",
                                                       "-S",
                                                       "-D",
                                                       "--verbose"
                                            ]
                                            it['status'] = 'installing'
                                            fn_writeLogging("exec", "" + cmd_str.join(" "))
                                            def cmd_req_3 = new CommandRequest(params,
                                                    cmd_str,
                                                    crt_p,
                                                    loggingFile
                                            )
                                            fn_writeLogging("exec", "" + getCmdJson(cmd_req_3))
                                            cmdResRef = runCmd(
                                                    cmd_req_3
                                            )
//                                        npm verb audit error
                                            it['status'] = 'checking'
                                            def text = loggingFile.getText()
                                            def exitValue = cmdResRef.waitForProcess()
//                                            if(extValue == 127){
////                                                text.contains("npm verb audit error") && !text.contains("This is related to npm not being able to find a file"))
//                                            }
//                                        exitValue != 0 ||
                                            // TODO: checking that latest logic
                                            try {
                                                HttpUtil.get("https://www.baidu.com")
                                            } catch (Throwable throwable) {
                                                throwable.printStackTrace()
                                                fn_writeLogging("warn", "Network might not be able to access, please check your network.")
                                            }
//                                        if ((text != null && !text.contains("npm info ok"))) {
                                            if (sf.empty(sf.getFile(crt_p, 'node_modules'))) {
                                                it['status'] = 'error'
                                                it['err'] = true;
                                                fn_writeLogging("error", "An error occurred, please check your network or output logs")
                                                throw new RuntimeException("Failed to install")
                                            }
                                            text = null;
                                            it['status'] = 'done'
                                            sf.getFile(crt_p, getInitDoneJsonName()).write(
                                                    sf.readAsString(sf.getFile(crt_p, "package.json"), "utf-8")
                                            )
                                            fn_writeLogging("exec", "Executed")
                                            it['time_str'] = DateUtil.now()
                                            fn_writeLogging("info", "Initialized module ${it['name']} successfully!")
                                        }
                                        fn_delFromRedis(ref_id)
                                        fn_writeLogging("info", "Exit Code: 0")
                                    } catch (Throwable e) {
                                        fn_delFromRedis(ref_id)
                                        e.printStackTrace()
                                        fn_writeLogging("error", e.getMessage())
                                        fn_writeLogging("info", "Exit Code: -1")
                                    }
                                }
                            })
                            thread.start()
                            def obj = thread;
                            preItem = obj;
                            fn_setFromRedis(ref_id, preItem)
                            fn_setFromRedis(ref_id + "_status", waitUpdatingFiles)
                        }
                    }
                }
                //            nodeFile.exists()
                return ResFunc.ok([
                        a                : this.getFactualExtDir_str(),
                        b                : this.getM1(),
                        backendRootPath  : fn_getBackendRootPath(),
                        ref_id           : ref_id,
                        waitUpdatingFiles: waitUpdatingFiles.collect { it -> return [*: it, path: null]
                        }])
            }
            if (action == 'fn_call_result') {
                def play_script_content = params['play_script_content'] as String;
                def script_type = params['script_type'] as String;
                def script_stop_prefix = params['script_stop_prefix'] as String;
                def output_log_id = params['output_log_id'] as String
                def build_log_id = params['build_log_id'] as String
                def runID = build_log_id
                def allSaveKey = script_stop_prefix + runID
                def outputLogFile = getRuntimeLogFile(output_log_id) as File
                def buildLogFile = getRuntimeLogFile(build_log_id) as File
                def mval = fn_getFromRedis(allSaveKey)
                return ResFunc.ok([hasOutput: outputLogFile.exists() && outputLogFile.length() != 0,
                                   isStop   : sf.getFile(buildLogFile.getAbsolutePath() + "_done").exists()])
            }
            if (action == 'fn_call_script') {
                def play_script_content = params['play_script_content'] as String;
                def script_type = params['script_type'] as String;
                def script_stop_prefix = params['script_stop_prefix'] as String;
                def build_log_id = params['build_log_id'] as String
                def output_log_id = params['output_log_id'] as String
                def val_tempDir = params['val_tempDir'] as File
                def runID = build_log_id
                def allSaveKey = script_stop_prefix + runID

                def outputLogFile = getRuntimeLogFile(output_log_id) as File
                def buildLogFile = getRuntimeLogFile(build_log_id) as File
                sf.del(outputLogFile)
                sf.del(sf.getFile(buildLogFile.getAbsolutePath() + "_done"))
                sf.del(buildLogFile)
                def isNodeJs = script_type == 'nodejs'
                def isGroovy = script_type == 'groovy'
                Thread thread = new Thread({
                    try {
                        saveLoggingWithFull(buildLogFile, "info", "Start initializing build environment...", [])
                        saveLoggingWithFull(buildLogFile, "info", "Received Script Content Length: {0}", [play_script_content.length() + ""])
                        saveLoggingWithFull(buildLogFile, "info", "Initialized.", [])
                        saveLoggingWithFull(buildLogFile, "info", "Build Logfile FilePath: {0}", [buildLogFile.getAbsolutePath()])
                        saveLoggingWithFull(buildLogFile, "info", "Output Logfile FilePath: {0}", [outputLogFile.getAbsolutePath()])
                        Countable countable = new Countable()
                        def exitValue = 2;
                        def runtimeSaveKey = allSaveKey + "_runtime"
                        def output_fos = new FileOutputStream(outputLogFile)
                        def fos = output_fos;
                        if (isGroovy) {
                            def binding = new Binding();
                            binding.setProperty("out", new PrintStream(new OutputStream() {
                                @Override
                                void write(int b) throws IOException {
                                    fos.write(b)
                                }
                            }))


                            GroovyShell groovyShell = new GroovyShell(binding)

                            fn_setFromRedis(runtimeSaveKey, [stop: {
                                saveLoggingWithFull(buildLogFile, "note", "Stopped the running thread by user", [])
                            }])

                            groovyShell.run(play_script_content, "rand.txt", new String[0])
                            fos.flush()
                            fos.close()

                        }
                        if (isNodeJs) {
                            def nodeJsExtDir = sf.getFile(params['commonLibraryDir'] as File, "nodejs_v18.0.0")
                            saveLoggingWithFull(buildLogFile, "info", "Searching for the Node.js executable path in the base folder {0}", [nodeJsExtDir.getAbsolutePath()])
                            File nodeJSMainFile = null;
                            sf.loopFiles(nodeJsExtDir, new FileFilter() {
                                @Override
                                boolean accept(File pathname) {
//                                println pathname
                                    if (nodeJSMainFile != null) {
                                        return false;
                                    }
                                    if (pathname.getName().equalsIgnoreCase("node") || pathname.getName().equalsIgnoreCase("node.exe")) {
                                        nodeJSMainFile = pathname;
                                    }
                                    return true
                                }
                            })
                            if (nodeJSMainFile != null) {
                                try {
                                    RuntimeUtil.exec("chmod", "755", nodeJSMainFile.getAbsolutePath())
                                } catch (Throwable throwable) {
                                    throwable.printStackTrace()
                                }
                                saveLoggingWithFull(buildLogFile, "info", "Found node executable file {0}", [nodeJSMainFile.getAbsolutePath()])
                                def crtTempFile = sf.getFile(val_tempDir, RandomUtil.randomUUID().toString() + ".js")
                                crtTempFile.write(play_script_content)
                                def cmdStr = nodeJSMainFile.getAbsolutePath() + " " + crtTempFile.getAbsolutePath()
                                saveLoggingWithFull(buildLogFile, "info", "Command: {0}", [cmdStr])
//                            saveLoggingWithFull(outputLogFile, "raw", "[CG_SYSTEM]: Launched.", [])
                                def processDef = RuntimeUtil.exec(nodeJSMainFile.getAbsolutePath(), crtTempFile.getAbsolutePath())
                                def exec = processDef
                                fn_setFromRedis(runtimeSaveKey, [stop: {
                                    saveLoggingWithFull(buildLogFile, "note", "Stopped the running thread by user", [])
                                    exec.destroy()
//                                    fn_delFromRedis(m_key)
                                }])
                                processDef.waitForProcessOutput(new OutputStream() {
                                    @Override
                                    void write(int b) throws IOException {
                                        fos.write(b)
                                    }
                                }, new OutputStream() {
                                    @Override
                                    void write(int b) throws IOException {
                                        fos.write(b)
                                    }
                                })
                                fos.flush()
                                fos.close()
//                            fos.write("\nExited: ${processDef.exitValue()}".getBytes("UTF-8"))
                                exitValue = processDef.exitValue()
                                if (exitValue != 0) {
                                    saveLoggingWithFull(buildLogFile, "error", "There's an error occurred while executing the script content, please check the output panel.", [])
                                }
                            } else {
                                saveLoggingWithFull(buildLogFile, "info", "Cannot found in the above folder, please ensure there's a file whose name is node or node.exe", [])
                                return;
                            }
                        }
                        saveLoggingWithFull(buildLogFile, "system", "Elapsed Times(ms): {0}", [countable.countMilesRawValue() + ""])
                        saveLoggingWithFull(buildLogFile, "system", "Exited with code {0}", [exitValue + ""])
                    } catch (Throwable throwable) {
                        throwable.printStackTrace()
                        saveLoggingWithFull(buildLogFile, "error", "Error Occurred: {0}", [throwable.getMessage()])
                    } finally {
                        sf.getFile(buildLogFile.getAbsolutePath() + "_done").write("ok")
//                    fn_delFromRedis(allSaveKey)
//                    fn_delFromRedis(allSaveKey + "_runtime")
                    }
                })
                thread.start()
                fn_setFromRedis(allSaveKey, [stop: {
                    saveLoggingWithFull(buildLogFile, "note", "Stopped the process by user", [])
                    thread.stop()
//                    fn_delFromRedis(allSaveKey)
//                    fn_delFromRedis(allSaveKey + "_runtime")
                }])
            }
            if (action == 'readMetaOfLogFile') {
                def startValue = params['startValue']
                def readPageSize = params['readPageSize']
                def log_file_id = params['log_file_id']
                def last_mod = params['last_mod']
                def anyUpdate = false;
                def logFile = sf.getFile_WithChecking(val_logDir, "runtime/" + log_file_id)
                def totalCtn = 0
                def allTimes = 0
                anyUpdate = true;
//                while (true) {
//                    if (allTimes > 7000) {
//                        break;
//                    }
//                    def lastModified = null;
//                    if (!logFile.exists()) {
//                        lastModified = 0;
//                    } else {
//                        lastModified = logFile.lastModified()
//                    }
//                    if (last_mod == null || lastModified != last_mod) {
//                        anyUpdate = true;
//                        break;
//                    } else {
//                        def crtMiles = 200;
//                        allTimes += crtMiles
//                        sleep(crtMiles)
//                    }
//                }
//                if (logFile.exists()) {
//                    BufferedReader bufferedReader = new BufferedReader(new FileReader(logFile))
//                    while (true) {
//                        def crtLine = bufferedReader.readLine()
//                        if (crtLine == null) {
//                            break;
//                        } else {
//                            totalCtn++
//                        }
//                    }
//                }
                return ResFunc.ok([anyUpdate     : anyUpdate,
                                   totalLineCount: totalCtn,
                                   last_mod      : logFile.lastModified()])
            }
            if (action == 'readLogFileBySplit') {
                def startValue = params['startValue'] as Integer
                def readPageSize = params['readPageSize'] as Integer
                def endValue = startValue + readPageSize
                def log_file_id = params['log_file_id']
                def last_mod = params['last_mod']
                def logFile = getRuntimeLogFile(log_file_id)
                def totalCtn = 0
                def list = []
                if (logFile.exists()) {
                    BufferedReader bufferedReader = new BufferedReader(new FileReader(logFile))
                    while (true) {
                        def crtLine = bufferedReader.readLine()
                        if (crtLine == null) {
                            break;
                        } else {
                            if (totalCtn >= startValue && totalCtn <= endValue) {
                                list.add(crtLine.replaceAll(KEY_LOGFILE_SPLITER, "\n"))
                            }
                            totalCtn++
                        }
                    }
                }
                return ResFunc.ok([totalLineCount: totalCtn,
                                   last_mod      : logFile.lastModified(),
                                   list          : list])
            }
            // common end
        }
        return null;
    }

    static void mainx(String[] args) {
//        def command = "/Users/jerrylai/mincontent/PersonalProjects/denote-be/target/library/nodejs_v18.0.0/main/node-v18.0.0-darwin-x64/bin/node /Users/jerrylai/mincontent/PersonalProjects/denote-be/target/workspaces/default/temp/b4744157-5e05-480a-9822-af7bb03054f1.js"
//        def obj = command.split(" ")
//        def p = RuntimeUtil.exec(obj[0], obj[1])
//        def file = new File("/users/jerrylai/t100")
//        FileOutputStream fos = new FileOutputStream(file)
//        p.waitForProcessOutput(new OutputStream() {
//            @Override
//            void write(int b) throws IOException {
//                fos.write(b)
//            }
//        }, new OutputStream() {
//            @Override
//            void write(int b) throws IOException {
//                fos.write(b)
//            }
//        })
//        fos.close()

        def binding = new Binding();
        def fos = new FileOutputStream(new File("/users/jerrylai/abc"))
        binding.setProperty("out", new PrintStream(new OutputStream() {
            @Override
            void write(int b) throws IOException {
//                println("received output byte ${b}")
//                print(b)
                fos.write(b)
            }
        }))

        GroovyShell groovyShell = new GroovyShell(binding)
        groovyShell.run("""
    def file = new File("/users/jerrylai")
    file.listFiles().each{
        println(it)
    }
    println("ok")
""", "rand.txt", new String[0])
        fos.flush()
        fos.close()
    }

    static void main(String[] args) {
//        AtomicInteger atomicInteger = new AtomicInteger(10)
//        Countable countInfo = new Countable()
////        println RandomUtil.simpleUUID().toString()
//        println atomicInteger.getAndIncrement()
//        println countInfo.countMilesRawValue()
        def file = new File("/users/jerrylai/. ./jerrylai${noJumpText("22/11..dk391/../../dd./")}")
        println file.toString()
        println file.exists()
        file.listFiles().each {
            println(it)
        }
    }
}
