package cc.codegen.plugins.specification.definition

import cc.codegen.plugins.specification.bo.ResFunc
import com.alibaba.fastjson.JSON

abstract class PaginationHandleTypeAndValue extends HandleTypeAndValue {
    public abstract SQLCondition getRawSQLCondition(ExtHandleItem ext);

    public abstract SQLCondition getCountSQLCondition(ExtHandleItem ext);

    public abstract TableCondition getOptTableName();

    public abstract void updateCountValue(Integer diffValue);

    @Override
    ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext) {
        def pagination_type = ext.params['biz_type']
        if (pagination_type == 'get_one') {
            def activeID = ext.params['activeID']
            def optTable = getOptTableName()
            if (optTable != null) {
                def table_name = optTable.getTableName()
                def a = optTable.dbWrapper.queryFirst("select * from ${table_name} where id=:id", [id: activeID])
                return ResFunc.ok([
                        value: a
                ])
            }
            return ResFunc.ok([:])
        }
        if (pagination_type == 'delete') {
            def activeID = ext.params['activeID']
            def optTable = getOptTableName()
            if (optTable != null) {
                def table_name = optTable.getTableName()
                optTable.dbWrapper.exec("delete from ${table_name} where id=:id", [id: activeID])
                updateCountValue(-1)
            }
            return ResFunc.ok([:])
        }
        def rawSQLCondition = getRawSQLCondition(ext)
        def countSQLCondition = getCountSQLCondition(ext)
        if (countSQLCondition == null) {
            countSQLCondition = new SQLCondition(rawSQLCondition.dbWrapper, """
    select count(*) as CTN from (${rawSQLCondition.SQL}) a
""", rawSQLCondition.getParams())
        }
        def PAGE_INDEX = ext.params['PAGE_INDEX'] as Integer
        def PAGE_SIZE = ext.params['PAGE_SIZE'] as Integer
        def p_limit = PAGE_SIZE
        def p_offset = (PAGE_INDEX - 1) * p_limit
        def paginationSQLCondition = new SQLCondition(rawSQLCondition.dbWrapper, """
select a.* from (${rawSQLCondition.getSQL()}) a limit ${p_limit} offset ${p_offset}
""", [*: rawSQLCondition.getParams()]);
        // get count value
        def ctnValue = countSQLCondition.dbWrapper.queryFirst(countSQLCondition.getSQL(), countSQLCondition.params)['CTN']
        def list = paginationSQLCondition.dbWrapper.query(paginationSQLCondition.getSQL(),
                paginationSQLCondition.params)
        return ResFunc.ok([value: [
                FG   : "" + ctnValue + "_" + p_limit + "_" + p_offset + "_" + JSON.toJSONString(countSQLCondition.params) + JSON.toJSONString(rawSQLCondition.params),
                COUNT: ctnValue, LIST: list]])
    }
}
