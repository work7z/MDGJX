package cc.codegen.plugins.specification.definition

import cn.hutool.cron.task.Task

abstract class NameTask implements Task {
    public abstract String getName();
    public abstract String getId();
}
