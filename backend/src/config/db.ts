import { Sequelize } from "sequelize";
// import { config } from "./config";


// const sequelize = new Sequelize({
//     database: config.DB_NAME,
//     username: config.DB_USER,
//     password: config.DB_PASSWORD,
//     host: config.DB_HOST,
//     dialect: "mysql",
//     port: Number(config.DB_PORT),
//   });

//   console.log('Database Config:', {
//     database: process.env.DB_NAME,
//     username: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT
//   });

const sequelize = new Sequelize('portfolio_tracker', 'root', 'bhuppi', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

export default sequelize;
