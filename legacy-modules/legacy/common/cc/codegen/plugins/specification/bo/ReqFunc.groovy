package cc.codegen.plugins.specification.bo

class ReqFunc {
    /**
     * this field will be assigned by F/E side
     * e.g. action="print-json-value"
     */
    String action;
    /**
     * this field will be assigned by F/E side
     * e.g. params={"key": 12345}*/
    Map<String, Object> params;
}
