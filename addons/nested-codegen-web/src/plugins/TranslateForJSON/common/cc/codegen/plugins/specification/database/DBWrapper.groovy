package cc.codegen.plugins.specification.database

import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper

import static cc.codegen.plugins.specification.subsystem.server.ServerBaseCommonHandler.justOnlyCharacter

class DBWrapper {
    public static def idColumn = "id bigint PRIMARY KEY auto_increment NOT NULL";
    public static def createTimeColumn = " create_time timestamp DEFAULT current_timestamp ";

    private def dsRef;

    DBWrapper() {

    }

    public List getSQLParser(String sql, String DBTYPE) {
        return dsRef.getSQLParser(sql, DBTYPE)
    }

    public String getSQLParserAsStr(String sql, String DBTYPE) {
        return dsRef.getSQLParserAsStr(sql, DBTYPE)
    }

    public int getNextInt(String key) {
        return dsRef.getNextInt(key)
    }

    public static DBWrapper initGeneralByName(params, String databaseName) {
        def dbRef = params['fn_initGeneralDatabase'](databaseName)
        def inst = new DBWrapper();
        inst.dsRef = dbRef;
        return inst
    }


    public static DBWrapper initScopeSharingRefByName(Map params, String databaseName) {
        databaseName = justOnlyCharacter(params,databaseName)
        databaseName = "sharing_${databaseName}"
        def GData = DBWrapper.init(params)
        def GUtils = ToolWrapper.init(params)
        def SFUtils = SFWrapper.init(params)
        File saveFile = SFUtils.getFileWithNoCheck(GUtils.getCurrentActiveWorkspace() as File, "database/${databaseName}/ref")
        SFUtils.mkdirsP(saveFile)
        String general_crtGeneralDatabase = 'jdbc:h2:' + saveFile.getAbsolutePath()
        def dsRef = GData.g(general_crtGeneralDatabase)
        def inst = new DBWrapper();
        inst.dsRef = dsRef;

        return inst
    }

    public def g(String str) {
        return dsRef.g(str)
    }

    public static DBWrapper init(params) {
        def inst = new DBWrapper();
        inst.dsRef = params['val_dsRef']
        return inst
    }

    public long ctn(String sql) {
        long ctn = dsRef.ctn(sql)
        return ctn;
    }

    public long ctn(String sql, Map params) {
        long ctn = dsRef.ctn(sql, params)
        return ctn;
    }


    public DBWrapper newTable(String tableName, String DDL) {
        dsRef.newTable(tableName, DDL);
        return this;
    }

    public DBWrapper exec(String sql) {
        dsRef.exec(sql);
        return this;
    }

    public DBWrapper execSafe(String sql) {
        dsRef.execSafe(sql);
        return this;
    }

    public DBWrapper exec(String sql, Map params) {
        dsRef.exec(sql, params);
        return this;
    }

    public DBWrapper execSafe(String sql, Map params) {
        dsRef.execSafe(sql, params);
        return this;
    }

    public DBWrapper modify_own(String subject, String modifyType, Map param) {
        dsRef.modify_own(subject, modifyType, param);
        return this;
    }

    public DBWrapper modify_own(String subject, String modifyType, Map param, boolean needGenerateKeys) {
        dsRef.modify_own(subject, modifyType, param, needGenerateKeys);
        return this;
    }

    public List<Map<String, Object>> query(String sql) {
        return dsRef.query(sql)
    }

    public List<Map<String, Object>> query(String sql, Map params) {
        return dsRef.query(sql, params);
    }

    public Map<String, Object> queryFirst(String sql) {
        return dsRef.queryFirst(sql);
    }

    public Map<String, Object> queryFirst(String sql, Map params) {
        return dsRef.queryFirst(sql, params)
    }


}
