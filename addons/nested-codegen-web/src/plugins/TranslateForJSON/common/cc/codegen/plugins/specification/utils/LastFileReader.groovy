package cc.codegen.plugins.specification.utils

import org.apache.commons.io.input.ReversedLinesFileReader

class LastFileReader {
    File file;

    LastFileReader(File file) {
        this.file = file
    }

    public ReadBody lastNLines(int maxReadSize) {
        def output_str = ''
        def output_len = 0;
        def logFile = file;
        if (logFile.exists()) {
            output_len = logFile.length()
            def maxRead = maxReadSize
            output_str = logFile.readLines().takeRight(maxRead)
            ReversedLinesFileReader reader = new ReversedLinesFileReader(logFile, 1024, "UTF-8");
            def arr = []
            while (true) {
                if (arr.size() >= maxRead) {
                    break;
                }
                def m = reader.readLine()
                if (m == null) {
                    break;
                } else {
                    arr.push(m)
                }
            }
            output_str = arr.join("\n")
        }
        return new ReadBody(
                length: output_len,
                content: output_str
        )
    }

    static class ReadBody {
        long length;
        String content
    }
}
