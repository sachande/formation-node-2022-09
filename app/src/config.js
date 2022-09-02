import { config as loadDotEnv } from "dotenv";

// Alternative: no dotenv and use direnv or other
loadDotEnv();

const config = {
  port: process.env.PORT,
  redis: process.env.REDIS,
  jwt_key: process.env.JWT_KEY,
};

// TODO validate config (zod?)

export default config;
