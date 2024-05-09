// write a code to create helloworld http server
// import http module
// create http server
let http = require('http');
let server = http.createServer(function(req, res) {
    res.end('Hello World');
});

server.listen(3000, function() {
    console.log('Server is running at port 3000');
});
