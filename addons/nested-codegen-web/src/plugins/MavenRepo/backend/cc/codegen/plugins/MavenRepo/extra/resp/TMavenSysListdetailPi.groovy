package cc.codegen.plugins.MavenRepo.extra.resp

class TMavenSysListdetailPi implements Serializable {
    String description;
    String name;
    String packaging;

    Integer id;

    Integer sysListID;

    String url;

    String inceptionYear;

    String scmConnection;

    String scmURL;

    String scmDeveloperConnection;

    String issueManagementSystem;

    String issueManagementURL;

    Integer parentArtifactID;

    Integer parentListID;

    String parentGroupIDStr;

    String parentArtifactIDStr;

    Object licenseJSON;

    Object orgJSON;

    Object dependenceJSON;

    Object developerJSON;

    Object mailingJSON;

    String parentVersionStr;

}
