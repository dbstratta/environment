const http = require('http');

const env = require('./env');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello World\n');
  res.end();
});

server.listen(env.port, env.host, () => {
  console.log(`🚀 server listening on host ${env.host} and port ${env.port}`);
});
