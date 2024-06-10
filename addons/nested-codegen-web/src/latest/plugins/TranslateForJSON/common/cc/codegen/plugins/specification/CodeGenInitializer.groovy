package cc.codegen.plugins.specification

import cc.codegen.plugins.specification.database.DbUtils
import cn.hutool.db.Db

import javax.sql.DataSource

abstract class CodeGenInitializer {
    public abstract List<CodeGenPluginHandler> getHandlers();

    public void setDataSource(DataSource dataSource) {
        def db = Db.use(dataSource)
        DbUtils.dbRef = db;
        DbUtils.ds = dataSource
    }

}
