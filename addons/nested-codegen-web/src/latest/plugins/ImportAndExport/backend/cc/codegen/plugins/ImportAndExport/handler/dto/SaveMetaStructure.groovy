package cc.codegen.plugins.ImportAndExport.handler.dto

class SaveMetaStructure {
    String version = "v1.0.0"
    Long createTime = System.currentTimeMillis();
    List<SaveFileEntity> files = [];
    List<String> optionValues = []
    String actionId;
    String actionType;
}
