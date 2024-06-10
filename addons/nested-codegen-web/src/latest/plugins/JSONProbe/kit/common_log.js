let common_log = {
  str: `12-Jul-2016 14:59:18.467 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/docs] has finished in [249] ms
12-Jul-2016 14:59:18.467 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/manager]{
    "object": {
        "310000": "ShangHai",
        "320000": "JiangSu"
    }
}
12-Jul-2016 14:59:18.506 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/manager] has finished in [38] ms
12-Jul-2016 14:59:18.506 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/examples] {
    "foo": "Hello",
    "nested": {
        "a": {
            "b": {
                "c": "Testing, 100"
            }
        }
    },
    "relativePath": {
        "a": {
            "b": {
                "c": "Testing"
            }
        }
    }
}
12-Jul-2016 14:59:18.506 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/examples] Response: {"boolean": false}
12-Jul-2016 14:59:18.506 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/examples]
12-Jul-2016 14:59:18.760 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/examples] [{"a": 12345}] has finished in [254] ms
12-Jul-2016 14:59:18.761 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/ROOT] { a: 100,b: 400,c: 500}
12-Jul-2016 14:59:18.775 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/ROOT] has finished in [15] ms
12-Jul-2016 14:59:18.776 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/host-manager]
12-Jul-2016 14:59:18.801 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/home/mytest/infrastructure/server/apache-tomcat-9.0.58 2/webapps/host-manager] has finished in [25] ms
12-Jul-2016 14:59:18.806 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"] ["array", "CMD"]
12-Jul-2016 14:59:18.824 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in [652] milliseconds`,
};

export default common_log;
