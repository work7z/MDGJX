package cc.codegen.plugins.specification.definition

import cc.codegen.plugins.specification.database.DBWrapper

class TableCondition {
    DBWrapper dbWrapper;
    String tableName;

    TableCondition(DBWrapper dbWrapper, String tableName) {
        this.dbWrapper = dbWrapper
        this.tableName = tableName
    }
}
