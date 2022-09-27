import { Sequelize } from "sequelize";

const sequelize = new Sequelize("KillerBeeDB", "sa", "04e2b2ce80", {
  dialect: "mssql",
});

sequelize.sync();

async function testDB() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connextion to KillerBeeDB has been estaclished successfully !"
    );
  } catch (error) {
    console.log("Unable to connect to the database : ", error);
  }
}

module.exports = sequelize;
