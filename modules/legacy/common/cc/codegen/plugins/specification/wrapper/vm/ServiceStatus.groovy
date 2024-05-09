package cc.codegen.plugins.specification.wrapper.vm

class ServiceStatus {
    int exitValue;
    List errors = [];
    boolean done = false;
    long start_timestamp = System.currentTimeMillis()
    long error_timestamp
    long end_timestamp
    List<TranslateBundle> messages = [];

    public void putError(def error) {
        errors.add(error)
        error_timestamp = System.currentTimeMillis()
    }

    public void markAsDone() {
        end_timestamp = System.currentTimeMillis()
        done = true;
    }

    public void putMessage(TranslateBundle translateBundle) {
        messages.add(translateBundle)
    }
}
