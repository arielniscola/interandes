import { DataTypes } from "sequelize";

export = (sequelize: any) => {
  sequelize.define("Client", {
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
    direction: {
      type: DataTypes.STRING,
    },
    taxID: {
      type: DataTypes.STRING,
    },
    contactperson: {
      type: DataTypes.STRING,
    },
    mailaddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
