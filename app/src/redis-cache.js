import { client } from "./redis-client.js";
import { promisify } from "util";

const sleep = promisify(setTimeout);

const stale = 3600000;

const get = async (key) => {
  const result = await client.get("cache:" + key); // null or value
  return result;
};

const set = async (key, value, ttl = 600000) => {
  await client.set("cache:" + key, value, "PX", ttl + stale);
};

const acquireLock = async (key, timeout = 60000) => {
  const acquired = await client.setnx("lock:" + key, "");
  if (acquired) {
    await client.pexpire("lock:" + key, timeout);
    return true;
  }
  return false;
};

const releaseLock = async (key) => {
  const acquired = await client.setnx("lock:" + key, "");
  return !!acquired;
};

// TODO PUB/SUB to notify cache updates
const waitForCache = async (key) => {
  const ttl = await client.ttl("cache:" + key);
  if (ttl >= stale) {
    // available
    return get(key);
  }
  await sleep(100);
  return await waitForCache(key);
};

const getOrCompute = async (key, fn) => {
  const ttl = await client.ttl("cache:" + key);

  if (ttl >= stale) {
    // available
    return get(key);
  }

  // try to acquire a lock
  const acquired = await acquireLock(key);
  if (!acquired && ttl < 0) {
    return waitForCache(key); // TODO
  }

  if (!acquired) {
    // return expired data
    return get(key);
  }

  // acquired lock: let's compute
  try {
    const result = await fn();
    await set(key, result);
    return result;
  } finally {
    releaseLock(key);
  }
};

const redisCache = { get, set, acquireLock, releaseLock, getOrCompute };

export default redisCache;
