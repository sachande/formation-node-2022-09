import { Emitter } from "@socket.io/redis-emitter";
import { Worker } from "bullmq";
import { fibonacci } from "../src/fibonacci.js";
import { client as redisClient } from "../src/redis-client.js";

const ioEmitter = new Emitter(redisClient);

new Worker(
  "Fibo",
  (job) => {
    const { n, author = "anonymous" } = job.data;
    const result = fibonacci(job.data.n);
    ioEmitter.emit("received-message", {
      text: `fibo(${n}) = ${result}`,
      date: Date.now(),
      author,
    });
  },
  {
    connection: redisClient.duplicate({
      maxRetriesPerRequest: null,
    }),
  }
);
