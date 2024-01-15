require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: process.env.PORT_DB,
    dialect: "mysql",
    logging: false,
    raw: true,
    timezone: "+07:00",
    query: {
      raw: true,
    },
  },
  testnet: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: process.env.PORT_DB,
    dialect: "mysql",
    logging: false,
    raw: true,
    timezone: "+07:00",
    query: {
      raw: true,
    },
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: "mysql",
  },
};
