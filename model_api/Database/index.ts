import { Sequelize } from "sequelize";

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DBName || "",
  process.env.DBLogin || "",
  process.env.DBPassword || "",
  {
    host: process.env.Host,
    dialect: "mssql",
  }
);

sequelize.sync();

async function testDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database established !");
  } catch (error) {
    console.log("Unable to connect to the database : ", error);
  }
}

module.exports = sequelize;
