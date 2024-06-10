package cc.codegen.plugins.specification.wrapper.vm

abstract class ServiceRunnable {
    def status = new ServiceStatus();

    public abstract ServiceSustainResult runAndReturnQuickly();

    public abstract String getKey();

}
