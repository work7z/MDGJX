package cc.codegen.plugins.specification.definition

import java.sql.Timestamp
import java.util.concurrent.ArrayBlockingQueue
import java.util.concurrent.LinkedBlockingQueue

class SaveTableRecord {
    String recordStatus;
    String recordMessage;
    long lastFinishedTime = 0;
}
