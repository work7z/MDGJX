package cc.codegen.plugins.specification.utils

import cc.codegen.plugins.specification.definition.ExtHandleItem

class PCScriptLogFile {
    String id;
    String pid;
    ExtHandleItem ext;
    File file;
    File logsFile;
    File errFile;

    PCScriptLogFile(String id, String pid, ExtHandleItem ext) {
        this.id = id
        this.pid = pid
        this.ext = ext
        def scriptIDFileName = "main" + (ext.win() ? ".bat" : ".sh")
        def baseDir = ext.sfWrapper.getFileWithNoCheck(ext.twa.tempDirForCurrentWorkspace,
                "CmdScheduler/${id}")
        ext.sf.mkdirsP(baseDir)
        file = ext.sfWrapper.getFileWithNoCheck(baseDir,
                scriptIDFileName)
        logsFile = ext.sf.getFileWithNoCheck(baseDir,
                "log.txt")
        errFile = ext.sf.getFileWithNoCheck(baseDir,
                "err.txt")
    }
}
