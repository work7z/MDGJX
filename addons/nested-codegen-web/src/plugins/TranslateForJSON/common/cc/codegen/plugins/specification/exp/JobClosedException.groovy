package cc.codegen.plugins.specification.exp

class JobClosedException extends Exception {
    @Override
    String getMessage() {
        return "JOE_CLOSED_NORMALLY"
    }
}
