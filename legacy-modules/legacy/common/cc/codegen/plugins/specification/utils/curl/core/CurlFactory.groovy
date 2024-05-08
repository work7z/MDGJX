package cc.codegen.plugins.specification.utils.curl.core

import cc.codegen.plugins.specification.utils.PUtils
import cc.codegen.plugins.specification.utils.curl.func.CommandTools
import cn.hutool.extra.servlet.ServletUtil
import com.alibaba.fastjson.JSON

class CurlFactory {

    public static CurlDefinition parseFromCurl(String curlCommand) {
        def textArr = CommandTools.parseAsStrArr(curlCommand)
//        println("TextArr: " + PUtils.toJSONWithBeautify(textArr))
        if (textArr == null || textArr.isEmpty() || !textArr[0].equalsIgnoreCase("curl")) {
            throw new RuntimeException("Invalid Curl Command")
        }
        def newArr = []
        def latestFlag = null;
        List<String> urls = []
        Map<String, List<String>> flagMap = [:]
        def formatWithoutQuote = { String str -> return str.replaceAll("^['\"]", "").replaceAll("['\"]\$", "").trim()
        }
        textArr.eachWithIndex { String entry, int i ->
            if (i == 0) {
                return; // skip curl
            }
            if (latestFlag != null) {
                flagMap[latestFlag].push(formatWithoutQuote(entry))
                latestFlag = null;
                return;
            }
            if (entry.startsWith("-") || entry.startsWith("--")) {
                latestFlag = entry.trim();
                if (flagMap[latestFlag] == null) {
                    flagMap[latestFlag] = []
                }
            } else {
                urls.add(formatWithoutQuote(entry))
            }
        }
        println "Hosts: " + PUtils.toJSONWithBeautify(urls)
        println "FlagMap: " + PUtils.toJSONWithBeautify(flagMap)
        CurlDefinition curl = new CurlDefinition()
        curl.setUrls(urls)
        def matchWithFormat = { List<String> matchKeys, def fn ->
            matchKeys.each {
                def o = flagMap[it]
                if (o != null) {
                    fn(o)
                }
            }
        }
        def firstItem = { List<String> arr ->
            if (arr == null || arr.size() == 0) {
                return null;
            } else {
                return arr[0]
            }
        }
        matchWithFormat(['-H', '--header'], { List<String> matchArr ->
            curl.headers = matchArr == null ? [] : matchArr.collect {
                it = it.trim()
                def r = it.split(":")
//                        .replaceAll("^[\"']", "")
//                        .replaceAll("[\"']\$", "")
                def value = r.toList().subList(1, r.size()).join(":").trim()
                return new CurlHeader(r[0].trim(),
                        value)
            }
        })
        matchWithFormat(["-o", "--output"], { List<String> matchArr -> curl.outputFile = firstItem(matchArr)
        })
        matchWithFormat(["-d", "--data", "--data-raw"], { List<String> matchArr -> curl.data = firstItem(matchArr)
        })
        matchWithFormat(["-f", "--fail"], { List<String> matchArr -> curl.failSilently = true
        })
        matchWithFormat(["-O", "--remote-name"], { List<String> matchArr -> curl.remoteName = firstItem(matchArr)
        })
        matchWithFormat(["-s", "--silent"], { List<String> matchArr -> curl.silent = true;
        })
        matchWithFormat(["-T", "--upload-file"], { List<String> matchArr -> curl.uploadFile = firstItem(matchArr);
        })
        matchWithFormat(["-i", "--include"], { List<String> matchArr -> curl.include = true
        })
        matchWithFormat(["-u", "--user"], { List<String> matchArr -> curl.user = firstItem(matchArr)
        })
        matchWithFormat(["-A", "--user-agent"], { List<String> matchArr -> curl.agent = firstItem(matchArr)
        })
        matchWithFormat(["-v", "--verbose"], { List<String> matchArr -> curl.verbose = true
        })
        matchWithFormat(["-V", "--version"], { List<String> matchArr -> curl.version = firstItem(matchArr)
        })
        matchWithFormat(["-h", "--help"], { List<String> matchArr -> curl.help = true;
        })
        matchWithFormat(["--compressed"], { List<String> matchArr -> curl.compressed = true;
        })
        if (curl.data != '' && curl.data != null) {
            curl.method = "POST"
        }
        matchWithFormat(["-X"], { List<String> matchArr -> curl.method = firstItem(matchArr);
        })
        if (curl.headers && curl.headers.size() != 0) {
            curl.headers.eachWithIndex { CurlHeader entry, int i ->
                if (entry && entry.name && entry.name.equalsIgnoreCase("Cookie")) {
                    //"Hm_391ks3=391kd; Hm_system=9931; codegenkey=m193932; JSESSIONID=9BF016DCDKQIEEA5D5IQ"
                    def str = entry.value
                    if (entry.value != null) {
                        curl.cookies = str.split(";").collect({
                            def a = it.split("=")
                            return new CurlCookie(name: a[0],
                                    value: a[1],
                                    domain: curl.fn_getDomain())
                        })
                    }
                }
            }
        }
        def domain = curl.fn_getDomain()
        if (domain != null) {
            curl.optionalDomain = domain;
            curl.optionalSubPath = curl.fn_getJoinedURL().replaceFirst("http://" + domain, "").replaceFirst("https://" + domain, "")
        }
        return curl;
    }

    static void main(String[] args) {

    }


    static CurlDefinition parseFromJSON(String jsonStr) {
        return JSON.parseObject(jsonStr, CurlDefinition.class)
    }

    static String formatIfItHasBlankOrAnythingElse(String val) {
        def needQuotable = false;
        if (val.contains(" ") || val.contains("'")) {
            needQuotable = true;
        }
        if (needQuotable) {
            val = "'" + val.replaceAll("'", "''") + "'"
        }
        return val;
    }

    static String convertFromCurlObj(CurlDefinition curl) {
        List<String> arr = ["curl"]
        if (curl.urls) {
            curl.urls.each {
                arr.add(formatIfItHasBlankOrAnythingElse(it))
            }
        }
        if (curl.headers) {
            curl.headers.each {
                arr.add("-H")
                arr.add(formatIfItHasBlankOrAnythingElse("${it.name}: ${it.value}".toString()))
            }
        }
        if (curl.outputFile) {
            arr.addAll(["-o",
                        formatIfItHasBlankOrAnythingElse(curl.outputFile)])
        }
        if (curl.data) {
            arr.addAll(["-d",
                        formatIfItHasBlankOrAnythingElse(curl.data)])
        }
        if (curl.failSilently) {
            arr.add("-f")
        }
        if (curl.remoteName) {
            arr.addAll(["-O",
                        formatIfItHasBlankOrAnythingElse(curl.remoteName + "")])
        }
        if (curl.silent) {
            arr.add("-s")
        }
        if (curl.uploadFile) {
            arr.add("-T")
            arr.add(formatIfItHasBlankOrAnythingElse(curl.uploadFile))
        }
        if (curl.include) {
            arr.add("-i")
        }
        if (curl.user) {
            arr.add("-u")
            arr.add(formatIfItHasBlankOrAnythingElse(curl.user))
        }
        if (curl.agent) {
            arr.add("-A")
            arr.add(formatIfItHasBlankOrAnythingElse(curl.agent))
        }
        if (curl.verbose) {
            arr.add("-v")
        }
        if (curl.version) {
            arr.add("-V")
        }
        if (curl.help) {
            arr.add("-h")
        }
        if (curl.compressed) {
            arr.add("--compressed")
        }
        return arr.join(" ")
    }
}

