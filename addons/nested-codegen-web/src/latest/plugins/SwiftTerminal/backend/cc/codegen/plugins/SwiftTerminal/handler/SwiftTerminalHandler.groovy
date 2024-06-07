package cc.codegen.plugins.SwiftTerminal.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.definition.CpSystemRunningTask
import cc.codegen.plugins.specification.keys.CpGCCKeys
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import cn.hutool.core.io.FileUtil
import cn.hutool.core.util.RuntimeUtil
import cn.hutool.core.util.ZipUtil
import cn.hutool.http.HttpUtil
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

import java.nio.charset.Charset

class SwiftTerminalHandler extends CodeGenPluginHandler {

    @Override
    ResFunc init(String action, Map<String, Object> params) {
        def ext = new ExtHandleItem(params)
//        def nodeRunEnv = getNodeJSRunEnv(params)
//        def nodeLogicDir = getNodeLogicDir(params)
        def cmdPath = null;
        if (false && ext.twa.isDevMode()) {
            cmdPath = "/Users/jerrylai/mincontent/PersonalProjects/denote-fe/amorphous/pty-unix/dist/codegen-sap-darwin.bin"
        } else {
            def twa = ext.twa;
            def sf = ext.sf;
            def directPlatform = ext.twa.getDirectPlatform()
            def dir_amelioration = twa.getClzFile("amelioration")
            sf.mkdirs(dir_amelioration)
            if (sf.empty(dir_amelioration)) {
                // TODO: download the file
                def VERSION = twa.getFactualFrontEndVersionWithV();
                if (ext.twa.isDevMode()) {
                    VERSION = "v1.8.22"
                }
                def exactDir = ext.downloadAndExact("/prod/${VERSION}/amelioration-${VERSION}-${directPlatform}.zip")
                if (!sf.empty(exactDir)) {
                    exactDir.eachFileRecurse {
                        if (it.isFile()) {
                            sf.copyFile(it, sf.getFileWithNoCheck(dir_amelioration, it.getName()))
                        }
                    }
                }
            }
            def appAffixName = ext.twa.getAppAffixName();
            def finalAppName = "codegen-sap-${directPlatform}.${appAffixName}"
            cmdPath = sf.getFileWithNoCheck(
                    dir_amelioration,
                    finalAppName
            ).getAbsolutePath()
            if(!FileUtil.isWindows()){
                try {
                    RuntimeUtil.exec("chmod", "755", cmdPath)
                } catch (Throwable throwable) {
                    throwable.printStackTrace()
                }
            }
        }
        def task = new CpSystemRunningTask(
                port: 55678,
                prop: "SwiftTerminal",
                description: "Usages: It's serving for the local integrated terminal.",
                name: "Terminal Core Service",
                workDir: ext.twa.get_USER_HOME_DIR(),//ext.sf.getFileWithNoCheck(cmdPath).getParentFile(),
                env: [],
                cmd: [
                        cmdPath
                ],
                //
        )
        def fn_gcc_ranTask = ext.params.fn_gcc_ranTask
        fn_gcc_ranTask(CpGCCKeys.KEY_ADD, [item: task])
        return ResFunc.ok([:])
    }

    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "transform"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                def res = (bytes_text)
                return ResFunc.ok([value: res])
            }
        }])
    }

}
