// code away!
const server = require("./server.js");
const port = 47348;

server.listen(port, () =>
  console.log(` == server listening on port ${port} == `)
);
