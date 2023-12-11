import { DataTypes, Sequelize, Model } from "sequelize";

export interface IConfigs {
  id?: string;
  parameter: string;
  value: string;
}

export class Configs extends Model<IConfigs> {
  public id: string;
  public parameter: string;
  public value: string;
}

export function initConfigsModel(sequelize: Sequelize): void {
  Configs.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      parameter: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Configs",
    }
  );
}
