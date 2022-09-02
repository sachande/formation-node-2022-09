import { app } from "./src/app.js";
import http from "node:http";

const server = http.createServer(app);

server.listen(3000, () => {
  const port = server.address().port;
  console.log(`Server ready http://localhost:${port}`);
});
