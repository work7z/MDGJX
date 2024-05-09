package cc.codegen.plugins.specification.utils

class Countable {
    private Long createtime;

    public Long getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Long createtime) {
        this.createtime = createtime;
    }

    public Countable() {
        setCreatetime(System.currentTimeMillis());
    }

    public CountInfo countObject() {
        Long createtime = getCreatetime();
        long crtTime = System.currentTimeMillis();
        return new CountInfo(crtTime - createtime, crtTime, createtime);
    }

    public String countMiles() {
        return (System.currentTimeMillis() - getCreatetime()) + "ms";
    }

    public long countMilesRawValue() {
        return (System.currentTimeMillis() - getCreatetime());
    }

    public String count() {
        return CalcDateUtils.getDateCalcStr(new Date(getCreatetime()), "zh_CN")
//        return GUtils.getDateStrForNow(System.currentTimeMillis() - getCreatetime());
    }

}
