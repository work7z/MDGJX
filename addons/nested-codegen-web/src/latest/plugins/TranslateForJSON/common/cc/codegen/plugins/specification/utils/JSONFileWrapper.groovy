package cc.codegen.plugins.specification.utils

import cn.hutool.core.io.FileUtil
import com.alibaba.fastjson.JSON

class JSONFileWrapper {
    File jsonFile;
    Map initialValue;

    JSONFileWrapper(File jsonFile, Map initialValue) {
        this.jsonFile = jsonFile
        this.initialValue = initialValue;
        this.checkValue();
        modifyJSON({ Map map ->
            initialValue.eachWithIndex { Map.Entry<Object, Object> entry, int i ->
                if (map[entry.getKey()] == null) {
                    map[entry.getKey()] = entry.getValue()
                }
            }
        })
    }

    public void modifyJSON(Closure closure) {
        checkValue()
        def map = JSON.parseObject(jsonFile.getText("UTF-8"), Map.class)
        closure(map)
        def beautify = PUtils.toJSONWithBeautify(map)
        jsonFile.write(beautify)
    }

    public void readJSON(Closure closure) {
        checkValue()
        def map = JSON.parseObject(jsonFile.getText("UTF-8"), Map.class)
        closure(map)
    }

    private boolean checkValue() {
        if (!jsonFile.getParentFile().exists()) {
            jsonFile.getParentFile().mkdirs()
        }
        def n = PUtils.validJSONFile(jsonFile)
        if (!jsonFile.exists() || jsonFile.length() == 0 || !n) {
            def beautify = PUtils.toJSONWithBeautify(initialValue)
            jsonFile.write(beautify)
        }
    }
}
