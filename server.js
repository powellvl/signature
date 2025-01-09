const http = require('http');
const app = require('./app');

app.set('port', ({}).PORT || 3002);

const server = http.createServer(app);

server.listen(({}).PORT || 3000);