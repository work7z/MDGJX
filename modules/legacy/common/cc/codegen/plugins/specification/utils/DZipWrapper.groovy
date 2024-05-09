package cc.codegen.plugins.specification.utils

import cn.hutool.core.io.FileUtil
import cn.hutool.core.io.IoUtil
import cn.hutool.core.util.ZipUtil
import org.apache.commons.io.IOUtils

import java.lang.reflect.Field
import java.nio.charset.Charset
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

class DZipWrapper implements Closeable {
    boolean withSrcDir = true;
    File zipFile
    File lckFile;
    Charset charset;
    ZipOutputStream out;

    private DZipWrapper() {

    }

    public static DZipWrapper create(boolean withSrcDir, PFile zipFile, String charsetStr) {
        Charset charset = Charset.forName(charsetStr);
        def r = new DZipWrapper()
        r.zipFile = zipFile
        r.lckFile = zipFile.getLckFile()
        r.withSrcDir = withSrcDir
        r.charset = charset
        FileUtil.del(zipFile)
        FileUtil.mkdir(zipFile.getParentFile())
        r.out = ZipUtil.getZipOutputStream(zipFile, charset)
        return r;
    }

    public void lock() {
        FileUtil.mkdir(this.lckFile.getParentFile())
        this.lckFile.write("" + System.currentTimeMillis())
    }


    public void addFile(File srcFile, String baseDir) {
        if (srcFile.isDirectory()) {
            srcFile.eachFileRecurse {
                if (it.isFile()) {
                    println("Put File: " + it)
                    addFile(it, baseDir)
                }
            }
            return;
        }
        // 如果只是压缩一个文件，则需要截取该文件的父目录
        String srcRootDir = srcFile.getCanonicalPath();
        if (!withSrcDir && baseDir != null) {
            srcRootDir = srcFile.getCanonicalPath().replace(baseDir, '')
        }
        println "Next Zip: " + srcRootDir
        out.putNextEntry(new ZipEntry(srcRootDir));
        IoUtil.copy(new FileInputStream(srcFile), out);
        out.closeEntry()
        Field namesField = ZipOutputStream.getDeclaredField("names");
        namesField.setAccessible(true);
        HashSet<String> names = (HashSet<String>) namesField.get(out);
        names.remove(srcRootDir)
        out.flush()
    }

    public void close() {
        out.flush();
        IOUtils.closeQuietly(this.out)
        FileUtil.del(this.lckFile)
    }


}
