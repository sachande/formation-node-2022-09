// require('dotenv').config()

import { config as loadDotEnv } from "dotenv";

// Alternative: no dotenv and use direnv or other
loadDotEnv({ debug: process.env.DEBUG });

const config = {
  port: process.env.PORT,
  redis: process.env.REDIS,
  jwt_key: process.env.JWT_KEY,
  env: process.env.NODE_ENV,
  public_dir: process.env.PUBLIC_DIR,
};

// TODO validate config (zod?)

export default config;
