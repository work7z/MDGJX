package cc.codegen.plugins.MavenRepo.extra

import cn.hutool.core.util.StrUtil

class MavenVM {
//    "https://mirrors.cloud.tencent.com/maven/yom/yom/maven-metadata.xml"
    String crt_mirror_id = 'tencent';

    MavenVM(Integer luckNum, String crt_mirror_id, String groupId, String artifactId) {
        this.crt_mirror_id = crt_mirror_id;
        this.groupId = groupId
        this.artifactId = artifactId
    }

    MavenVM(String groupId, String artifactId) {
        this.groupId = groupId
        this.artifactId = artifactId
    }

    MavenVM(String groupId, String artifactId, String aversion) {
        this.aversion = aversion
        this.groupId = groupId
        this.artifactId = artifactId
    }

    MavenVM(Integer luckNum, String crt_mirror_id, String groupId, String artifactId, String aversion) {
        this.crt_mirror_id = crt_mirror_id;
        this.aversion = aversion
        this.groupId = groupId
        this.artifactId = artifactId
    }

    public String getPomURL() {
        return getFullURL(".pom", true);
    }

    public String getJarURL() {
        return getFullURL(".jar", true);
    }

    public String getWarURL() {
        return getFullURL(".war", true);
    }

    public String getDocURL() {
        return getFullURL("-javadoc.jar", true);
    }

    public String getSourcesURL() {
        return getFullURL("-sources.jar", true);
    }

    public String getMavenMetaXMLLink() {
        String mybaseurl = getBaseURL();
        String str_groupidval = this.getGroupId();
        String str_artifactidval = this.getArtifactId();
        String url_groupidval = str_groupidval.replaceAll("\\.", "/");
        String syslistdescstr = url_groupidval + "/" + str_artifactidval + "/maven-metadata.xml";
        String fullpath = mybaseurl + syslistdescstr;
        return fullpath;
    }

    String aversion;
    String groupId;
    String artifactId;

    static String[] mirrors = [
            "https://mirrors.cloud.tencent.com/nexus/repository/maven-public/",
//            "https://mirrors.cloud.tencent.com/maven/"
    ]

    static def mirrors_mappings = [
            [
                    id   : 'apache_maven',
                    label: ['Official Source'],
                    link : 'https://repo1.maven.org/maven2/'
            ],
            [
                    id   : 'tencent',
                    label: ['Tencent Cloud Source'],
                    link : "https://mirrors.cloud.tencent.com/nexus/repository/maven-public/"
            ],
            [
                    id   : 'netease',
                    label: ['NetEase 163 Source', '163.com(NetEase)'],
                    link : 'https://mirrors.163.com/maven/repository/maven-public/'
            ],
            [
                    id   : 'aliyun',
                    label: ['Aliyun Source', 'Aliyun'],
                    link : 'https://maven.aliyun.com/nexus/content/groups/public/'
            ],
            [
                    id   : 'huawei',
                    label: ['Huawei Cloud Source', 'Huawei'],
                    link : 'https://mirrors.huaweicloud.com/repository/maven/'
            ]
    ]


    public String getBaseURL() {
        if (this.crt_mirror_id != null) {
            return mirrors_mappings.find({
                return it.id == crt_mirror_id
            }).link
        }
        return mirrors[0]
    }

    public String getFullURL(String aftfix, boolean isNeedFileName) {
        String mybaseurl = getBaseURL();
        String aversion = this.getAversion();
        String str_groupidval = this.getGroupId();
        String str_artifactidval = this.getArtifactId();
        if (StrUtil.isEmpty(aversion)) {
            aversion = "";
        }
        String url_groupidval = str_groupidval.replaceAll("\\.", "/");
        String syslistdescstr = url_groupidval + "/" + str_artifactidval + "/" + aversion + (aftfix == '' ? '' : "/");
        String fullpath = mybaseurl + syslistdescstr;
        String filename = str_artifactidval + "-" + aversion;
        if (!isNeedFileName) {
            filename = "";
        }
        String finallyURL = fullpath + filename + aftfix;
        return finallyURL;
    }

}
