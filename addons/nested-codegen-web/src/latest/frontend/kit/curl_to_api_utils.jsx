import cutils from "./common_utils";
import lo_utils from "./lo_utils";

const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  GFormSwitch,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
  Tag,
  Popover,
  Radio,
  ButtonGroup,
  TextArea,
  Intent,
  observer,
  Position,
  Toaster,
  Checkbox,
  ContextMenu,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Alignment,
  Classes,
  Tree,
  Icon,
  Card,
  Elevation,
  Button,
  PanelStack2,
  Spinner,
  Callout,
  PanelStack,
  gstore,
  AnchorButton,
  Tooltip,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  Menu,
  MenuItem,
  MenuDivider,
  BluePrintTable,
  autorun,
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
  BluePrintDocs,
  BluePrintCpt,
  observable,
  gutils,
  ReactDOM,
  useStores,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useState,
  useAsObservableSource,
  useLocalStore,
  useObserver,
  Provider,
  Router,
  GFormInput,
  inject,
  Html_select,
  BeautifyCodeCommon,
  prettier,
  xmlutils,
  createHistory,
  withRouter,
  Switch,
  Route,
  Link,
  useHistory,
} = window.CodeGenDefinition;

let preUtils = {
  str_map2HeaderObj(arr) {
    return JSON.stringify(preUtils.map2HeaderObj(arr), 0, 4);
  },
  map2HeaderObj(arr) {
    let obj = {};
    _.map(arr, (x, d, n) => {
      obj[x.name] = x.value;
    });
    return obj;
  },
  getHeader(arr, key, dv) {
    key = _.toLower(_.trim(key));
    let myval = null;
    _.every(arr, (x, d, n) => {
      if (_.toLower(_.trim(x.name)) == key) {
        myval = x.value;
        return false;
      } else {
        return true;
      }
    });
    return myval;
  },
  antiWrap(arr) {
    if (_.isNil(arr)) {
      return "";
    }
    if (arr && arr.join && _.isFunction(arr.join)) {
      return preUtils.antiWrap(arr.join(" "));
    } else {
      return arr.replace(/`/g, "\\`");
    }
  },
  doubleQuoteWrap(arr) {
    if (_.isNil(arr)) {
      return "";
    }
    if (arr && arr.join && _.isFunction(arr.join)) {
      return preUtils.doubleQuoteWrap(arr.join(" "));
    } else {
      return arr.replace(/"/g, '\\"');
    }
  },
  singleQuoteWrap(arr) {
    if (_.isNil(arr)) {
      return "";
    }
    if (arr && arr.join && _.isFunction(arr.join)) {
      return preUtils.singleQuoteWrap(arr.join(" "));
    } else {
      return arr.replace(/'/g, `\\'`);
    }
  },
};
window.tmp__preUtils = preUtils;
let { singleQuoteWrap, doubleQuoteWrap } = preUtils;

let errmsg_payload = t(
  `the payload logic code is not yet supported in CodeGen Toolbox`
);

let curl_to_api_utils = {
  example: {
    curl2api: `
curl 'https://www.google.com/' \
-H 'authority: www.google.com' \
-H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
-H 'accept-language: en-US,en;q=0.9' \
-H 'cache-control: max-age=0' \
-H 'preferanonymous: 1' \
-H 'sec-ch-ua: "Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"' \
-H 'sec-ch-ua-arch: "x86"' \
-H 'sec-ch-ua-bitness: "64"' \
-H 'sec-ch-ua-full-version: "111.0.1661.54"' \
-H 'sec-ch-ua-full-version-list: "Microsoft Edge";v="111.0.1661.54", "Not(A:Brand";v="8.0.0.0", "Chromium";v="111.0.5563.111"' \
-H 'sec-ch-ua-mobile: ?0' \
-H 'sec-ch-ua-model: ""' \
-H 'sec-ch-ua-platform: "macOS"' \
-H 'sec-ch-ua-platform-version: "12.6.0"' \
-H 'sec-ch-ua-wow64: ?0' \
-H 'sec-fetch-dest: document' \
-H 'sec-fetch-mode: navigate' \
-H 'sec-fetch-site: same-origin' \
-H 'sec-fetch-user: ?1' \
-H 'upgrade-insecure-requests: 1' \
-H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54' \
-H 'Cookie: Hm_391ks3=391kd; Hm_system=9931; codegenkey=m193932; JSESSIONID=9BF016DCDKQIEEA5D5IQ' \
--compressed
`,
    json2api: `{
  "method": "POST",
  "compressed":true,
  "failSilently":false,
  "headers":[
    {
			"name":"Cookie",
			"value":"Hm_391ks3=391kd; Hm_system=9931; codegenkey=m193932; JSESSIONID=9BF016DCDKQIEEA5D5IQ"
		},
    {
      "name":"user-agent",
      "value":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54"
    },
    {
      "name":"upgrade-insecure-requests",
      "value":"1"
    },
    {
      "name":"sec-fetch-user",
      "value":"?1"
    },
    {
      "name":"sec-fetch-site",
      "value":"same-origin"
    },
    {
      "name":"sec-fetch-mode",
      "value":"navigate"
    },
    {
      "name":"sec-fetch-dest",
      "value":"document"
    },
    {
      "name":"sec-ch-ua-wow64",
      "value":"?0"
    },
    {
      "name":"sec-ch-ua-platform-version",
      "value":"\\"12.6.0\\""
    },
    {
      "name":"sec-ch-ua-platform",
      "value":"\\"macOS\\""
    },
    {
      "name":"sec-ch-ua-model",
      "value":"\\"\\""
    },
    {
      "name":"sec-ch-ua-mobile",
      "value":"?0"
    },
    {
      "name":"sec-ch-ua-full-version-list",
      "value":"\\"Microsoft Edge\\";v=\\"111.0.1661.54\\", \\"Not(A:Brand\\";v=\\"8.0.0.0\\", \\"Chromium\\";v=\\"111.0.5563.111\\""
    },
    {
      "name":"sec-ch-ua-full-version",
      "value":"\\"111.0.1661.54\\""
    },
    {
      "name":"sec-ch-ua-bitness",
      "value":"\\"64\\""
    },
    {
      "name":"sec-ch-ua-arch",
      "value":"\\"x86\\""
    },
    {
      "name":"sec-ch-ua",
      "value":"\\"Microsoft Edge\\";v=\\"111\\", \\"Not(A:Brand\\";v=\\"8\\", \\"Chromium\\";v=\\"111\\""
    },
    {
      "name":"preferanonymous",
      "value":"1"
    },
    {
      "name":"cache-control",
      "value":"max-age=0"
    },
    {
      "name":"accept-language",
      "value":"en-US,en;q=0.9"
    },
    {
      "name":"accept",
      "value":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
    },
    {
      "name":"authority",
      "value":"www.google.com"
    }
  ],
  "help":false,
  "include":false,
  "silent":false,
  "urls":[
    "https://www.google.com/"
  ],
  "verbose":false
}`,
  },
  ...preUtils,
  src_list: [
    {
      label: `Ansible`,
      value: `ansible`,
      format: (obj) => {
        let url_value = _.join(obj.urls, ",");
        let NEWLINE_data_line_wrap =
          obj.method == "POST" ? `\n\tbody: ${obj.data}` : "";
        return `-
name: '${url_value}'
uri:
    url: '${url_value}'
    method: ${obj.method}${NEWLINE_data_line_wrap}
    headers:
${_.join(
  _.map(obj.headers, (x, d, n) => {
    return `\t\t${x.name}: '${x.value}'`;
  }),
  "\n"
)}
    register: result        
`;
      },
    },
    // {
    //   label: `C`,
    //   value: `c`,
    // },
    {
      label: `C#`,
      value: `c#`,
      format: (obj) => {
        let NEWLINE_data_line_wrap =
          obj.method == "POST"
            ? `request.Content = new StringContent("${preUtils.doubleQuoteWrap(
                obj.data
              )}");
request.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("${preUtils.getHeader(
                obj.headers,
                `Content-Type`,
                `application/json;charset=UTF-8`
              )}");`
            : "";
        return `using System.Net.Http;
using System.Net.Http.Headers;

HttpClientHandler handler = new HttpClientHandler();
${
  obj.compressed
    ? `handler.AutomaticDecompression = DecompressionMethods.All;`
    : ``
}

HttpClient client = new HttpClient(handler);

HttpRequestMessage request = new HttpRequestMessage(new HttpMethod("${
          obj.method
        }"), "${preUtils.doubleQuoteWrap(obj.urls)}");

${_.join(
  _.map(obj.headers, (x, d, n) => {
    return `request.Headers.Add("${preUtils.doubleQuoteWrap(
      x.name
    )}", "${preUtils.doubleQuoteWrap(x.value)}");`;
  }),
  "\n"
)}

${NEWLINE_data_line_wrap}

HttpResponseMessage response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
string responseBody = await response.Content.ReadAsStringAsync();`;
      },
    },
    {
      label: `CFML`,
      value: `cfml`,
      format: (obj) => {
        let { method, compressed, data, headers } = obj;
        let joined_urls = _.join(obj.urls, ",");
        let wrapData = preUtils.doubleQuoteWrap(data);
        return `httpService = new http();
httpService.setUrl("${joined_urls}");
httpService.setMethod("${method}");
${_.join(
  _.map(headers, (x) => {
    return `httpService.addParam(type="header", name="sec-ch-ua-platform", value='"macOS"');`;
  }),
  "\n"
)}
${
  method == "POST"
    ? `httpService.addParam(type="body", value="${wrapData}");
`
    : ``
}

result = httpService.send().getPrefix();
writeDump(result);`;
      },
    },
    {
      label: `Clojure`,
      value: `clojure`,
      format: (obj) => {
        let { method, compressed, data, headers } = obj;
        let joined_urls = _.join(obj.urls, ",");
        let wrapData = preUtils.doubleQuoteWrap(data);
        return `(require '[cheshire.core :as json])
(require '[clj-http.client :as client])

(client/${_.toLower(method)} "${joined_urls}" {
    :headers {
        ${_.chain(headers)
          .map((x, d, n) => {
            return `\t\t\t"${preUtils.doubleQuoteWrap(
              x.name
            )}" "${preUtils.doubleQuoteWrap(x.value)}"`;
          })
          .join(",\n")
          .value()}    
    }
    :form-params {}
    :content-type :json}
)`;
      },
    },
    {
      label: `Dart`,
      value: `dart`,
      format: (obj) => {
        let { method, compressed, data, headers } = obj;
        let joined_urls = _.join(obj.urls, ",");
        let isPost = _.toLower(method) == "POST";
        let wrapData = preUtils.singleQuoteWrap(data);
        let singleQData = wrapData;
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `import 'package:http/http.dart' as http;

void main() async {
    var headers = {
${_.join(
  _.map(headers, (x, d, n) => {
    return `        '${preUtils.singleQuoteWrap(
      x.name
    )}': '${preUtils.singleQuoteWrap(x.value)}',`;
  }),
  "\n"
)}
    };
${_.toLower(method) == "post" ? `    var data = '${wrapData}';\n` : ""}
    var url = Uri.parse('${preUtils.singleQuoteWrap(joined_urls)}');
    var res = await http.${_.toLower(method)}(url, headers: headers${
          _.toLower(method) == "post" ? `, body: data` : ""
        });
    if (res.statusCode != 200) throw Exception('http.post error: statusCode= \${
      res.statusCode
    }');
    print(res.body);
}`;
      },
    },
    {
      label: `Elixir`,
      value: `elixir`,
      format: (obj) => {
        let { method, compressed, data, headers } = obj;
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let wrapData = preUtils.singleQuoteWrap(data);
        let singleQData = wrapData;
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `response = HTTPoison.${smallerMethod}!(
    "${joined_urls}",
${isPost ? `    "${doubleQData}",` : ""}
    [
${_.join(
  _.map(headers, (x, d, n) => {
    return `        {"${preUtils.doubleQuoteWrap(
      x.name
    )}", "${preUtils.doubleQuoteWrap(x.value)}"},`;
  }),
  "\n"
)}
    ],
    [hackney: [cookie: ["${preUtils.getHeader(headers, "Cookie", "")}"]]]
)`;
      },
    },
    {
      label: `Go`,
      value: `go`,
      format: (obj) => {
        let { method, compressed, data, headers } = obj;
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let wrapData = preUtils.singleQuoteWrap(data);
        let singleQData = wrapData;
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `package main

import (
    "fmt"
    "io"
    "log"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
${
  isPost
    ? `    var data = strings.NewReader(\`${preUtils.antiWrap(data)}\`)`
    : ""
}
    req, err := http.NewRequest("POST", "${joined_urls}"${
          isPost ? `, data` : ""
        })
    if err != nil {
        log.Fatal(err)
    }
${_.join(
  _.map(headers, (x) => {
    return `    req.Header.Set("${preUtils.doubleQuoteWrap(
      x.name
    )}", "${preUtils.doubleQuoteWrap(x.value)}")`;
  }),
  "\n"
)}

    resp, err := client.Do(req)
    if err != nil {
        log.Fatal(err)
    }
    defer resp.Body.Close()
    bodyText, err := io.ReadAll(resp.Body)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%s\n", bodyText)
}`;
      },
    },
    {
      label: `HAR`,
      value: `har`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return JSON.stringify(
          {
            log: {
              version: "1.2",
              entries: [
                {
                  request: {
                    method: _.toUpper(method),
                    url: joined_urls,
                    httpVersion: "HTTP/1.1",
                    cookies: _.map(cookies, (x) => ({
                      name: x.name,
                      value: x.value,
                    })),
                    headers: _.map(headers, (x) => ({
                      name: x.name,
                      value: x.value,
                    })),
                    queryString: [],
                    headersSize: -1,
                    bodySize: !_.isNil(data) ? ("" + data).length : -1,
                    postData: data,
                  },
                },
              ],
            },
          },
          0,
          4
        );
      },
    },
    {
      label: `HTTPie`,
      value: `HTTPie`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `http ${_.toUpper(method)} '${preUtils.singleQuoteWrap(
          joined_urls
        )}'
${lo_utils
  .map(headers, (x) => {
    return `  ${x.name}:'${x.value}' \\`;
  })
  .join("\n")}
`;
      },
    },
    {
      label: `Java(java.net.http)`,
      value: `java.net.http`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

class Main {

  public static void main(String[] args) throws IOException {
    URL url = new URL("${preUtils.doubleQuoteWrap(joined_urls)}");
    HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
    httpConn.setRequestMethod("${upperMethod}");

${lo_utils
  .map(headers, (x) => {
    return `    httpConn.setRequestProperty("${preUtils.doubleQuoteWrap(
      x.name
    )}", "${preUtils.doubleQuoteWrap(x.value)}");`;
  })
  .join("\n")}

    httpConn.setDoOutput(true);
${
  isPost
    ? `    OutputStreamWriter writer = new OutputStreamWriter(httpConn.getOutputStream());
writer.write("${data}");
writer.flush();
writer.close();
httpConn.getOutputStream().close();
`
    : ""
}

    InputStream responseStream = httpConn.getResponseCode() / 100 == 2
        ? httpConn.getInputStream()
        : httpConn.getErrorStream();
    Scanner s = new Scanner(responseStream).useDelimiter("\\A");
    String response = s.hasNext() ? s.next() : "";
    System.out.println(response);
  }
}`;
      },
    },
    {
      label: `Java(AsyncHttpClient)`,
      value: `java.AsyncHttpClient`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("${upperMethod}", "${preUtils.doubleQuoteWrap(joined_urls)}")
${lo_utils
  .map(
    headers,
    (x) =>
      `  .setHeader("${preUtils.doubleQuoteWrap(
        x.name
      )}", "${preUtils.doubleQuoteWrap(x.value)}")`
  )
  .join("\n")}
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();`;
      },
    },
    {
      label: `Java(OkHttp)`,
      value: `java.okhttp`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("${preUtils.doubleQuoteWrap(joined_urls)}")${
          isPost
            ? `  .post("${preUtils.doubleQuoteWrap(data)}")
`
            : ""
        }
${lo_utils
  .map(
    headers,
    (x) =>
      `  .addHeader("${preUtils.doubleQuoteWrap(
        x.name
      )}", "${preUtils.doubleQuoteWrap(x.value)}")`
  )
  .join("\n")}
  .build();

Response response = client.newCall(request).execute();`;
      },
    },
    {
      label: `JavaScript(Fetch)`,
      value: `javascript.fetch`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `fetch('${preUtils.singleQuoteWrap(joined_urls)}', {
  method: '${upperMethod}',
  headers: ${JSON.stringify(preUtils.map2HeaderObj(headers), 0, 2)},
${isPost ? `  body: '${preUtils.singleQuoteWrap(data)}'` : ""}
});`;
      },
    },
    {
      label: `JavaScript(jQuery)`,
      value: `javascript.jquery`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `const settings = {
  "async": true,
  "crossDomain": true,
  "url": "${preUtils.doubleQuoteWrap(joined_urls)}",
  "method": "${upperMethod}",
  "headers": ${JSON.stringify(preUtils.map2HeaderObj(headers), 0, 2)},
  ${isPost ? `  "data": '${preUtils.singleQuoteWrap(data)}'` : ""}
};

$.ajax(settings).done(function (response) {
  console.log(response);
});`;
      },
    },
    {
      label: `JavaScript(XHR)`,
      value: `javascript.xhr`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("${upperMethod}", "${preUtils.doubleQuoteWrap(joined_urls)}");
${lo_utils
  .map(
    headers,
    (x) =>
      `xhr.setRequestHeader("${preUtils.doubleQuoteWrap(
        x.name
      )}", "${preUtils.doubleQuoteWrap(x.value)}");`
  )
  .join(`\n`)}

xhr.send(data);`;
      },
    },
    {
      label: `JSON`,
      value: `JSON`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return JSON.stringify(obj, 0, 2);
      },
    },
    {
      label: `Kotlin`,
      value: `kotlin`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `val client = OkHttpClient()

val request = Request.Builder()
  .url("${preUtils.doubleQuoteWrap(joined_urls)}")${
          isPost
            ? `  .post("${preUtils.doubleQuoteWrap(data)}")
`
            : ""
        }
${lo_utils
  .map(
    headers,
    (x) =>
      `  .addHeader("${preUtils.doubleQuoteWrap(
        x.name
      )}", "${preUtils.doubleQuoteWrap(x.value)}")`
  )
  .join("\n")}
  .build()

val response = client.newCall(request).execute()`;
      },
    },
    {
      label: `MATLAB`,
      value: `MATLAB`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `%% Web Access using Data Import and Export API
cookies = {
    'SEARCH_SAMESITE' 'CgQI9JYB'
    'HSID' 'AHwy3cJ58gvMpLcWZ'
    'SSID' 'AngNDwB59doCk7eMp'
    'APISID' 'kKnvzob9DQXue0AH/AckHcyeKGTuAUFMcy'
    'SAPISID' 'aAi9bRcZD8EbYXq-/AvZ1gWTjey5t9_e3q'
    '__Secure-1PAPISID' 'aAi9bRcZD8EbYXq-/AvZ1gWTjey5t9_e3q'
    '__Secure-3PAPISID' 'aAi9bRcZD8EbYXq-/AvZ1gWTjey5t9_e3q'
    'OGPC' '19033886-1:'
    '__Secure-ENID' '10.SE=Fnwkit-FTUoUoSlD8dojwyPP1fJecoaLjHKXdWpdj0SyzCuyJtrOVrkVV-9ohFH1_LBqeyqv62pIWYz0yI9djw21dXiHIpqP-UJsfLrwREXdv2r_1lbLdj_wcihCkIPCKd7OcwSNQUEkEb98td8tzRFDqbs9tcoH7x9P_bBJO6JIIxGR_tzSVoOmLqLftOXYtxdtNuUyJWbMHR_UckcMRcRW3SZdJ82rER5kY9LalMlPbTRMNPtLx1DWQJnrd2vO7qGCNqOyAEY44g'
    'SID' 'Uwg9YJA3U28H3JGOsirAOGBV4IyLGYMktaF1LDN3wtYHSqWxsUyOrz2BUd5aEV4QP2sqvQ.'
    '__Secure-1PSID' 'Uwg9YJA3U28H3JGOsirAOGBV4IyLGYMktaF1LDN3wtYHSqWxG-umRsH56diVKO6LvEjnNQ.'
    '__Secure-3PSID' 'Uwg9YJA3U28H3JGOsirAOGBV4IyLGYMktaF1LDN3wtYHSqWx3KfV9zML5lgq-obOVsh43A.'
    'OTZ' '6956709_24_24__24_'
    'AEC' 'AUEFqZeBIzinZTo8g9M8KASnsf-f6u2yJo8uBaUMBKZvjjbNGLv3-8225WM'
    '1P_JAR' '2023-04-01-16'
    'NID' '511=Rxl_VGoKg9WvoJ1X9ijsO_A4WTQxpuNFeeYqtXjXDyCv2DLk7tb1rniMhZdZ2nc4TogwrYzevKKX04_XCI-ruUIsjZQaSLV-UWCCIeD6-T08tTu3kytWrfO2MhgEjZLNQADMcziXLUdSh7oHqJtewUYs5cux6ut7aYX5tSefecNJ9Ped1XRJ5j_hilXFD32zLC74ro3zgcQul6EN-L-EiRBcVDef3ilR25usrJOr-ZUeoS3RANoc2FcMhMfMMtlENMwGKSqRONihYJ95RuSf2f-9i5Y2I2I_2ba0SUYKdlWft4YaTSIGWvR0no1EHfpB2qpH46QW-6iCeOg'
    'SIDCC' 'AFvIBn9bkvLAn7fyQVPaJ7EUAzj_q57pjBpph0hOKlYXGZTmSWhc3X6wJrpxkIQyomZkBtIsfBA'
    '__Secure-1PSIDCC' 'AFvIBn_DdmvoIDZ8a3EA7ub_DaHReMUGA5-4bExV9zZVN6Q8pY3CcdE_-6E1lYOkjmtJK2yEwmI'
    '__Secure-3PSIDCC' 'AFvIBn82CXhg9BL30sGRIVvx7NP1FgfB65jqOJ6jPPM6sqgeFUi7CWXeMaHnzh09I4-KrbltAQ'
};
uri = 'https://www.google.com/gen_204?atyp=i&r=1&ei=RVkoZK_jHcHYhwPa_Y7oCQ&ct=usp:t&zx=1680365894478';
body = 'okr';
options = weboptions(...
    'UserAgent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',...
    'MediaType', 'application/x-www-form-urlencoded',...
    'HeaderFields', {
        'authority' 'www.google.com'
        'accept' '*/*'
        'accept-language' 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7'
        'content-length' '0'
        'cookie' char(join(join(cookies, '='), '; '))
        'origin' 'https://www.google.com'
        'referer' 'https://www.google.com/'
        'sec-ch-ua' '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"'
        'sec-ch-ua-arch' '"x86"'
        'sec-ch-ua-bitness' '"64"'
        'sec-ch-ua-full-version' '"111.0.1661.62"'
        'sec-ch-ua-full-version-list' '"Microsoft Edge";v="111.0.1661.62", "Not(A:Brand";v="8.0.0.0", "Chromium";v="111.0.5563.149"'
        'sec-ch-ua-mobile' '?0'
        'sec-ch-ua-model' ''
        'sec-ch-ua-platform' '"macOS"'
        'sec-ch-ua-platform-version' '"12.6.0"'
        'sec-ch-ua-wow64' '?0'
        'sec-fetch-dest' 'empty'
        'sec-fetch-mode' 'no-cors'
        'sec-fetch-site' 'same-origin'
    }...
);
response = webwrite(uri, body, options);

%% HTTP Interface
import matlab.net.*
import matlab.net.http.*
import matlab.net.http.io.*

cookies = {
${lo_utils
  .map(
    cookies,
    (x) => `    '${singleQuoteWrap(x.name)}' '${singleQuoteWrap(x.value)}'`
  )
  .join("\n")}
};
header = [
  ${lo_utils
    .map(
      cookies,
      (x) =>
        `    HeaderField('${singleQuoteWrap(x.name)}', '${singleQuoteWrap(
          x.value
        )}')`
    )
    .join("\n")}  
]';
uri = URI('${preUtils.singleQuoteWrap(joined_urls)}');
${isPost ? `body = FormProvider('${preUtils.singleQuoteWrap(data)}');` : ""}
${
  isPost
    ? `response = RequestMessage('${smallerMethod}', header, body).send(uri.EncodedURI);`
    : `response = RequestMessage('${smallerMethod}', header).send(uri.EncodedURI);`
}
`;
      },
    },
    {
      label: `Node.js(Axios)`,
      value: `node.js.axios`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `const axios = require('axios');

const response = await axios.${smallerMethod}(
  '${singleQuoteWrap(joined_urls)}',${
          isPost ? `  '${singleQData}',` + "\n" : ""
        }
  {
    headers: ${preUtils.str_map2HeaderObj(headers)}
  }
);`;
      },
    },
    {
      label: `Node.js(Got)`,
      value: `node.js.got`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `import got from 'got';

const response = await got.${smallerMethod}('${preUtils.singleQuoteWrap(
          joined_urls
        )}', {
  headers: ${preUtils.str_map2HeaderObj(headers)},
${isPost ? `  body: '${preUtils.singleQuoteWrap(data)}'` : ""}
});`;
      },
    },
    {
      label: `Node.js(Node-Fetch)`,
      value: `node.js.node-fetch`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `import fetch from 'node-fetch';

fetch('${preUtils.singleQuoteWrap(joined_urls)}', {
  method: '${upperMethod}',
  headers: ${preUtils.str_map2HeaderObj(headers)},
  ${isPost ? `  body: '${preUtils.singleQuoteWrap(data)}'` : ""}
});`;
      },
    },
    {
      label: `Node.js(Request)`,
      value: `node.js.request`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `var request = require('request');

var headers = ${preUtils.str_map2HeaderObj(headers)};

var options = {
    url: '${preUtils.singleQuoteWrap(joined_urls)}',
    method: '${upperMethod}',
    headers: headers,
${isPost ? `  body: '${preUtils.singleQuoteWrap(data)}'` : ""}
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);`;
      },
    },
    {
      label: `Objective-C`,
      value: `objective-c`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `#import <Foundation/Foundation.h>

NSDictionary *headers = @{ 
      ${lo_utils
        .map(
          headers,
          (x) =>
            `                            @"${preUtils.doubleQuoteWrap(
              x.name
            )}": @"${preUtils.doubleQuoteWrap(x.value)}",`
        )
        .join(",\n")}
                        };

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"${preUtils.doubleQuoteWrap(
          joined_urls
        )}"]
                                                        cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                    timeoutInterval:10.0];
[request setHTTPMethod:@"${upperMethod}"];
[request setAllHTTPHeaderFields:headers];

// TODO: ${errmsg_payload}

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];`;
      },
    },
    {
      label: `OCaml`,
      value: `ocaml`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `open Cohttp_lwt_unix
open Cohttp
open Lwt

let uri = Uri.of_string "${preUtils.doubleQuoteWrap(joined_urls)}" in
let headers = Header.add_list (Header.init ()) [
${lo_utils
  .map(
    headers,
    (x) =>
      `  ("${preUtils.doubleQuoteWrap(x.name)}", "${preUtils.doubleQuoteWrap(
        x.value
      )}");`
  )
  .join(";\n")}
] in


Client.call ~headers \`${upperMethod} uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)`;
      },
    },
    {
      label: `PHP`,
      value: `php`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        let cookieVal = preUtils.getHeader(headers, "Cookie");
        return `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${preUtils.singleQuoteWrap(joined_urls)}');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${preUtils.singleQuoteWrap(data)}');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
${lo_utils
  .map(
    headers,
    (x) =>
      `    '${preUtils.singleQuoteWrap(x.name)}: ${preUtils.singleQuoteWrap(
        x.value
      )}',`
  )
  .join("\n")}
]);
${
  !cutils.cond_emptyStr(cookieVal)
    ? `curl_setopt($ch, CURLOPT_COOKIE, "${preUtils.singleQuoteWrap(
        cookieVal
      )}")`
    : ""
}
${
  isPost
    ? `curl_setopt($ch, CURLOPT_POSTFIELDS, '${preUtils.singleQuoteWrap(
        data
      )}');`
    : ""
}

$response = curl_exec($ch);

curl_close($ch);

?>
`;
      },
    },
    {
      label: `PowerShell(Invoke-RestMethod)`,
      value: `powershell.invoke-restmethod`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `$headers=@{}
${lo_utils
  .map(
    headers,
    (x) =>
      `$headers.Add("${preUtils.doubleQuoteWrap(
        x.name
      )}", "${preUtils.doubleQuoteWrap(x.value)}")`
  )
  .join("\n")}
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$cookie = New-Object System.Net.Cookie
${lo_utils
  .map(
    cookies,
    (x) => `
$cookie = New-Object System.Net.Cookie
$cookie.Name = '${preUtils.singleQuoteWrap(x.name)}'
$cookie.Value = '${preUtils.singleQuoteWrap(x.value)}'
$cookie.Domain = '${preUtils.singleQuoteWrap(x.domain)}'
$session.Cookies.Add($cookie)`
  )
  .join("\n")}

$response = Invoke-RestMethod -Uri '${preUtils.singleQuoteWrap(
          joined_urls
        )}' -Method ${upperMethod} -Headers $headers -WebSession $session`;
      },
    },
    {
      label: `PowerShell(Invoke-WebRequest)`,
      value: `powershell.invoke-webrequest`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `$headers=@{}
${lo_utils
  .map(
    headers,
    (x) =>
      `$headers.Add("${preUtils.doubleQuoteWrap(
        x.name
      )}", "${preUtils.doubleQuoteWrap(x.value)}")`
  )
  .join("\n")}
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$cookie = New-Object System.Net.Cookie
${lo_utils
  .map(
    cookies,
    (x) => `
$cookie = New-Object System.Net.Cookie
$cookie.Name = '${preUtils.singleQuoteWrap(x.name)}'
$cookie.Value = '${preUtils.singleQuoteWrap(x.value)}'
$cookie.Domain = '${preUtils.singleQuoteWrap(x.domain)}'
$session.Cookies.Add($cookie)`
  )
  .join("\n")}

$response = Invoke-WebRequest -Uri '${preUtils.singleQuoteWrap()}' -Method ${upperMethod} -Headers $headers -WebSession $session`;
      },
    },
    {
      label: `Python(Requests)`,
      value: `python.requests`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `import requests

cookies = ${JSON.stringify(cookies, 0, 4)}

headers = ${JSON.stringify(headers, 0, 4)}

data = 'okr'

response = requests.${smallerMethod}(
    '${preUtils.singleQuoteWrap(joined_urls)}',
    cookies=cookies,
    headers=headers,
${isPost ? `    data=data,` : ""}
)`;
      },
    },
    {
      label: `Python(http.client)`,
      value: `python.http.client`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `import http.client

conn = http.client.HTTPSConnection("${preUtils.doubleQuoteWrap(
          obj.optionalDomain
        )}")

${isPost ? `payload = "${preUtils.doubleQuoteWrap(data)}"` : ""}

headers = ${JSON.stringify(headers, 0, 4)}

conn.request("${upperMethod}", "${preUtils.doubleQuoteWrap(
          obj.optionalSubPath
        )}", ${isPost ? "payload, " : ""}headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))`;
      },
    },
    {
      label: `R`,
      value: `r`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `require(httr)

cookies = c(
${lo_utils
  .map(
    cookies,
    (x) =>
      `  \`${preUtils.antiWrap(x.name)}\` = "${preUtils.doubleQuoteWrap(
        x.value
      )}"`
  )
  .join(",\n")}
)

headers = c(
${lo_utils
  .map(
    headers,
    (x) =>
      `  \`${preUtils.antiWrap(x.name)}\` = "${preUtils.doubleQuoteWrap(
        x.value
      )}"`
  )
  .join(",\n")}
)

${isPost ? `data = "${preUtils.doubleQuoteWrap(data)}"` : ""}

res <- httr::POST(url = "${preUtils.doubleQuoteWrap(
          joined_urls
        )}", httr::add_headers(.headers=headers), httr::set_cookies(.cookies = cookies)${
          isPost ? ", body = data" : ""
        })`;
      },
    },
    {
      label: `Ruby`,
      value: `ruby`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        window.tmp_ruby_001 = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        let contentType = preUtils.getHeader(
          headers,
          "Content-Type",
          "Unknown"
        );
        return `require 'net/http'

uri = URI('${preUtils.singleQuoteWrap(joined_urls)}')
req = Net::HTTP::${lo_utils.upperFirst(smallerMethod)}.new(uri)
req.content_type = '${preUtils.singleQuoteWrap(contentType)}'
${lo_utils
  .map(
    headers,
    (x) =>
      `req['${preUtils.singleQuoteWrap(x.name)}'] = '${preUtils.singleQuoteWrap(
        x.value
      )}'`
  )
  .join("\n")}

${isPost ? `req.body = '${preUtils.singleQuoteWrap(data)}'` : ""}

req_options = {
  use_ssl: uri.scheme == 'https'
}
res = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
  http.request(req)
end`;
      },
    },
    {
      label: `Rust`,
      value: `rust`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `extern crate reqwest;
use reqwest::header;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut headers = header::HeaderMap::new();
${lo_utils
  .map(
    headers,
    (x) =>
      `    headers.insert("${preUtils.doubleQuoteWrap(
        x.name
      )}", "${preUtils.doubleQuoteWrap(x.value)}".parse().unwrap())`
  )
  .join(";\n")}

    let client = reqwest::blocking::Client::builder()
        .redirect(reqwest::redirect::Policy::none())
        .build()
        .unwrap();
    let res = client.${smallerMethod}("${preUtils.doubleQuoteWrap(
          joined_urls
        )}")
        .headers(headers)
        ${isPost ? `.body("${preUtils.doubleQuoteWrap(data)}")` : ""}.send()?
        .text()?;
    println!("{}", res);

    Ok(())
}`;
      },
    },
    {
      label: `Swift`,
      value: `swift`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `import Foundation

let headers = [
${lo_utils
  .map(
    (x) =>
      `  "${preUtils.doubleQuoteWrap(x.name)}": "${preUtils.doubleQuoteWrap(
        x.value
      )}"`
  )
  .join(",\n")}  
]

let request = NSMutableURLRequest(url: NSURL(string: "${preUtils.doubleQuoteWrap(
          joined_urls
        )}")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "${preUtils.doubleQuoteWrap(smallerMethod)}"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()`;
      },
    },
    {
      label: `WGet`,
      value: `wget`,
      format: (obj) => {
        let { method, compressed, data, headers, cookies } = obj;
        let upperMethod = _.toUpper(method);
        let joined_urls = _.join(obj.urls, ",");
        let smallerMethod = _.toLower(method);
        let isPost = smallerMethod == "post";
        let singleQData = preUtils.singleQuoteWrap(data);
        let doubleQData = preUtils.doubleQuoteWrap(data);
        return `wget ${lo_utils
          .map(
            headers,
            (x) =>
              ` --header="${preUtils.doubleQuoteWrap(
                x.name
              )}: ${preUtils.doubleQuoteWrap(x.value)}"`
          )
          .join("\\ \n")}
--compression=auto \\ ${isPost ? "--post-data=okr \\" : ""}
--output-document - \\
"${preUtils.doubleQuoteWrap(joined_urls)}"`;
      },
    },
  ].map((x) => {
    let hasSelfFormat = x.format;
    let newFormatFn = hasSelfFormat
      ? x.format
      : () => {
          return JSON.stringify(
            {
              error: `Not yet supported this function: ${x.label}`,
            },
            0,
            4
          );
        };
    return {
      hasSelfFormat,
      ...x,
      format: newFormatFn,
    };
  }),
};
export default curl_to_api_utils;
