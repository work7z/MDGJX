package cc.codegen.plugins.JSONProbe.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cn.hutool.core.util.StrUtil
import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.JSONArray
import com.alibaba.fastjson.JSONObject
import org.apache.commons.lang3.StringUtils
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class JSONProbeHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "search_in_text"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                def checking_arr_result = finding_json_in_text(value)
                def idx = 0;
                def is_format_when_find = params['config_json_format_when_found'] == 'true'
                def config_json_ignore_simple_array = params['config_json_ignore_simple_array'] == 'true'
                if (config_json_ignore_simple_array) {
                    checking_arr_result = checking_arr_result.findAll {
                        JSON json = it.value
                        if (json instanceof JSONArray) {
                            if (((JSONArray) json).isEmpty()) {
                                return false;
                            }
                            def re = ((JSONArray) json);
                            if ((
                                    re.size() == 1 && (
                                            (re[0] == null) ||
                                                    (
                                                            !(re[0] instanceof JSONArray) &&
                                                                    !(re[0] instanceof JSONObject)
                                                    )
                                    )
                            )
                                    ||
                                    (re.findAll(
                                            {
                                                return it instanceof JSONObject || it instanceof JSONArray
                                            }
                                    ).size() == 0)
                            ) {
                                return false;
                            } else {
                                return true;
                            }
                        } else if (json instanceof JSONObject) {
                            return !((JSONObject) json).isEmpty()
                        }
                        return true;
                    }
                }
                return ResFunc.ok([value: checking_arr_result.sort {
                    return it.start_pos
                }.collect {
                    def m_value = JSON.toJSONString(it.value, is_format_when_find)
                    return "// Range: [${it.start_pos} - ${it.end_pos}]\nlet result_${++idx} = ${m_value.replaceAll("^\"", "").replaceAll("\$\"", "")}"
                }.join("\n\n")])
            }
        }])
    }

    static List finding_json_inner_text(String text, List arr_pair) {
        def find_result_arr = [];
        def remain_str = text;
        def previous_remain_str_length = 0
        def reach_pos = 0;
        while (!(remain_str == null || remain_str.length() == 0)) {
            def is_any_find = false;
            for (def eachPair : arr_pair) {
                def bracket_start = remain_str.indexOf(eachPair[0])
                if (bracket_start != -1) {
                    is_any_find = true;
                    def sub_str_after_start = StringUtils.substring(remain_str, bracket_start)
                    if (sub_str_after_start != null) {
                        def result_json = null;
                        def result_start_index = -1;
                        def result_end_index = -1;
                        INNER_LOOP:
                        def previous_str = ""
                        while (true) {
                            def next_idx = sub_str_after_start.indexOf(eachPair[1])
                            if (next_idx == -1) {
                                break INNER_LOOP;
                            } else {
                                def find_short_str = sub_str_after_start.substring(0, next_idx + 1)
                                def json_str = previous_str + find_short_str
                                println("checking: " + json_str.replaceAll("\n", ' '))
//                                println("checking json str: ${json_str}")
                                try {
                                    result_json = JSON.parse(json_str)
                                    result_start_index = previous_remain_str_length + bracket_start
                                    result_end_index = result_start_index + json_str.length()
                                    println("Found available JSON")
                                    break INNER_LOOP;
                                } catch (Throwable throwable) {
//                                throwable.printStackTrace()
//                                    println("skipped invalid json")
                                    previous_str += find_short_str
                                    sub_str_after_start = StringUtils.substring(sub_str_after_start, next_idx + 1)
                                }
                            }
                        }
                        if (result_json != null) {
                            println("found json")
                            find_result_arr.add([reach_pos: reach_pos,
                                                 pair     : eachPair[0],
                                                 start_pos: reach_pos + result_start_index,
                                                 end_pos  : reach_pos + result_end_index - 1,
                                                 value    : result_json])
//                            previous_remain_str_length = result_end_index
                            remain_str = StringUtils.substring(remain_str, result_end_index)
                            reach_pos += result_end_index
                            println("")
                        } else {
                            def mmm_1 = bracket_start + 1
//                            previous_remain_str_length += mmm_1
                            reach_pos += mmm_1
                            remain_str = StringUtils.substring(remain_str, mmm_1)
                            println("next searching str: ${StrUtil.removeAllLineBreaks(remain_str)}")
                        }
                    }
                }
            }
            if (!is_any_find) {
                break;
            }
//            if (!is_any_find) {
//                break;
//            } else {
//                       }
//            remain_str = StringUtils.substring(remain_str,
//                    arr_pair.collect({
//                        return remain_str.indexOf(it[0])
//                    }).min() + 1)
//            println("next searching str: ${StrUtil.removeAllLineBreaks(remain_str)}")

        }
        return find_result_arr;
    }

    static List finding_json_in_text(String text) {
        def arr_pair = [["[", "]"], ["{", "}"]]
        def all = []
        arr_pair.each {
            all.addAll(finding_json_inner_text(text, [it]))
        }
        def filter_all = []
        all.each { def checkItem ->
            def start_pos = checkItem.start_pos
            def end_pos = checkItem.end_pos
            def json_value = checkItem.value
            def is_find_thatitem_should_no_use = false;
            all.each { def loopItem ->
                def loop_start_pos = loopItem.start_pos
                def loop_end_pos = loopItem.end_pos
                // it's wrapped by another items
                if (loop_start_pos < start_pos && end_pos < loop_end_pos) {
                    is_find_thatitem_should_no_use = true;
                }
            }
//            if (mstr == '[]' || mstr == '{}') {
//                is_find_thatitem_should_no_use = true;
//            }
            if (!is_find_thatitem_should_no_use) {
                filter_all.add(checkItem)
            }
        }
//        return all;
        return filter_all;
    }

    static void main(String[] args) {
        def str = """
12-Jul-2016 14:59:18.506 INFO [main[10000000,2,3][100][] ] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/manager] has finished in [38] ms
12-Jul-2016 14:59:18.506 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/examples] {
    "foo": "Hello",
    "nested": {
        "a": {
            "b": {
                "c": "Testing, 100"
            }
        }
    },
    "relativePath": {
        "a": {
            "b": {
                "c": "Testing"
            }
        }
    }
}
12-Jul-2016 14:59:18.506 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/examples] Response: {"boolean": false}
12-Jul-2016 14:59:18.506 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/examples]
12-Jul-2016 14:59:18.760 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/examples] [{"a": 12345}][1,2,3] has finished in [254] ms
12-Jul-2016 14:59:18.761 INFO [main[10000000,2,3] ] org.apache.catal[1,2,3] ina.startup.HostConfig.deployDirectory Deploying web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/ROOT] { a: 100,b: 400,c: 500} { cbb:4,abb: 100,bbb: 400,cbb: 500}{}[[]]{{qkek[]{}
"""
        println("-----------")
        println(JSON.toJSONString(finding_json_in_text(str).collect { it -> it.value = JSON.toJSONString(it.value); return it }.sort {
            return it.start_pos
        }, true))
    }
}
