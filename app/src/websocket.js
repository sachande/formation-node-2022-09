import { createAdapter } from "@socket.io/redis-adapter";
import { config } from "dotenv";
import { Server } from "socket.io";
import { verifyToken } from "./token.js";
import { client as redisClient } from "./redis-client.js";
import { Queue } from "bullmq";

const FiboQueue = new Queue("Fibo", {
  connection: redisClient.duplicate(),
});

export const initWebsocket = async (server) => {
  /* commonjs & optional deps
  const options = {...}
  try {
    const eiows = require('eiows')
    options.wsEngine = eiows.Server
  } catch {
  }
  */

  const options = {
    serveClient: config.env !== "production",
  };

  try {
    const eiows = await import("eiows");
    options.wsEngine = eiows.default.Server;
  } catch {
    // eslint-disable-next-line no-console
    console.error("eiows not installed");
  }

  const io = new Server(server, options);

  // Use adapter to make broadcast & rooms & socket.data + fetchSockets() work accross cluster
  const pubClient = redisClient;
  const subClient = redisClient.duplicate();
  const adapter = createAdapter(pubClient, subClient);
  io.adapter(adapter);

  io.on("connection", (client) => {
    console.log("socket connected", process.pid);

    // receive message: client.on(event, (...args) => )
    // to client: client.emit(event, ...args)
    // broadcast to everyone: io.emit(event, ...args)
    // broadcast to everyone except client: socket.broadcast.emit(...)

    // join room: client.join('room')
    // leave room: client.leave('room')
    // broadcast to room: io.to('room').to('room 2')...emit(...)
    // broadcast to room except client: socket.to('...').emit

    // TODO send existing messages on connect
    client.use((eventInfo, next) => {
      const { token } = client.handshake.auth;
      const { username } = verifyToken(token);
      if (username) {
        client.username = username;
        return next();
      }
      next(new Error("Unauthorized"));
    });

    client.on("error", (err) => {
      if (err.message === "Unauthorized") {
        client.emit("unauthorized");
      }
    });

    client.on("new-message", (text) => {
      const date = Date.now();
      const author = client.username;

      // TODO store messages
      if (text.startsWith("fibo ")) {
        console.log(`received fibo on worker ${process.pid}`);
        const n = Number(text.substring(5));
        FiboQueue.add(`fibo(${n})`, { n, author });
        return;
      }

      io.emit("received-message", { text, date, author });
    });
  });
};
