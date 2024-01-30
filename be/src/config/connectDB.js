const { Sequelize } = require("sequelize");
require("dotenv").config();
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  "root",
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    port: process.env.PORT_DB,
    logging: false,
  }
);

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect MYSQL has been successful");
  } catch (err) {
    console.error("Error connecting: " + err);
  }
};

module.exports = connectDB;
