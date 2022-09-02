import Redis from "ioredis";
import config from "./config";

export const client = new Redis(config.redis);
