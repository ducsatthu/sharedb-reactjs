var http = require("http");
var ShareDB = require("sharedb");
var connect = require("connect");
var serveStatic = require('serve-static');
var ShareDBMongo = require('sharedb-mongo');
var ShareDBRedisPubSub = require('sharedb-redis-pubsub');
var WebSocketJSONStream = require('websocket-json-stream');
var WebSocket = require('ws');
var util = require('util');

// Start ShareDB
var share = ShareDB({
    db: new ShareDBMongo('mongodb://localhost:27017/example'),
    pubsub: new ShareDBRedisPubSub('redis://localhost:6379')
});

// Create a WebSocket server
var app = connect();
app.use(serveStatic('.'));
var server = http.createServer(app);
var wss = new WebSocket.Server({server: server});
server.listen(8080);
console.log("Listening on http://localhost:8080");

// Connect any incoming WebSocket connection with ShareDB
wss.on('connection', function (ws, req) {
    var stream = new WebSocketJSONStream(ws);
    console.log('new connect');
    share.listen(stream);
});

// Create initial documents
var connection = share.connect();


connection.createFetchQuery('sheets', {}, {}, function (err, results) {
    if (err) {
        throw err;
    }
});