import { Queue } from "bullmq";
import config from "./src/config.js";

const n = Number(process.argv[2]);

const FiboQueue = new Queue("Fibo", { connection: config.redis });

await FiboQueue.add(`fibo(${n})`, { n });

process.exit(0);
