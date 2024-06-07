package cc.codegen.plugins.FileSync.sync

class I_sync_tasks {
    String id;
    String record_type;
    String name;
    String delayAfterCopyingAFile;
    List<cc.codegen.plugins.FileSync.sync.I_FileName_Row> ignore_files;
    List<cc.codegen.plugins.FileSync.sync.I_FilePath_Row> from_path;
    List<cc.codegen.plugins.FileSync.sync.I_FilePath_Row> to_path;
    String cron_expr;
    String copy_mode;
}
