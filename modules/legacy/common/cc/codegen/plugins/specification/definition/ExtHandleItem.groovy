package cc.codegen.plugins.specification.definition

import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.keys.CpGCCKeys
import cc.codegen.plugins.specification.keys.PHolder
import cc.codegen.plugins.specification.utils.PFile
import cc.codegen.plugins.specification.utils.PUtils
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.io.FileUtil
import cn.hutool.core.util.ZipUtil
import cn.hutool.http.HttpUtil
import com.alibaba.fastjson.JSON

import java.nio.charset.Charset
import java.util.concurrent.locks.ReentrantLock
import java.util.logging.Logger

class ExtHandleItem {
    boolean empty = false;
    Map<String, Object> params;
    DBWrapper dbWrapper;
    DBWrapper g;
    SFWrapper sfWrapper;

//    PFile downloadFileAsTempFile(String URL) {
//        def randomID = twa.uuid()
//        def file = new PFile(twa.getTempDirForCurrentWorkspace(), randomID)
//        HttpUtil.downloadFile(URL)
//    }


    def getMsgFromRedis(String keyId) {
        return fn_getFromRedis(keyId)
    }

    def getMsgObjFromRedis(String keyId) {
        return fn_getFromRedis(keyId + "_obj")
//        return JSON.parseObject(, Map.class)
    }

    ReentrantLock fn_getReadyStateLck(String keyname) {
        synchronized ("fn_getReadyLck${keyname}".toString().intern()) {
            def ok = fn_getFromRedis(keyname)
            if (ok == null) {
                ok = new ReentrantLock(true)
                fn_setFromRedis(keyname, ok)
            }
            return ok;
        }
    }

    void setMsgFromRedis(String keyId, String msg) {
        fn_setFromRedis(keyId, msg)
    }

    void setMsgObjFromRedis(String keyId, Object msg) {
        fn_setFromRedis(keyId + "_obj", (msg))
    }

    public boolean win() {
        return FileUtil.isWindows()
    }

    public SFWrapper getSf() {
        return sfWrapper;
    }
    ToolWrapper twa;
    def fn_getEntireRedis;
    def fn_setFromRedis;
    def fn_getFromRedis;
    def fn_delFromRedis;

//    def getFn_setFromRedis() {
//        return params['fn_setFromRedis']
////        return fn_setFromRedis
//    }
//
//    def getFn_getFromRedis() {
//        return params['fn_getFromRedis']
//    }
//
//    def getFn_delFromRedis() {
//        return params['fn_delFromRedis']
//    }


    public void countTableRecord(String id) {
        def nowMap = [:]
        if (doGetPUB_STATUS_MAP()['table_' + id]) {
            nowMap.putAll(doGetPUB_STATUS_MAP()['table_' + id] as Map)
        }
        if (nowMap.doneCount == null) {
            nowMap.doneCount = 0;
        }
        nowMap.doneCount++
        doGetPUB_STATUS_MAP()['table_' + id] = nowMap
    }

    public void saveTableRecord(String id, SaveTableRecord saveTableRecord, Logger logger) {
        try {
            def nowMap = [:]
            if (doGetPUB_STATUS_MAP()['table_' + id] != null && doGetPUB_STATUS_MAP()['table_' + id] instanceof Map) {
                nowMap.putAll(doGetPUB_STATUS_MAP()['table_' + id] as Map)
            }
            if (logger) {
                if (saveTableRecord.getRecordStatus() == 'ERROR') {
                    logger.severe(saveTableRecord.getRecordMessage())
                } else {
                    logger.info(saveTableRecord.getRecordMessage())
                }
            }
            if (nowMap == null) {
                nowMap = [:]
            }
            nowMap.putAll(PUtils.toMap(PUtils.toJSON(saveTableRecord)))
            doGetPUB_STATUS_MAP()['table_' + id] = nowMap
        } catch (Throwable e) {
            e.printStackTrace()
        }
    }

    public Map<String, Object> doGetPUB_STATUS_MAP() {
        return params['val_PUB_STATUS_MAP'] as Map<String, Object>
    }

    public String getExtId() {
        return params['mycrtDatabaseId'];
    }

    public void addTask(CpSystemRunningTask task) {
        def fn_gcc_ranTask = params.fn_gcc_ranTask
        fn_gcc_ranTask(CpGCCKeys.KEY_ADD, [item: task])
    }

    public <T> T toObj(Object obj, Class<T> deC) {
        def newItem = deC.newInstance()
        org.springframework.beans.BeanUtils.copyProperties(obj, newItem)
        return newItem;
    }

    public ExtHandleItem() {}

    public ExtHandleItem(Map<String, Object> params) {
        def item = this;
        def fn_getFromRedis = params['fn_getFromRedis']
        def fn_setFromRedis = params['fn_setFromRedis']
        def fn_delFromRedis = params['fn_delFromRedis']
        item.fn_getEntireRedis = params['fn_getEntireRedis']
        item.fn_setFromRedis = fn_setFromRedis;
        item.fn_getFromRedis = fn_getFromRedis;
        item.fn_delFromRedis = fn_delFromRedis
        item.params = params;
        item.dbWrapper = g;
        item.g = g;
        def sf = SFWrapper.init(params)
        item.sfWrapper = sf;
        item.twa = ToolWrapper.init(params);
        PHolder.EXT_HANDLE_HOLDER.set(this)
    }


    public Map callExterior(String api_name, Map api_args) {
        return params['fn_callExterior'](api_name, api_args)
    }


    public String getConfigLineSepChar() {
        return params['config_line_sep_char'].toString()
                .replaceAll("\\\\n", "\n")
                .replaceAll("\\\\t", "\t")
                .replaceAll("\\\\r", "\r")
    }

    public def getTextHelperFilterScriptResult(List<String> list) {
        def config_text_sort_order = params['config_text_sort_order']
        if (config_text_sort_order != null) {
            switch (config_text_sort_order) {
                case 'asc':
                    list.sort(new Comparator<String>() {
                        @Override
                        int compare(String o1, String o2) {
                            return o1.compareTo(o2)
                        }
                    })
                    return list
                    break;
                case 'desc':
                    list.sort(new Comparator<String>() {
                        @Override
                        int compare(String o1, String o2) {
                            return o1.compareTo(o2) * -1
                        }
                    })
                    return list
                    break;
                case 'reverse':
                    list.sort(new Comparator<String>() {
                        @Override
                        int compare(String o1, String o2) {
                            return -1
                        }
                    })
                    return list
                    break;
            }
        }
        def config_text_helper_filter = params['config_text_helper_filter'] as String
        if (config_text_helper_filter == null || config_text_helper_filter.trim() == '') {
            return list
        }
        def finalValue = list;
//        GroovyShell groovyShell = new GroovyShell()
//        groovyShell.setVariable("m_list", list)
//        def finalValue = groovyShell.evaluate(config_text_helper_filter + """
//def idx_0=-1;
//def idx_1=-1;
//def res= m_list.findAll{
//    idx_0++
//    return isAcceptedThatLine(it,idx_0)
//}.collect{
//    idx_1++
//    return formatLine(it,idx_1)
//}
//res.sort(new Comparator<Object>() {
//@Override
// int compare(Object o1 ,Object o2){
// return comparator(o1, o2);
//}})
//return res
//""") as List
        return finalValue;
//        return ""
    }

    public List<String> getTextHelperByValue(String value, ExtHandleItem extHandleItem) {
        def config_line_sep_char = extHandleItem.getConfigLineSepChar()
        def config_clean_trim = extHandleItem.params['config_clean_trim'] == 'true'
        def config_clean_whitespaces = extHandleItem.params['config_clean_whitespaces'] == 'true'
        if (value == null) {
            value = ''
        }
        def list = value.split(config_line_sep_char).collect {
            if (config_clean_trim) {
                return it.toString().trim()
            } else {
                return it;
            }
        }.findAll {
            if (config_clean_whitespaces) {
                return !it.isAllWhitespace()
            } else {
                return true;
            }
        }.toList()
        return list;
    }

    File getDocsCache() {
        def file = new PFile(twa.getJarCurrentFolder(), "docs")
        if (isPortalMode()) {
            file = twa.getTempDirForGlobal()
        }
        FileUtil.mkdir(file)
        return file
    }

    File getStFilesAndExactIfNeeded(String docsName, String subFile) {
        def currentDocDir = sfWrapper.getFile(getDocsCache(), docsName);
        sfWrapper.mkdirs(currentDocDir)
        if (subFile.contains("..")) {
            throw new RuntimeException("invalid request!")
        }
        def finalDataFileUnzipped = new PFile(currentDocDir, subFile + "_fin")
        if (!sfWrapper.empty(finalDataFileUnzipped)) {
            return finalDataFileUnzipped
        }
        File downloadedFile = null;
        try {
            def url_file = "https://codegen-prod-release.work7z.com/st_files/${docsName}${subFile}".toString()
            println(url_file)
            downloadedFile = sfWrapper.getFileWithNoCheck(twa.getTempDirForGlobal(), "pre-download/${twa.uuid()}.txt")
            HttpUtil.downloadFile(url_file, downloadedFile)
            if (subFile.contains(".zip")) {
                sfWrapper.mkdirs(finalDataFileUnzipped)
                ZipUtil.unzip(downloadedFile, finalDataFileUnzipped)
            } else {
                sfWrapper.mkdirsP(finalDataFileUnzipped)
                if (sfWrapper.empty(finalDataFileUnzipped)) {
                    FileUtil.copyFile(downloadedFile, finalDataFileUnzipped)
                }
                println(finalDataFileUnzipped.exists())
                println(finalDataFileUnzipped.exists())
            }
            return finalDataFileUnzipped;
        } catch (Throwable throwable) {
            throwable.printStackTrace()
            throw throwable
        } finally {
            FileUtil.del(downloadedFile)
        }
    }

    boolean isPortalMode() {
        return params['val_p_mode'] == true
    }

    boolean hasFlagTrue(String s) {
        return Objects.toString(fn_getFromRedis(getFlagKeyValue(s))) == 'true'
    }

    boolean setFlagTrueFalse(String s, Boolean mValue) {
        fn_setFromRedis(getFlagKeyValue(s) as String, Objects.toString(mValue))
    }

    void clearFlagTrueFalse() {
        Map entireRedis = fn_getEntireRedis()
        def remainKeys = []
        entireRedis.each {
            if (it.getKey().toString().startsWith(___getFlagPreValue())) {
                remainKeys.add(it.getKey())
            }
        }
        remainKeys.each {
            entireRedis.remove(it)
        }
    }

    String getFlagKeyValue(s) {
        return ___getFlagPreValue() + s;
    }


    String ___getFlagPreValue() {
        return getPID() + '_f_'
    }

    String getPID() {
        return params['val_pid'] as String
    }

    public static String BASE_PROD_RELEASE_LINK = "https://codegen-prod-release.work7z.com"

    File downloadAndExact(String downloadResourceLink) {
        File tempUUIDDir = getRandomUUIDDir()
        println tempUUIDDir
        String fullURL = BASE_PROD_RELEASE_LINK + downloadResourceLink
        println "downloading_FULL_URL: ${fullURL}"
        File zipFile = getRandomUUIDFile()
        HttpUtil.downloadFile(fullURL, zipFile)
        def unzipDir = getRandomUUIDDir()
        ZipUtil.unzip(zipFile, unzipDir, Charset.forName("UTF-8"))
        return unzipDir;
    }

    private File getRandomUUIDDir() {
        def tempDir = twa.getTempDirForGlobal()
        def tempUUIDDir = sf.getFileWithNoCheck(tempDir, "r-dir-${twa.uuid()}")
        sf.mkdirs(tempUUIDDir)
        return tempUUIDDir
    }

    private File getRandomUUIDFile() {
        def tempDir = twa.getTempDirForGlobal()
        def tempUUIDDir = sf.getFileWithNoCheck(tempDir, "r-file-${twa.uuid()}")
        sf.mkdirsP(tempUUIDDir)
        return tempUUIDDir
    }
}
