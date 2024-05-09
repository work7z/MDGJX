package cc.codegen.plugins.specification.utils

import cn.hutool.core.bean.BeanUtil
import cn.hutool.core.io.FileUtil
import com.alibaba.fastjson.JSON

class ToolWrapper {
    public File get_USER_HOME_DIR() {
        return ref.get_USER_HOME_DIR()
    }

    public boolean validateJSONStr(String str) {
        return ref.validateJSONStr(str)
    }


    public String getFactualFrontEndVersionWithV() {
        return ref.getFactualFrontEndVersionWithV()
    }

    public String getDirectPlatform() {
        return ref.getDirectPlatform()
    }

    public String getAppAffixName() {
        return ref.getAppAffixName()
    }

    public String getPlatform() {
        return ref.getPlatform()
    }

    public String noJumpText(String str) {
        return ref.noJumpText(str)
    }

    File getBasedirForMultipleWorkspace() {
        return ref.getBasedirForMultipleWorkspace();
    }

    Map<String, Object> readFileAsJSONMap(File file) {
        return ref.readFileAsJSONMap(file)
    }

    public <T> T parse(String o, Class<T> outputArgsClass) {
        return ref.parse(o, outputArgsClass)
    }

    String getErrToStr(Throwable throwable) {
        return ref.getErrToStr(throwable)
    }
    private def ref;

    ToolWrapper() {

    }

    public Object callHistoryTab(String actionType, Map params) {
        return ref.callHistoryTab(actionType, params);
    }

    Map params;

    public File getClzFile(String path) {
        return ref.getClzFile(path)
    }

    public boolean isPortalModeInner() {
        def no_write_file = params['val_p_mode'] == true
        return no_write_file;
    }

    public static ToolWrapper init(Map params) {
        def inst = new ToolWrapper();
        inst.params = params;
        inst.ref = params['val_gutilsRef']
        return inst
    }

    public boolean isDevMode() {
        return ref.isDevMode();
    }


    public String md5(def obj) {
        return ref.md5(obj);
    }

    public String toJSON(def obj) {
        return ref.toJSON(obj);
    }


    public String toJSONWithBeautify(def obj) {
        return ref.toJSONWithBeautify(obj);
    }

    public File getCommonLibraryDir() {
        return ref.getCommonLibraryDir();
    }

    public File getTempDirForGlobal() {
        return ref.getTempDirForGlobal()
    }

    public File getTempDirForCurrentWorkspace() {
        return ref.getTempDirForCurrentWorkspace();
    }

    public File getCurrentActiveWorkspace() {
        return ref.getCurrentActiveWorkspace()
    }

    public File getCommonUserDir() {
        return ref.getCommonUserDir();
    }

    public File getBackupDir() {
        return ref.getBackupDir();
    }

    public File getCommonVendorDir() {
        return ref.getCommonVendorDir()
    }

    public File getDSLFolder() {
        return ref.getDSLFolder()
    }


    static Map<String, Object> toMap(String s) {
        return JSON.parseObject(s, Map.class);
    }

    static Map<String, Object> toMapByFile(File s) {
        try {
            return JSON.parseObject(s.readLines().join("\n"), Map.class);
        } catch (Throwable throwable) {
            throwable.printStackTrace()
            return [:]
        }
    }


    static String ref_getErrToStr(Throwable throwable) {
        def writer = new StringWriter()
        throwable.printStackTrace(new PrintWriter(writer))
        def fin_err = writer.getBuffer().toString()
        return fin_err
    }


    String uuid() {
        return ref.uuid();
    }

    File getJarCurrentFolder() {
        return ref.getJarCurrentFolder()
    }

}
