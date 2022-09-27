const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Database");

const ingredient = sequelize.define("ingredient", {
  Idingredient: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  NomIngredient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ingredient;
