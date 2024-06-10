package cc.codegen.plugins.specification.utils

class FileSizeFormatter {
    public static String format(Long value) {
        if (value == null) {
            return "0B"
        } else if (value <= 1024) {
            return "1KB"
        } else if (value <= 1024 * 1024) {
            return ((value / 1024)).toBigInteger() + "KB"
        } else if (value <= 1024 * 1024 * 1024) {
            return (value / 1024 / 1024).toBigInteger() + "MB"
        } else {
            return (value / 1024 / 1024 / 1024).toBigInteger() + "GB"
        }
    }

    static void main(String[] args) {
        println format(1023L)
        println format(10233912L)
        println format(102339119932L)
        println format(102339119932L)
    }
}
