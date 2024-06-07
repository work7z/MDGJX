package cc.codegen.plugins.specification.utils.cmd

class CommandRequest {
    Map params;
    List<String> command;
    String[] env = new String[0];
    File pwd;
    File loggingFile;


    CommandRequest(Map params, List<String> command, File pwd, File loggingFile) {
        this.params = params
        this.command = command
        this.pwd = pwd
        this.loggingFile = loggingFile;
    }

    CommandRequest(Map params, List<String> command, String[] env, File pwd) {
        this.params = params
        this.command = command
        this.env = env
        this.pwd = pwd
    }
}
