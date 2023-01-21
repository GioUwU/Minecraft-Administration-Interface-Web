const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const history = sequelize.define("history", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    faction: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "No faction",
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    strike: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    modalidad: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "HCF",
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "temporal",
    },
    staffnickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    proofs: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    check: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
