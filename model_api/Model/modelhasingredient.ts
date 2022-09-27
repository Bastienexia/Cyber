//@ts-ignore
const { Sequelize, DataTypes } = require("sequelize");
//@ts-ignore
const sequelize = require("../Database");

const ModelHasIngredient = sequelize.define("ModelHasIngredient", {
  IdGrammage: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  grammage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IdIngredient: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  IdModel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ModelHasIngredient;
