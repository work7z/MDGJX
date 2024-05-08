package cc.codegen.plugins.specification.subsystem.server

class RunScriptVM {
    File execFile;
    File pwd;

    RunScriptVM(File execFile, File pwd) {
        this.execFile = execFile
        this.pwd = pwd
    }
}
