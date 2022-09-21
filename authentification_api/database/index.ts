import { Sequelize } from "sequelize";

const sequelize = new Sequelize("cyberuser", "sa", "04e2b2ce80", {
  dialect: "mssql",
});

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
