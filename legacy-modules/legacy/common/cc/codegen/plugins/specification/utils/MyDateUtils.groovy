package cc.codegen.plugins.specification.utils

import cn.hutool.core.date.DateUtil

class MyDateUtils {
    public static List<Date> getRecentDays(int recentDays) {
        def list = []
        def inst = Calendar.getInstance()
        for (def i in 0..recentDays) {
            inst.add(Calendar.DAY_OF_MONTH, -1 * i)
            list.add(new Date(inst.getTime().getTime()))
        }
        return list;
    }

    static void main(String[] args) {
        println getRecentDays(7).collect({ it -> DateUtil.formatDateTime(it) })
    }
}
