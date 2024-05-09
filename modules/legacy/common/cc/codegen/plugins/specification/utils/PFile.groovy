package cc.codegen.plugins.specification.utils

class PFile extends File {

    PFile(String pathname) {
        super(pathname)
    }
    PFile(File pathname) {
        this(pathname.getAbsolutePath())
    }

    PFile(String var1, String var2) {
        super(var1, var2)
    }

    PFile(File var1, String var2) {
        super(var1, var2)
    }

    PFile(URI var1) {
        super(var1)
    }

    PFile subFile(String fileName) {
        File pre = null;
        if(this.exists()){
            this.eachFileRecurse {
                if (pre != null) {
                    return;
                }
                if (it.getName() == fileName) {
                    pre = it;
                }
            }
        }
        if(pre == null){
            return null;
        }
        return new PFile(pre.toString());
    }


    File getLckFile() {
        return new PFile(this.getAbsolutePath() + ".lck")
    }

    boolean hasLock() {
        return getLckFile().exists()
    }
}
