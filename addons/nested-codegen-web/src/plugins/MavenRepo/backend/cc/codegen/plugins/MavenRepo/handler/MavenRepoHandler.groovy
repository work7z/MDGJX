package cc.codegen.plugins.MavenRepo.handler

import cc.codegen.plugins.MavenRepo.extra.MavenVM
import cc.codegen.plugins.MavenRepo.extra.resp.AnalayzePomRecordVm
import cc.codegen.plugins.MavenRepo.extra.resp.MvnCalcDependenceVM
import cc.codegen.plugins.MavenRepo.extra.resp.MvnDeveloperVM
import cc.codegen.plugins.MavenRepo.extra.resp.TMavenMailingPi
import cc.codegen.plugins.MavenRepo.extra.resp.TMavenOrganizationPi
import cc.codegen.plugins.MavenRepo.extra.resp.TMavenRolePi
import cc.codegen.plugins.MavenRepo.extra.resp.TMavenSysLicensePi
import cc.codegen.plugins.MavenRepo.extra.resp.TMavenSysListdetailPi
import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.utils.PCacheDir
import cc.codegen.plugins.specification.utils.PFile
import cc.codegen.plugins.specification.utils.PUtils
import cn.hutool.cache.impl.TimedCache
import cn.hutool.core.util.StrUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import org.apache.commons.lang3.StringUtils
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import org.jsoup.parser.Parser
import org.jsoup.select.Elements

class MavenRepoHandler extends CodeGenPluginHandler {
    final static int VAL_MAVEN_TIMEOUT = 11000;

    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        String crt_mirror_id = params['crt_mirror_id']
        def mvnLib = getLibDirByName("mvn_lib_1.0.0", params)
        def groupTxtFile = getFileByRecursive(mvnLib, "group.txt")
        def lower_groupTxtFile = new PFile((groupTxtFile.toString() + "-small.txt").toString())
        def lower_groupTxtFileFlag = new PFile((groupTxtFile.toString() + "-small-flag.txt").toString())
        PCacheDir pCacheDir = getCacheDirByLimits(params, 'maven_repo', 200);
        TimedCache timedCache = getTimeCachedFromParams(params, "mvn_lib_cached_lib", 60000)
        TimedCache searchIdCache = getTimeCachedFromParams(params, "mvn_lib_cached_id", 120000)
        String key_maven_repo_list = 'maven_repo_list'
        // https://mirrors.cloud.tencent.com/maven/yom/yom/maven-metadata.xml
        return handleValueFromTextOrFile(action, params, [

                new HandleTypeAndValue() {

                    @Override
                    String getType() {
                        return "mvn_ver_detail"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = [:]
                        String p_groupId = extHandleItem.params.groupId
                        String p_artifactId = extHandleItem.params.artifactId
                        String p_version = extHandleItem.params.version
                        MavenVM mavenVM = new MavenVM(100, crt_mirror_id, p_groupId, p_artifactId, p_version)
                        def mavenDetailPOMXMLLink = mavenVM.getPomURL()
                        def xmlContent = pCacheDir.getFromHTTPURL(mavenDetailPOMXMLLink, VAL_MAVEN_TIMEOUT)
                        def verDoc = Jsoup.parse(xmlContent, "", Parser.xmlParser())
                        def tag = verDoc.getElementsByTag("project")
                        def expCodes = []
                        def isExist = tag.size() != 0
                        AnalayzePomRecordVm analayzePomRecordVm = new AnalayzePomRecordVm();
                        TMavenSysListdetailPi tMavenSysListdetailPi = analayzePomRecordVm;
                        if (isExist) {
                            PUtils.newInstance().with {
                                def document = verDoc;
                                Elements projectList = document.getElementsByTag("project");
                                Element project = null;
                                if (projectList != null && projectList.size() != 0) {
                                    project = projectList.get(0);
                                } else {
                                    Elements model = document.getElementsByTag("model");
                                    if (model.size() == 0) {
                                        // 奇怪，不支持这是什么类型，标识为29
                                        expCodes.push('UNKNOWN_MODEL_TYPE')
                                    } else {
                                        project = model.get(0);
                                    }
                                }
                                document.outputSettings(new Document.OutputSettings().prettyPrint(false));
                                Elements inceptionYear = getChildElementByTagName(project, "inceptionYear");
                                if (inceptionYear.size() != 0) {
                                    tMavenSysListdetailPi.setInceptionYear(inceptionYear.text().trim());
                                }
                                def name1 = getChildElementByTagName(project, "url")
                                tMavenSysListdetailPi.setUrl(betext(name1))
                                tMavenSysListdetailPi.setName(betext(getChildElementByTagName(project, "name")))
                                tMavenSysListdetailPi.setPackaging(betext(getChildElementByTagName(project, "packaging")))
                                tMavenSysListdetailPi.setDescription(betext(getChildElementByTagName(project, "description")))
                                Elements url = getChildElementByTagName(project, "url");
                                if (url.size() != 0) {
                                    tMavenSysListdetailPi.setUrl(url.text().trim());
                                }
                                // 处理License列表
                                Elements tmpListLicensesWrapEle = getChildElementByTagName(project, "licenses");
                                if (tmpListLicensesWrapEle.size() != 0) {
                                    Elements forOneLicenseList = tmpListLicensesWrapEle.get(0).getElementsByTag("license");
                                    for (int i = 0; i < forOneLicenseList.size(); i++) {
                                        Element crtLicenseEle = forOneLicenseList.get(i);
                                        String crtLicense_name = StringUtils.trim(StringUtils.trim(crtLicenseEle.getElementsByTag("name").text()));
                                        String crtLicense_shortname = StringUtils.trim(StringUtils.trim(crtLicenseEle.getElementsByTag("shortname").text()));
                                        String crtLicense_url = StringUtils.trim(StringUtils.trim(crtLicenseEle.getElementsByTag("url").text()));
                                        // 开始插入sysLicense数据
                                        TMavenSysLicensePi tMavenSysLicensePi = new TMavenSysLicensePi();
                                        tMavenSysLicensePi.setName(crtLicense_name);
                                        if (!StringUtils.isEmpty(crtLicense_shortname)) {
                                            tMavenSysLicensePi.setShortname(crtLicense_shortname);
                                        }
                                        tMavenSysLicensePi.setUrl(crtLicense_url);
                                        analayzePomRecordVm.getLicenseList().add(tMavenSysLicensePi);
                                    }
                                }
                                // 处理邮件列表
                                Elements mailinglists = getChildElementByTagName(project, "mailinglists");
                                if (mailinglists.size() != 0) {
                                    Elements mailinglist = mailinglists.get(0).getElementsByTag("mailinglist");
                                    for (Element crtMailing : mailinglist) {
                                        String name = betext(crtMailing, "name");
                                        String subscribe = betext(crtMailing, "subscribe");
                                        String unsubscribe = betext(crtMailing, "unsubscribe");
                                        String archive = betext(crtMailing, "archive");
                                        // 插入mailing表
                                        TMavenMailingPi tMavenMailingPi = new TMavenMailingPi();
                                        tMavenMailingPi.setName(name);
                                        tMavenMailingPi.setSubscribe(subscribe);
                                        tMavenMailingPi.setUnsubscribe(unsubscribe);
                                        tMavenMailingPi.setArchive(archive);
                                        analayzePomRecordVm.getMailList().add(tMavenMailingPi);
                                    }
                                }
                                // 处理developer
                                Elements developers = getChildElementByTagName(project, "developers");
                                if (developers.size() != 0) {
                                    Elements developer = developers.get(0).getElementsByTag("developer");
                                    for (Element crtDev : developer) {
                                        MvnDeveloperVM mvnDeveloperVM = new MvnDeveloperVM();
                                        String organization = betext(crtDev, "organization");
                                        String organizationUrl = betext(crtDev, "organizationUrl");
                                        String email = betext(crtDev, "email");
                                        String name = betext(crtDev, "name");
                                        String id = betext(crtDev, "id");
                                        mvnDeveloperVM.setOrgName(organization);
                                        mvnDeveloperVM.setOrgURL(organizationUrl);
                                        if(email != null){
                                            email=email.replace('(at)','@')
                                        }
                                        mvnDeveloperVM.setEmail(email);
                                        mvnDeveloperVM.setName(name);
                                        mvnDeveloperVM.setDevID(id);
                                        analayzePomRecordVm.getDeveloperList().add(mvnDeveloperVM);

                                        Elements roles = getChildElementByTagName(crtDev, "roles");
                                        if (roles.size() != 0) {
                                            Elements role = roles.get(0).getElementsByTag("role");
                                            for (int i = 0; i < role.size(); i++) {
                                                Element element = role.get(i);
                                                // 插入role表
                                                TMavenRolePi tMavenRolePi = new TMavenRolePi();
                                                String trim = element.text().trim();
                                                tMavenRolePi.setName(trim);
                                                mvnDeveloperVM.getRoleList().add(tMavenRolePi);
                                            }
                                        }
                                    }
                                }

                                // 插入scm
                                Elements scm = getChildElementByTagName(project, "scm");
                                if (scm.size() != 0) {
                                    Element element = scm.get(0);
                                    String scmconnection = element.getElementsByTag("connection").text().trim();
                                    String scmurl = element.getElementsByTag("url").text().trim();
                                    tMavenSysListdetailPi.setScmConnection(scmconnection);
                                    tMavenSysListdetailPi.setScmURL(scmurl);
                                    tMavenSysListdetailPi.setScmDeveloperConnection(betext(element, "developerConnection"));
                                }
                                // 处理组织org
                                Elements organization = getChildElementByTagName(project, "organization");
                                if (organization.size() != 0) {
                                    Element element = organization.get(0);
                                    String myname = betext(element, "name");
                                    String myurl = betext(element, "url");
                                    TMavenOrganizationPi tMavenOrganizationPi = new TMavenOrganizationPi();
                                    tMavenOrganizationPi.setName(myname);
                                    tMavenOrganizationPi.setUrl(myurl);
                                    analayzePomRecordVm.getOrgList().add(tMavenOrganizationPi);
                                }
                                // 处理issue对象
                                Elements issueManagement = getChildElementByTagName(project, "issueManagement");
                                if (issueManagement.size() != 0) {
                                    Element element = issueManagement.get(0);
                                    String mysystem = betext(element, "system");
                                    String myurl = betext(element, "url");
                                    tMavenSysListdetailPi.setIssueManagementSystem(mysystem);
                                    tMavenSysListdetailPi.setIssueManagementURL(myurl);
                                }
                                // 处理依赖
                                Elements dependencies = getChildElementByTagName(project, "dependencies");
                                if (dependencies.size() != 0) {
                                    Elements dependency = dependencies.get(0).getElementsByTag("dependency");
                                    for (Element element : dependency) {
                                        MvnCalcDependenceVM tMavenDependencePi = new MvnCalcDependenceVM();
                                        String scope = betext(element, "scope");
                                        tMavenDependencePi.setSetScope(scope);
                                        String groupId = betext(element, "groupId");
                                        String artifactId = betext(element, "artifactId");
                                        String version = betext(element, "version");
                                        if (version == null) {
                                            version = ''
                                        }
                                        version = version.replace('${project.version}', p_version)
                                        tMavenDependencePi.setArtifactId(artifactId);
                                        tMavenDependencePi.setGroupId(groupId);
                                        tMavenDependencePi.setVersion(version);
                                        analayzePomRecordVm.getDependList().add(tMavenDependencePi);
                                    }
                                }
                                // 处理parent
                                Elements parent = getChildElementByTagName(project, "parent");
                                if (parent.size() != 0) {
                                    Element crtparent = parent.get(0);
                                    String groupId = betext(crtparent, "groupId");
                                    String artifactId = betext(crtparent, "artifactId");
                                    String version = betext(crtparent, "version");
                                    tMavenSysListdetailPi.setParentGroupIDStr(groupId);
                                    tMavenSysListdetailPi.setParentArtifactIDStr(artifactId);
                                    tMavenSysListdetailPi.setParentVersionStr(version);
                                }
                            }
                        }
                        if (expCodes.size() != 0) {
                            isExist = false;
                        }
                        res.ver = [expCodes             : expCodes,
                                   exist                : isExist,
                                   obj                  : isExist ? analayzePomRecordVm : null,
                                   mavenDetailPOMXMLLink: mavenDetailPOMXMLLink]
                        return ResFunc.ok(res)
                    }
                },
                new HandleTypeAndValue() {

                    @Override
                    String getType() {
                        return "mvn_metadata"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = [:]
                        String groupId = extHandleItem.params.groupId
                        String artifactId = extHandleItem.params.artifactId
                        MavenVM mavenVM = new MavenVM(100, crt_mirror_id, groupId, artifactId);
                        MavenVM mavenVM2 = new MavenVM(100, "tencent", groupId, artifactId);
                        def mavenMetaXMLLink = mavenVM.getMavenMetaXMLLink()
                        def fullURL = mavenVM2.getFullURL("", false)
                        def mavenMetaXMLContent = pCacheDir.getFromHTTPURL(mavenMetaXMLLink, VAL_MAVEN_TIMEOUT)
                        def metaDoc = Jsoup.parse(mavenMetaXMLContent, "", Parser.xmlParser())
                        def tag = metaDoc.getElementsByTag("versioning")
                        def isExist = tag.size() != 0
                        def obj = [lastUpdated   : "",
                                   versions      : [],
                                   latestVersion : "",
                                   releaseVersion: "",]
                        if (isExist) {
                            tag = tag.get(0)
                            obj.lastUpdated = StrUtil.trim(tag.getElementsByTag("lastUpdated").text())
                            obj.versions = tag.getElementsByTag("version").collect({
                                return StrUtil.trim(it.text())
                            }).findAll({ itx -> return !itx.endsWith("-SNAPSHOT") }).reverse()
                            obj.latestVersion = StrUtil.trim(tag.getElementsByTag("latest").text())
                            obj.releaseVersion = StrUtil.trim(tag.getElementsByTag("release").text())
                        }
                        res.meta = [fullURL         : fullURL,
                                    exist           : isExist,
                                    mirrors_mappings: MavenVM.mirrors_mappings,
                                    obj             : isExist ? obj : null]
                        return ResFunc.ok(res)
                    }
                },
                //
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "mvn_init"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        setAsExpiredTime(params, 60)
                        // TODO: no worries, lower case can be fine
//                        def lck = lower_groupTxtFile.toString().intern();
//                        synchronized (lck) {
//                            if (!lower_groupTxtFileFlag.exists()) {
//                                PUtils.highrun({
//                                    extHandleItem.sfWrapper.del(lower_groupTxtFile)
//                                    lower_groupTxtFile.createNewFile()
//                                    groupTxtFile.eachLine {
//                                        def newLine = "${it.toLowerCase()}*${it}"
//                                        println "handling: " + newLine
//                                        sleep(50)
//                                        lower_groupTxtFile.append(newLine + "\n")
//                                    }
//                                    lower_groupTxtFileFlag.write(System.currentTimeMillis() + "")
//                                })
//                            }
//                        }
                        return ResFunc.ok([:])
                    }
                },

                //
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "mvn_loadmem"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        setAsExpiredTime(params, 30)
                        def is_mem_loading = extHandleItem.params['is_mem_loading']
                        def isPortal = extHandleItem.isPortalMode()
                        if (isPortal) {
                            is_mem_loading = true;
                        }
                        if (is_mem_loading == true) {
                            synchronized ("lck_maven_updates") {
                                def tmpval = extHandleItem.fn_getFromRedis(key_maven_repo_list + "")
                                if (tmpval == null) {
                                    def finList = []
                                    groupTxtFile.eachLine {
                                        finList.add(it)
                                    }
                                    extHandleItem.fn_setFromRedis(key_maven_repo_list + "", finList)
                                }
                            }
                        } else {
                            def maven_repo_list = extHandleItem.fn_getFromRedis(key_maven_repo_list + "")
                            if (maven_repo_list != null) {
                                List var_maven_repo_list = (List) maven_repo_list;
                                var_maven_repo_list.clear()
                            }
                            extHandleItem.fn_delFromRedis(key_maven_repo_list + "")
                        }

                        return ResFunc.ok([:])
                    }
                },

                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "mvn_meta"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        setAsExpiredTime(params, 20)
                        def res = (bytes_text)
                        def metaObj = timedCache.get("metaObj")
                        if (metaObj == null) {
                            def idx = 0
                            def maven_repo_list = extHandleItem.fn_getFromRedis(key_maven_repo_list)
                            if (maven_repo_list != null) {
                                idx = maven_repo_list.size()
                            } else {
                                if (groupTxtFile.exists()) {
                                    synchronized ("mvn_meta".intern()) {
                                        groupTxtFile.eachLine {
                                            idx++;
                                        }
                                    }
                                }
                            }
                            metaObj = [totalMvnArtifactSize: idx]
                            timedCache.put("metaObj", metaObj)
                        }
                        return ResFunc.ok(metaObj)
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "mvn_search"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        setAsExpiredTime(params, 15)
                        def search_str = (extHandleItem.params['search_str']).toString().trim().toLowerCase().toString()
                        def searchStrArr = search_str.split("\\s+").findAll({ it -> it.length() != 0 });
                        def arr = []
                        if (searchStrArr.size() != 0) {
                            def sid = extHandleItem.params['search_id']
                            def timestamp = System.currentTimeMillis() + ""
                            searchIdCache.put(sid, timestamp)
                            // search by direct file comparison
                            def finalUserViewSize = 20
                            def foundTopSize = finalUserViewSize
                            FileReader fileReader = new FileReader(groupTxtFile)
                            def maven_repo_list = extHandleItem.fn_getFromRedis(key_maven_repo_list)
                            def fn_handle_each_line = { String line ->
                                println line
                                def group = line.toLowerCase()
                                def isAllMatched = true;
                                searchStrArr.every({ eachSearchBlock ->
                                    if (group.contains(eachSearchBlock)) {
                                        return true;
                                    } else {
                                        isAllMatched = false;
                                        return false;
                                    }
                                })
                                if (isAllMatched) {
                                    def m = group.split("\\|")
                                    arr.push([groupId   : m[0],
                                              artifactId: m[1]])
                                }
                            }
                            if (maven_repo_list != null && maven_repo_list.size() != 0) {
                                List<String> var_maven_repo_list = (List<String>) maven_repo_list;
                                for (def item : var_maven_repo_list) {
                                    if (searchIdCache.get(sid) != timestamp) {
                                        break;
                                    }
                                    def line = item
                                    if (arr.size() > foundTopSize) {
                                        break;
                                    } else {
                                        fn_handle_each_line(line)
                                    }
                                }
                            } else {
                                while (true) {
                                    if (searchIdCache.get(sid) != timestamp) {
                                        break;
                                    }
                                    def line = fileReader.readLine()
                                    if (line == null) {
                                        break;
                                    } else {
                                        if (arr.size() > foundTopSize) {
                                            break;
                                        } else {
                                            fn_handle_each_line(line)
                                        }
                                    }
                                }
                            }
                        }
                        return ResFunc.ok([results: arr])
                    }
                },

                //
        ])
    }
}
