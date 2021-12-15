const http = require("http");

const hostname = "127.0.0.1"; // localhost
const port = 3000;

const server = http.createServer(requestHandler);

function requestHandler(req, res) {
  console.log(req);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("hello world!");
  res.end();
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
