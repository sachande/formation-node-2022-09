import http from "node:http";
import { app } from "./src/app.js";
import config from "./src/config.js";
import { initWebsocket } from "./src/websocket.js";

export const server = http.createServer(app);

initWebsocket(server);

server.listen(config.port, () => {
  const port = server.address().port;
  // eslint-disable-next-line no-console
  console.log(`Server ready http://localhost:${port}`);
});
