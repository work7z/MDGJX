package cc.codegen.plugins.specification.utils.curl.core

class CurlDefinition {
//    String curlCommand;
    List<String> urls; // url
    String outputFile; // -o, --output
    String method = 'GET'; // -X
    String data; // -d, --data
    boolean failSilently; // -f, --fail
    String remoteName // -O, --remote-name
    boolean silent; // -s, --silent
    String uploadFile; // -T, --upload-file
    boolean include; // -i, --include
    String user; // -u, --user user:password
    String agent; // -A, --user-agent
    boolean verbose; // -v, --verbose
    String version; // -V, --version
    boolean help; // -h, --help
    boolean compressed; // --compressed
    List<CurlHeader> headers = []; // -H, --header
    List<CurlCookie> cookies = []

    CurlDefinition() {
    }

    String fn_getJoinedURL() {
        if (urls == null) {
            return ""
        } else {
            return urls.join(",")
        }
    }

    String optionalDomain;
    String optionalSubPath;

    String fn_getDomain() {
        try {
            String urlString = fn_getJoinedURL();
            URL url = new URL(urlString);
            String host = url.getHost();
            return host;
        } catch (Throwable e) {
            e.printStackTrace()
            return e.getMessage()
        }
    }

    static void main(String[] args) {
        CurlDefinition curlDefinition = new CurlDefinition(
                urls: [
                        "http://127.0.0.1:18080/exts/CurlToAPI"
                ]
        )
        println curlDefinition.fn_getDomain()
    }

}
