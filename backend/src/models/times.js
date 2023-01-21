const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const times = sequelize.define("times", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sanction: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    });
};

