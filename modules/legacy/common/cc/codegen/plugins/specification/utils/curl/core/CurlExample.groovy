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
