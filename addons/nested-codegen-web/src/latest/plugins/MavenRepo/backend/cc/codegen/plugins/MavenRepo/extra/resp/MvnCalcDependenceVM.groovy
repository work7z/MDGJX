package cc.codegen.plugins.MavenRepo.extra.resp

class MvnCalcDependenceVM {
    Integer id;

    Integer dependencyType;

    String parentGroupId;

    String artifactId;

    String groupId;
    String version;

    String setScope;

    String maxVersion;

    List<TMavenSysLicensePi> licenses;

    List<MvnCalcCategoryVM> categories;

}
