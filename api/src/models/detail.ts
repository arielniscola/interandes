import { DataTypes } from "sequelize";

export = (sequelize: any) => {
  sequelize.define(
    "Details",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      currency: {
        type: DataTypes.STRING,
      },
      item: {
        type: DataTypes.STRING(100),
      },
      typeItem: {
        type: DataTypes.STRING,
      },
      base: {
        type: DataTypes.INTEGER,
      },
      units: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      subtotal: {
        type: DataTypes.FLOAT,
      },
      unitType: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
