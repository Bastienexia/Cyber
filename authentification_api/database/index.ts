import { Sequelize } from "sequelize";
require("dotenv").config();

const Database = {
  DBName: process.env.DBName,
  DBLogin: process.env.DBLogin,
  DBPassword: process.env.DBPassword,
};

const sequelize = new Sequelize(
  Database.DBName || "",
  Database.DBLogin || "",
  Database.DBPassword || "",
  {
    host: process.env.Host,
    dialect: "mssql",
  }
);

sequelize.sync();

async function testDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the Database : ", error);
  }
}

module.exports = sequelize;
