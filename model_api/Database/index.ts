import { Sequelize } from "sequelize";

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DBName || "KillerBeeDB",
  process.env.DBLogin || "sa",
  process.env.DBPassword || "04e2b2ce80",
  {
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
