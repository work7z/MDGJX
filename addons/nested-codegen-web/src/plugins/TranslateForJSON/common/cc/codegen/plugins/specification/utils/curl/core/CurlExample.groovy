package cc.codegen.plugins.specification.utils.curl.core

import com.alibaba.fastjson.JSON

class CurlExample {
    static void main(String[] args) {
        println "curl parser"
        def arr = ["curl https://www.example.com/",
                   "curl ftp://ftp.funet.fi/ http://www.weirdserver.com:8000/",
                   "curl --ftp-ssl ftp://files.are.secure.com/secrets.txt",
                   "curl -u username sftp://example.com/etc/issue",
                   "curl -u username: --key ~/.ssh/id_rsa scp://example.com/~/file.txt",
                   "curl -u username: --key ~/.ssh/id_rsa --pass private_key_password\n" + "scp://example.com/~/file.txt",
                   "curl \"http://[2001:1890:1112:1::20]/\"\n",
                   "curl -o thatpage.html http://www.example.com/",
                   "curl -O http://www.example.com/index.html",
                   "curl 'http://127.0.0.1:18080/app/static/lang/zh_CN_overwrite.json' \\\n" + "  -H 'Accept: application/json, text/plain, */*' \\\n" + "  -H 'Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7' \\\n" + "  -H 'Connection: keep-alive' \\\n" + "  -H 'Cookie: Hm_lvt_1ef6dfddqwc8f94df992e=1679149204; Hm_lpvt_1ef6df6ddeqwwc8f94df992e=1679149222; codegenkey=K13_0f66ecc39e524c95b860d41a4; ' \\\n" + "  -H 'If-Modified-Since: Tue, 21 Mar 2023 14:58:19 GMT' \\\n" + "  -H 'If-None-Match: W/\"75258-1679410699946\"' \\\n" + "  -H 'Referer: http://127.0.0.1:18080/exts/CurlParser' \\\n" + "  -H 'Sec-Fetch-Dest: empty' \\\n" + "  -H 'Sec-Fetch-Mode: cors' \\\n" + "  -H 'Sec-Fetch-Site: same-origin' \\\n" + "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.50' \\\n" + "  -H 'sec-ch-ua: \"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"' \\\n" + "  -H 'sec-ch-ua-mobile: ?0' \\\n" + "  -H 'sec-ch-ua-platform: \"macOS\"' \\\n" + "  --compressed",
                   "curl 'http://127.0.0.1:18080/hist/lis''t_hist' \\\n" + "  -H 'Accept: application/json, text/plain, */*' \\\n" + "  -H 'Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7' \\\n" + "  -H 'Connection: keep-alive' \\\n" + "  -H 'Content-Type: application/json;charset=UTF-8' \\\n" + "  -H 'Cookie: Hm_lvt_1ef6dfddqwc8f94df992e=1679149204; Hm_lpvt_1ef6df6ddeqwwc8f94df992e=1679149222; codegenkey=kdk312; JSESSIONID=03DDEECB1171C9D385A' \\\n" + "  -H 'Origin: http://127.0.0.1:18080' \\\n" + "  -H 'Referer: http://127.0.0.1:18080/exts/CurlParser' \\\n" + "  -H 'Sec-Fetch-Dest: empty' \\\n" + "  -H 'Sec-Fetch-Mode: cors' \\\n" + "  -H 'Sec-Fetch-Site: same-origin' \\\n" + "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.50' \\\n" + "  -H 'X-CODEGEN-USER-PRI-KEY: default' \\\n" + "  -H 'X-CODEGEN-WORKSPACE-ID: default' \\\n" + "  -H 'X-FE-LIVE-ID: 341276f132ca444d80ade67c99c09a69' \\\n" + "  -H 'X-FE-RUID: N/A' \\\n" + "  -H 'sec-ch-ua: \"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"' \\\n" + "  -H 'sec-ch-ua-mobile: ?0' \\\n" + "  -H 'sec-ch-ua-platform: \"macOS\"' \\\n" + "  --data-raw '{\"userInfo\":{\"signed\":true,\"username\":\"a200\",\"token\":\"d8a792c4621847f6b02e3763d351b87a\",\"email\":\"2@q.cd\",\"user_id\":null},\"sysInfo\":{\"lang\":\"zh_CN\",\"version\":\"1.8.6\"},\"localUserInfo\":{\"username\":\"ca909f921d4e956fba03fb01c558149c\",\"password\":\"8a433077d7b2f6b14648cef163c3a032\"},\"param\":{\"TABLE_ID\":\"ext_CurlParser\"}}' \\\n" + "  --compressed",
                   "curl 'http://127.0.0.1:18080/hist/list_hist' \\\n" + "  -H 'Accept: application/json, text/plain, */*' \\\n" + "  -H 'Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7' \\\n" + "  -H 'Connection: keep-alive' \\\n" + "  -H 'Content-Type: application/json;charset=UTF-8' \\\n" + "  -H 'Cookie: Hm_lvt_1ef6dfddqwc8f94df992e=1679149204; Hm_lpvt_1ef6df6ddeqwwc8f94df992e=1679149222; codegenkey=kdk312; JSESSIONID=03DDEECB1171C9D385A' \\\n" + "  -H 'Origin: http://127.0.0.1:18080' \\\n" + "  -H 'Referer: http://127.0.0.1:18080/exts/CurlParser' \\\n" + "  -H 'Sec-Fetch-Dest: empty' \\\n" + "  -H 'Sec-Fetch-Mode: cors' \\\n" + "  -H 'Sec-Fetch-Site: same-origin' \\\n" + "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.50' \\\n" + "  -H 'X-CODEGEN-USER-PRI-KEY: default' \\\n" + "  -H 'X-CODEGEN-WORKSPACE-ID: default' \\\n" + "  -H 'X-FE-LIVE-ID: 341276f132ca444d80ade67c99c09a69' \\\n" + "  -H 'X-FE-RUID: N/A' \\\n" + "  -H 'sec-ch-ua: \"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"' \\\n" + "  -H 'sec-ch-ua-mobile: ?0' \\\n" + "  -H 'sec-ch-ua-platform: \"macOS\"' \\\n" + "  --data-raw '{\"userInfo\":{\"signed\":true,\"username\":\"a200\",\"token\":\"d8a792c4621847f6b02e3763d351b87a\",\"email\":\"2@q.cd\",\"user_id\":null},\"sysInfo\":{\"lang\":\"zh_CN\",\"version\":\"1.8.6\"},\"localUserInfo\":{\"username\":\"ca909f921d4e956fba03fb01c558149c\",\"password\":\"8a433077d7b2f6b14648cef163c3a032\"},\"param\":{\"TABLE_ID\":\"ext_CurlParser\"}}' \\\n" + "  --compressed",
//                   "curl \"http://baidu.com\"",
        ]
        arr.each {
            CurlDefinition curl = CurlFactory.parseFromCurl(it)
            println curl
            def str = JSON.toJSONString(curl, true)
            println str
//            def r = CurlFactory.parseFromJSON(str)
//            def b = CurlFactory.convertFromCurlObj(r)
//            println "re-converted: ${b}"
        }
//        def r = "sec-ch-ua-platform: \"macos\" : k312".split(":")
//        println r[0].trim()
//        println r.toList().subList(1, r.size()).join(":").trim()
    }

}
