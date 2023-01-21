const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const users = sequelize.define("users", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("op", "owner", "minor", "high"),
        defaultValue: "minor",
      },
      earnings: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      },
    });
  
};