import { createServer } from "./utils/createServer";
require("dotenv").config();

const server = createServer();

let port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log("listening on port: " + port);
});
