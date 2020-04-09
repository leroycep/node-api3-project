// code away!
const server = require("./server.js");
const port = process.env.PORT || 47348;

server.listen(port, () =>
  console.log(` == server listening on port ${port} == `)
);
