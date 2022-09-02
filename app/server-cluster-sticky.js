import stickyCluster from "sticky-cluster";
import { server } from "./server.js";
import config from "./src/config.js";

stickyCluster((cb) => cb(server), {
  port: config.port,
  debug: true,
});
