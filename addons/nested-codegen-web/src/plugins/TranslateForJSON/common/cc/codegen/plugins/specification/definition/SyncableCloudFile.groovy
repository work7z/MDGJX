package cc.codegen.plugins.specification.definition

import cc.codegen.plugins.specification.utils.PFile
import cc.codegen.plugins.specification.utils.PUtils
import cn.hutool.cache.impl.TimedCache
import cn.hutool.core.util.StrUtil
import cn.hutool.core.util.ZipUtil
import cn.hutool.http.HttpUtil

class SyncableCloudFile {
    ExtHandleItem ext;
    String cloudDownloadURL;
    String cloudPreCheckUpdatesURL;
    String localFilePath;
    String cloudFilePath;
    String cloudTsZonePath;
    Integer refreshSeconds;
    TimedCache refreshCacheRef;
    boolean isCloudFileReady = false;
    public static final String CHECK_FOR_SYNC_FROM_CLOUD = "chk_from_cloud"
    def validateCloudFilePath;

    SyncableCloudFile(ExtHandleItem ext, String baseCloudURL, String localFileCompletePath, Integer refreshSeconds, def validateCloudFilePath) {
        this.ext = ext
        this.cloudDownloadURL = baseCloudURL + "_gzip_cloud"
        this.cloudPreCheckUpdatesURL = baseCloudURL + "_tszone.txt"
        this.localFilePath = localFileCompletePath
        this.cloudTsZonePath = localFileCompletePath.replaceAll("_local\$", "_tszone.txt")
        this.cloudFilePath = localFileCompletePath.replaceAll("_local\$", "_cloud")
        this.isCloudFileReady = !ext.sf.empty(new PFile(this.cloudFilePath)) && validateCloudFilePath(new PFile(this.cloudFilePath))
        this.refreshSeconds = refreshSeconds
        this.refreshCacheRef = new TimedCache<>(refreshSeconds * 1000)
        this.validateCloudFilePath = validateCloudFilePath
    }

    void applyByFile(def callFn) {

        // do something for local file
        def actualLocalFile = new PFile(localFilePath)
        def actualCloudFile = new PFile(cloudFilePath)
        def actualCloudTsZonePath = new PFile(cloudTsZonePath)
        if (!isCloudFileReady && !ext.sf.empty(actualLocalFile)) {
            callFn(actualLocalFile)
        }
        if (isCloudFileReady && !ext.sf.empty(actualCloudFile) && validateCloudFilePath(actualCloudFile)) {
            callFn(actualCloudFile)
        }
        // checking cloud file
        def val_CHECK_FOR_SYNC_FROM_CLOUD = refreshCacheRef.get(CHECK_FOR_SYNC_FROM_CLOUD)
        if (val_CHECK_FOR_SYNC_FROM_CLOUD == null) {
            def currentLatestTsZoneValue = HttpUtil.downloadString(formatHTTPURL(cloudPreCheckUpdatesURL), "UTF-8")
            if (currentLatestTsZoneValue != null) {
                if (ext.sf.readAsStringWithSafe(actualCloudTsZonePath) != currentLatestTsZoneValue) {
                    try {
                        def res = HttpUtil.createGet(formatHTTPURL(cloudDownloadURL))
                        def mb = res.execute().bodyStream().getBytes()
                        def bytes = ZipUtil.unGzip(mb)
                        def update_value_NOW = StrUtil.utf8Str(bytes)
                        if (update_value_NOW != null) {
                            if (ext.twa.validateJSONStr(update_value_NOW)) {
                                actualCloudTsZonePath.write(currentLatestTsZoneValue)
                                actualCloudFile.write(update_value_NOW)
                                callFn(actualCloudFile)
                                isCloudFileReady = true;
                                refreshCacheRef.put(CHECK_FOR_SYNC_FROM_CLOUD, 1)
                            }
                        }
                    } catch (Throwable e) {
                        e.printStackTrace()
                    } finally {
                        // do nothing
                    }
                }
            }
        }
    }

    static String formatHTTPURL(String subFilePath) {
        return "https://codegen-prod-release.work7z.com" + "${subFilePath}"
    }

}
