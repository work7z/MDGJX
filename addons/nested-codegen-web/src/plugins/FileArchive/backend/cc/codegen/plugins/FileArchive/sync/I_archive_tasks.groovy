package cc.codegen.plugins.FileArchive.sync

class I_archive_tasks {
    String id;
    String meta_file_name;
    String record_type;
    String name;
    String file_name_formatting;
    String clash_resolution;
    String archive_compression_type;
    String maximum_archive_files;
    String delayAfterCopyingAFile;
    String charset = "UTF-8";
    Boolean withSrcDir;
    String long_time_archives_strategy;
    List<I_FileName_Row> ignore_files;
    List<I_FilePath_Row> from_path;
    List<I_FilePath_Row> to_path;
    String cron_expr;
    String copy_mode;
}
