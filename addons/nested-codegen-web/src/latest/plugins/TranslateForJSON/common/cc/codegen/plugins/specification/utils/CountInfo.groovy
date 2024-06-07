package cc.codegen.plugins.specification.utils


class CountInfo {
    private String zhdiff;


    public String getMilesdiff() {
        return (this.difftime) + "ms";
    }

    public void setMilesdiff(String milesdiff) {
        this.milesdiff = milesdiff;
    }

    private String milesdiff;

    private Long createtime;

    public Long getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Long createtime) {
        this.createtime = createtime;
    }

    public Long getEndtime() {
        return endtime;
    }

    public void setEndtime(Long endtime) {
        this.endtime = endtime;
    }

    private Long endtime;

    public CountInfo(Long difftime, Long endtime, Long createtime) {
        this.difftime = difftime;
        this.endtime = endtime;
        this.createtime = createtime;
    }

    public Long getDifftime() {
        return difftime;
    }

    public void setDifftime(Long difftime) {
        this.difftime = difftime;
    }

    private Long difftime;
}
