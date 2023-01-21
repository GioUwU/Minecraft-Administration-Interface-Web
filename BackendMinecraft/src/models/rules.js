const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const rules = sequelize.define("rules", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }, 
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    });
};


    