import cluster from "node:cluster";
import { cpus } from "node:os";
import config from "./src/config.js";

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} started`);
  const numCPUs = cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  console.log(`Worker ${process.pid} started`);
  const { server } = await import("./server.js");
  server.listen(config.port, () => {
    const port = server.address().port;
    // eslint-disable-next-line no-console
    console.log(`Server ready http://localhost:${port}`);
  });
}
