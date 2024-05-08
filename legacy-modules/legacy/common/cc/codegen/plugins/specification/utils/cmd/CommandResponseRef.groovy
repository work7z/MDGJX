package cc.codegen.plugins.specification.utils.cmd

class CommandResponseRef {
    File loggingFile;
    Process process;

    public int waitForProcess() {
        def exec = process;
        def fos = new FileOutputStream(loggingFile, true)
        process.waitForProcessOutput(fos, fos)
        return exec.exitValue()
    }

    public void stop() {
        process.destroy()
    }
}
