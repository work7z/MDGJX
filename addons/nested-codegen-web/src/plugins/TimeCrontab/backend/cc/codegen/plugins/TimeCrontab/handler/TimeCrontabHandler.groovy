package cc.codegen.plugins.TimeCrontab.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import cn.hutool.cron.pattern.CronPattern
import cn.hutool.cron.pattern.CronPatternUtil
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class TimeCrontabHandler extends CodeGenPluginHandler {

    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        setAsExpiredTime(params, 8)
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "next_cron_str_list"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                try {
                    def str = value
                    str = str.replaceAll("\\s+", " ")
                    def inst = Calendar.getInstance()
                    inst.add(Calendar.YEAR, 5);
                    def res = CronPatternUtil.matchedDates(str, System.currentTimeMillis(), inst.getTimeInMillis(), 100, str.split(" ").length == 7)
                    def item = res.collect {
                        return it.getTime()
                    }
                    return ResFunc.ok(
                            [
                                    time_listing: item,
                                    base_time   : item.first()
                            ]
                    )
                } catch (Throwable throwable) {
                    throwable.printStackTrace()
                    return ResFunc.ok([
                            err: throwable.getMessage()
                    ])
                }
            }
        }])
    }

}
