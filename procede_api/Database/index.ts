import { Sequelize } from "sequelize";

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DBName || "KillerBeeDB",
  process.env.DBLogin || "sa",
  process.env.DBPassword || "04e2b2ce80",
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
