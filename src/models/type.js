"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      Type.hasMany(models.Expense, {
        foreignKey: "typeId",
        onDelete: "SET NULL",
      });
    }
  }
  Type.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      typeName: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Type",
      tableName: "types",
      timestamps: false,
    }
  );
  return Type;
};
