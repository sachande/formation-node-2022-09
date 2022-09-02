import http from "node:http";
import { app } from "./src/app.js";
import { initWebsocket } from "./src/websocket.js";

export const server = http.createServer(app);

initWebsocket(server);
