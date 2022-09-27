const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Please enter a valid email.",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessDeniedCount: {
    type: DataTypes.INTEGER,
    default: 0,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    default: true,
  },
});

module.exports = User;
