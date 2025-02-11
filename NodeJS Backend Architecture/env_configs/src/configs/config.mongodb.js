"use strict";

const dev = {
  app: {
    post: process.env.DEV_APP_POST || 3052,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "dev_db",
  },
};

const pro = {
  app: {
    post: process.env.PRO_APP_POST || 3052,
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || "pro_db",
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";
export default config[env];
