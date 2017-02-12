const connect = require('connect');
const serveStatic = require('serve-static');

connect().use(serveStatic(__dirname + '/build')).listen(8080, function() {
  console.log('server running on 8080...');
});