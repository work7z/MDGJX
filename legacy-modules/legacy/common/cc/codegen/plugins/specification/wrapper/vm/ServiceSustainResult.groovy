package cc.codegen.plugins.specification.wrapper.vm

abstract class ServiceSustainResult {
    public abstract void stop();

    public abstract ServiceLocation getServiceLocation();
}
