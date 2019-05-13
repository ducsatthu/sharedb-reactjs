import sharedb from 'sharedb/lib/client';

// Expose a singleton WebSocket connection to ShareDB server
var socket = new WebSocket('ws://localhost:8080');
var connection = new sharedb.Connection(socket);

export default connection;