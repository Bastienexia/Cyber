const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Database");

const Procede = sequelize.define("procede", {
  IdProcede: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tests: {
    type: DataTypes.STRING,
  },
  IdModel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Procede;
