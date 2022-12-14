//@ts-ignore
const { Sequelize, DataTypes } = require("sequelize");
//@ts-ignore
const sequelize = require("../Database");

const Model = sequelize.define("Model", {
  IdModel: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
  },
  puht: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Gamme: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Model;
