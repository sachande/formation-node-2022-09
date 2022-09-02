import { config } from "dotenv";
import { Server } from "socket.io";

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

  io.on("connection", (client) => {
    // receive message: client.on(event, (...args) => )
    // to client: client.emit(event, ...args)
    // broadcast to everyone: io.emit(event, ...args)
    // broadcast to everyone except client: socket.broadcast.emit(...)

    // join room: client.join('room')
    // leave room: client.leave('room')
    // broadcast to room: io.to('room').to('room 2')...emit(...)
    // broadcast to room except client: socket.to('...').emit

    client.on("toto", (n) => {
      console.log("recv toto", n);
    });

    client.emit("tata", 42, true);
  });
};
