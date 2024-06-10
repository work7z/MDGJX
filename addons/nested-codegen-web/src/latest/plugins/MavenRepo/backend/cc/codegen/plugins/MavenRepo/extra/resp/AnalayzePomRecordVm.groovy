package cc.codegen.plugins.MavenRepo.extra.resp

class AnalayzePomRecordVm extends TMavenSysListdetailPi {
    Integer syslistid;
    String contentStr;
    boolean is200SuccessData = true;
    ArrayList<MvnDeveloperVM> developerList = new ArrayList<>();
    ArrayList<MvnCalcDependenceVM> dependList = new ArrayList<>();
    ArrayList<TMavenOrganizationPi> orgList = new ArrayList<>();
    ArrayList<TMavenSysLicensePi> licenseList = new ArrayList<>();
    List<TMavenMailingPi> mailList = new ArrayList<>();
}
