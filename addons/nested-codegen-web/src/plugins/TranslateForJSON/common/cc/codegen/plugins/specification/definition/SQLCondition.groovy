package cc.codegen.plugins.specification.definition

import cc.codegen.plugins.specification.database.DBWrapper

class SQLCondition {
    String SQL;
    Map<String, Object> params;
    DBWrapper dbWrapper;

    SQLCondition(DBWrapper dbWrapper1, String SQL, Map<String, Object> params) {
        this.dbWrapper = dbWrapper1
        this.SQL = SQL
        this.params = params
    }
}
