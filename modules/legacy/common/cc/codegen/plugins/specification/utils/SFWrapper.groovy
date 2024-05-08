package cc.codegen.plugins.specification.utils

import cn.hutool.core.lang.Assert
import com.alibaba.fastjson.JSON

class SFWrapper {

    private def ref;
    private def params;

    SFWrapper() {

    }

    public boolean validJSON(File file) {
        try {
            if (empty(file)) {
                return false;
            }
            JSON.parse(file.getText("UTF-8"))
            return true;
        } catch (Throwable eeee) {
            return false;
        }
    }

    public void writeStringToFile(File file, String value) {
        ref.writeStringToFile(file, value)
    }

    public static SFWrapper init(params) {
        def inst = new SFWrapper();
        inst.params = params;
        inst.ref = params['val_sfutilsRef']
        return inst
    }

    public String readAsString(File file, String encode) {
        return ref.readAsString(file, encode)
    }

    public void mkdirsP(File file) {
        ref.mkdirsP(file)
    }

    public String readAsString(File file) {
        return ref.readAsString(file)
    }


    public String readAsStringWithSafe(File file) {
        try {
            return ref.readAsString(file)
        } catch (Throwable e) {
            e.printStackTrace()
            return null;
        }
    }


    public byte[] readAsBytes(File file) {
        return ref.readAsBytes(file)
    }

    public List<File> loopFiles(File file, FileFilter fileFilter) {
        return ref.loopFiles(file, fileFilter)
    }

    public void mkdirs(File file) {
        ref.mkdirs(file)
    }

    public void writeBytesToFile(File file, byte[] data) {
        ref.mkdirs(file)
    }

    public void del(File a) {
        ref.del(a)
    }

    public boolean empty(File file) {
        return ref.empty(file)
    }

    public void move(File file1, File file2) {
        ref.move(file1, file2)
    }

    public void moveToBak(File a) {
        ref.moveToBak(a)
    }

    public void copyDirectory(File a, File b) {
        ref.copyDirectory(a, b)
    }

    public void copyFile(File a, File b) {
        ref.copyFile(a, b)
    }

    public void copyDirectory(File a, File b, FileFilter fileFilter) {
        ref.copyDirectory(a, b, fileFilter)
    }

    // default no checking

    public File getFileWithNoCheck(String absolutePath) {
        if (params['getFileWithNoCheck_1']) {
            return params.getFileWithNoCheck_1(absolutePath)
        } else {
            return ref.getFile(absolutePath)
        }
    }


    public File getFileWithUploadedFile(String absolutePath) {
        return ref.getFile(absolutePath)
    }

    public File getFileWithNoCheck(String a, String b) {
        if (a == null || b == null) {
            throw new RuntimeException("invalid name.1")
        }
        if (params['getFileWithNoCheck_2']) {
            return params.getFileWithNoCheck_2(getFileWithNoCheck(a), b)
        } else {
            return ref.getFile(a, b)
        }
    }


    public File getFileWithNoCheck(def obj, File file, String name) {
        return getFileWithNoCheck(file, name)
    }

    public File getFileWithNoCheck(File file, String name) {
        if (file == null || name == null) {
            throw new RuntimeException("invalid name.2")
        }
        if (params['getFileWithNoCheck_2']) {
            return params.getFileWithNoCheck_2(file, name)
        } else {
            return ref.getFile(file, name)
        }
    }

    // default no checking

    public File getFile(String parentFile, String subPath) {
        return getFileWithNoCheck(parentFile, subPath)
    }


    public File getFile(File parentFile, String subPath) {
        return getFileWithNoCheck(parentFile, subPath)
    }

    public File getFile(File file) {
        return (file)
    }

    public File getFile(String parentFile) {
        return getFileWithNoCheck(parentFile)
    }

    // checking

    public File getFile_WithChecking(String parentFile, String subPath) {
        return ref.getFile(parentFile, subPath)
    }


    public File getFile_WithChecking(File parentFile, String subPath) {
        return ref.getFile(parentFile, subPath)
    }

    public File getFile_WithChecking(File parentFile) {
        return (parentFile)
    }

    public File getFile_WithChecking(String parentFile) {
        return ref.getFile(parentFile)
    }


    public FileInputStream getFis(String path) {
        return ref.getFis(path)
    }

    public FileInputStream getFis(File path) {
        return ref.getFis(path)
    }

    public FileOutputStream getFos(String path) {
        return ref.getFos(path)
    }

    public File[] listFiles(File file) {
        return ref.listFiles(file)
    }

    public File[] listFiles(File file, FilenameFilter filenameFilter) {
        return ref.listFiles(file)
    }

    public File[] listFiles(File file, FileFilter filenameFilter) {
        return ref.listFiles(file)
    }

    public FileOutputStream getFos(File path) {
        return ref.getFos(path)
    }


    File getRuntimeStatusFile(ToolWrapper twa, String fileName) {
        def a = getFile_WithChecking(twa.getTempDirForGlobal(), "runtime/status-" + fileName + ".json");
        mkdirsP(a)
        return a;
    }

    File getRuntimeConfigFile(ToolWrapper twa, String fileName) {
        def a = getFileWithNoCheck(twa.params, twa.getTempDirForGlobal() as File, "runtime/config-" + fileName + ".json");
        mkdirsP(a)
        return a
    }

    File getExecLogFile(ToolWrapper twa, String fileName) {
        def a = getFile_WithChecking(twa.getTempDirForGlobal(), "exec_logs/log-" + fileName + ".txt");
        mkdirsP(a)
        if (!a.exists()) {
            a.write("")
        }
        return a
    }

}
