import { DataTypes, Model, Sequelize } from "sequelize";

export interface IConsignee {
  id?: string;
  businessName: string;
  contact: string;
  address: string;
  email: string;
  phone: string;
  taxID: string;
  notify: boolean;
}

export class Consignee extends Model<IConsignee> {
  public id?: string;
  public businessName: string;
  public contact: string;
  public address: string;
  public email: string;
  public phone: string;
  public taxID: string;
  public notify: boolean;
}

export function initConsignee(sequelize: Sequelize): void {
  Consignee.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      businessName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taxID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notify: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Consignee",
      timestamps: false,
    }
  );
}
