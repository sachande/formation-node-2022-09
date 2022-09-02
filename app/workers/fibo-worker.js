import { Emitter } from "@socket.io/redis-emitter";
import { Worker } from "bullmq";
import { fibonacci } from "../src/fibonacci.js";
import redisCache from "../src/redis-cache.js";
import { client as redisClient } from "../src/redis-client.js";

const ioEmitter = new Emitter(redisClient);

/*

is it cached ?
  yes
  no but here is your lock
  no but here is expired data

W1: fibo(42)
  is it cached ? no but here is your lock
    if get lock ? here is your lock
      compute
        write cache
        unlock finally
W2: fibo(42)
  is it cached ? no
    if get lock ? nope
    wait for cache… // or get from expired cache
      get from cache

*/

new Worker(
  "Fibo",
  async (job) => {
    const { n, author = "anonymous" } = job.data;

    // const key = "fibo:" + n;
    // let result = await redisCache.getOrCompute(key, () => {
    //   return fibonacci(job.data.n);
    // });

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
