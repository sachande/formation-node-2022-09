import cluster from "node:cluster";
import { cpus } from "node:os";

if (cluster.isPrimary) {
  console.log(`Workers primary ${process.pid} started`);
  const numCPUs = cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  console.log(`Workers secondary ${process.pid} started`);
  await import("./fibo-worker.js");
}
