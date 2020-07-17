/**
 * Module dependencies.
 */

 // Reading env variables (config example from https://github.com/sclorg/nodejs-ex/blob/master/server.js)
 var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
     ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
     mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
     mongoURLLabel = "";

var app = require('../app');
var debug = require('debug')('nodejs-sample:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(port || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);

}

