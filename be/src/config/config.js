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
    timezone: "+07:00",
  },
  testnet: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: process.env.PORT_DB,
    dialect: "mysql",
    logging: false,
    timezone: "+07:00",
  },
  test: {
    username: "root",
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.HOST,
    port: process.env.PORT_DB,
    logging: false,
    dialect: "mysql",
    timezone: "+07:00",
  },
  production: {
    username: "root",
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.HOST,
    port: process.env.PORT_DB,
    dialect: "mysql",
    logging: false,
    timezone: "+07:00",
  },
};
