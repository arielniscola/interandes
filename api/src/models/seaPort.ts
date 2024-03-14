import { Sequelize, Model, DataTypes } from "sequelize";

export interface ISeaPort {
  id?: string;
  code: string;
  portName: string;
  country: string;
}

export class SeaPort extends Model<ISeaPort> {
  public id?: string;
  public code: string;
  public portName: string;
  public country: string;
}

export function initSeaPort(sequelize: Sequelize): void {
  SeaPort.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      code: {
        type: DataTypes.STRING,
      },
      portName: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "SeaPort",
    }
  );
}
