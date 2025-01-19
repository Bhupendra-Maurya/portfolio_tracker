import { config as conf } from "dotenv";

conf();

const _config = {
  SERVER_PORT: process.env.SERVER_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
};

export const config = Object.freeze(_config);
