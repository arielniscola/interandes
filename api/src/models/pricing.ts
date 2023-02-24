import { DataTypes } from "sequelize";

export = (sequelize: any) => {
  sequelize.define("Pricing", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    companyname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeServices: {
      type: DataTypes.STRING,
    },
    revalidate: {
      type: DataTypes.BOOLEAN,
    },
    language: {
      type: DataTypes.STRING,
    },
  });
};
