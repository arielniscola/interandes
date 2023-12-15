import { DataTypes, Model, Sequelize } from "sequelize";

export interface IClient {
  id?: string;
  companyname: string;
  direction: string;
  taxID: string;
  contactperson: string;
  mailaddress: string;
  phonenumber: string;
  category: string;
  isDeleted: boolean;
}

class Client extends Model<IClient> {
  public id?: string;
  public companyname: string;
  public direction: string;
  public taxID: string;
  public contactperson: string;
  public mailaddress: string;
  public phonenumber: string;
  public category: string;
  public isDeleted: boolean;
}

export function initClientModel(sequelize: Sequelize): void {
  Client.init(
    {
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
    },
    {
      sequelize,
      modelName: "Client",
    }
  );
}

export { Client };
