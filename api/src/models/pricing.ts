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
    pricingnumber: {
      type: DataTypes.INTEGER,
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
    effectiveDate: {
      type: DataTypes.DATE,
    },
    validate: {
      type: DataTypes.DATE,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    observations: {
      type: DataTypes.STRING(500),
    },
    conditions: {
      type: DataTypes.STRING(500),
    },
    operationType: {
      type: DataTypes.STRING,
    },
    stage: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    totalCost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalSale: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalTax: {
      type: DataTypes.FLOAT,
    },
    profit: {
      type: DataTypes.FLOAT,
    },
  });
};
