package cc.codegen.plugins.mathbcd.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil

class BCDMathHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        //        println "received ${action} ${params}"
        def g = DBWrapper.init(params);
        def twa = ToolWrapper.init(params)
        def sf = SFWrapper.init(params)
        def SFUtils = sf;
        def SF = sf;
        def userDir = twa.getCommonUserDir()
        def backupRootDir = twa.getBackupDir()
        def duplicateJsonFile = sf.getFile(params['val_DSLFolder'] as String, "dto/duplicate.json")
        if (isNeedInit()) {
            markInited()
        }
        def fn_gcc_callDSL = params['fn_gcc_callDSL']
        def fn_getFromRedis = params['fn_getFromRedis']
        def fn_setFromRedis = params['fn_setFromRedis']
        def fn_delFromRedis = params['fn_delFromRedis']
        def val_logDir = sf.getFile(params['val_logDir'] as String)
        def DSL_subFile = sf.getFile(userDir, "DSL")
        def DSLFolder = twa.getDSLFolder();

        def result = super.callCommonProcedures(action, params)
        if (result != null) {
            return result;
        }

        if (params['type'].toString() == 'strToBcd') {
            try {
                def text = params['text'] as String;
                def r = BCDUtils.str2bcd(text)
                return ResFunc.ok([
                        value: r
                ])
            } catch (Throwable throwable) {
                throwable.printStackTrace()
                return ResFunc.ok([
                        value: throwable.getMessage()
                ])
            }
        }
        if (params['type'].toString() == 'bcdToStr') {
            try {
                def text = params['text'] as String;
                def r = BCDUtils.bcd2str(text)
                return ResFunc.ok([
                        value: r
                ])
            } catch (Throwable throwable) {
                throwable.printStackTrace()
                return ResFunc.ok([
                        value: throwable.getMessage()
                ])
            }
        }


        return ResFunc.ok([
                novalue: 1,
                type: params['type'],
                text: params['text'],
        ]);
    }

    static void main(String[] args) {
//        String strForTest = "123456ABCDEF";
        String strForTest = "12345618492.13212";
//        byte[] bcd = BCD.strToBcd(strForTest);
//        String str = BCD.bcdToStr(bcd);
//        println bcd.collect {
//            return Integer.toBinaryString(it)
//            return StringUtils.leftPad(Integer.toBinaryString(it), strForTest.length() * 4, '0')
//        }.join("")
//        println str
        def myval = DecimaltoBcd(strForTest)
        println myval
        def totalArr = []
        def tmpval = myval;
        while (true) {
            if (tmpval.length() == 0) {
                break;
            } else {
                def substr = tmpval.substring(0, 4)
                tmpval = tmpval.substring(4);
                totalArr.push(substr)
            }
        }
        println(totalArr);
        byte[] arr_2 = new byte[totalArr.size()]
        def idx = 0
        println(totalArr.each {
            it = it.toString().replaceAll("^0+", "")
            int val = Integer.parseInt(it, 2);
            byte b = (byte) val;
            arr_2[idx] = b;
            idx++
        })
        println(arr_2.join(""))
    }

    public static String DecimaltoBcd(String str) {
        String b_num = "";
        for (int i = 0; i < str.length(); i++) {

            String b = Integer.toBinaryString(Integer.parseInt(str.valueOf(str.charAt(i))));

            int b_len = 4 - b.length();

            for (int j = 0; j < b_len; j++) {
                b = "0" + b;
            }
            b_num += b;
        }
        return b_num;
    }


}
