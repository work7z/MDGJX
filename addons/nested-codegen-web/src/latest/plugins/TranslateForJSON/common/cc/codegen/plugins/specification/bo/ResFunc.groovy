package cc.codegen.plugins.specification.bo

class ResFunc {
    /**
     * if occurred any kind of warning, please push items into this errors field
     */
    List<WarningFunc> warnings = new ArrayList();
    List<WarningFunc> errors = new ArrayList();
    /**
     * after handling the request from F/E side, please assign this field
     * so as to allow F/E side using this field to accomplish relevant actions then.
     */
    Object data;
    /**
     * Protected field, no need to modify its value.
     * It will be written by system automatically
     */
    long elapsedTime = -1;

    public static ResFunc noEmpty() {
        return ResFunc.ok([
                value: "Error: Value cannot be empty."
        ])
    }

    public static ResFunc err(List<WarningFunc> errors) {
        return new ResFunc(errors);
    }


    public static ResFunc ok(Object params) {
        def inst = new ResFunc();
        inst.data = params
        return inst;
    }

    private ResFunc() {
    }

    private ResFunc(List<WarningFunc> errors) {
        this.warnings = errors
        this.errors = errors
    }

}
