package cc.codegen.plugins.mathbcd.handler

import cn.hutool.core.util.StrUtil
import org.apache.commons.lang3.StringUtils

class BCDUtils {

    public static Map<String, String> map_bcd_listings = ["0": "0000",
                                                          "1": "0001",
                                                          "2": "0010",
                                                          "3": "0011",
                                                          "4": "0100",
                                                          "5": "0101",
                                                          "6": "0110",
                                                          "7": "0111",
                                                          "8": "1000",
                                                          "9": "1001"]

    public static String str2bcd(String str) {
        if (str == null || str.trim().length() == 0) {
            return str;
        }
        def mystr = ""
        str.split("").each {
            println(it + " " + it.isNumber())
            if (it.isNumber()) {
                mystr += map_bcd_listings[it]
            } else {
                mystr += it;
            }
        }.join("")
        return mystr;
    }

    public static String bcd2str(String bstr, boolean padFromLeft = true) {
        if (bstr == null || bstr.trim().length() == 0) {
            return bstr;
        }
        def result = "";
        bstr = bstr.trim()
        if (bstr.contains(".")) {
            def arr = bstr.split("\\.")
            return bcd2str(arr[0], true) + "." + bcd2str(arr[1], false)
        } else {
            def completeSize = (int) (Math.ceil(bstr.length() / 4) * 4)
            if (padFromLeft) {
                bstr = StringUtils.leftPad(bstr, completeSize, "0")
            } else {
                bstr = StringUtils.rightPad(bstr, completeSize, "0")
            }
            def splitValue = StrUtil.split(bstr, 4)
            return splitValue.collect { String a ->
                def findObj = map_bcd_listings.find({ it.getValue() == a })
                if (findObj == null) {
                    return a;
                }
                return findObj.getKey()
            }.join("")
        }
    }

    static void main(String[] args) {
        println str2bcd("10331.1233")
        def a = "100110111";
        println Math.ceil(a.length() / 4) * 4
        def mstr = "010000001100110001.0001001000110011";
        println bcd2str(mstr)
    }
}
