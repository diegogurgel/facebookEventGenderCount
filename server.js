
var connect = require('connect');
var https = require('https');
connect.createServer(
    connect.static(__dirname +'')
).listen(8080);
