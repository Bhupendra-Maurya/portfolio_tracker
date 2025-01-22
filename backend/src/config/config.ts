import dotenv from "dotenv";
dotenv.config();

export const config = {
  DB_HOST: process.env.DB_HOST ,
  DB_USER: process.env.DB_USER ,
  DB_PASSWORD: process.env.DB_PASSWORD ,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET ,
  ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY ,
  SERVER_PORT: process.env.SERVER_PORT ,
};
