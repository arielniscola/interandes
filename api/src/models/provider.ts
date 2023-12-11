import { Sequelize, Model, DataTypes } from "sequelize";

export interface IProvider {
  id?: string;
  businessName: string;
  address: string;
  contactPerson: string;
  email: string;
  type: string;
  cbu: string;
  accountBank: string;
  files: string[];
}

export class Provider extends Model<IProvider> {
  public id?: string;
  public businessName: string;
  public address: string;
  public contactPerson: string;
  public email: string;
  public type: string;
  public cbu: string;
  public accountBank: string;
  public files: string[];
}

export function initProvider(sequelize: Sequelize): void {
  Provider.init(
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactPerson: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      cbu: {
        type: DataTypes.STRING,
      },
      accountBank: {
        type: DataTypes.STRING,
      },
      files: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      sequelize,
      modelName: "Provider",
    }
  );
}
