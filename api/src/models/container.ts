import { Model, Sequelize, DataTypes } from "sequelize";

export interface IContainer {
  id?: string;
  containerNumber: string;
  ptoLinea: string;
  ptoAduana: string;
  otherSeals: string;
  poRef: string;
  driver: string;
  dni: string;
  truckPlate: string;
  semiPlate: string;
  containerType: string;
  hasTemp: boolean;
  temperature?: number;
  ventilation?: string;
  humidity?: number;
}

export class Container extends Model<IContainer> {
  public id?: string;
  public containerNumber: string;
  public ptoLinea: string;
  public ptoAduana: string;
  public otherSeals: string;
  public poRef: string;
  public driver: string;
  public dni: string;
  public truckPlate: string;
  public semiPlate: string;
  public containerType: string;
  public hasTemp: boolean;
  public temperature?: number;
  public ventilation?: string;
  public humidity?: number;
}

export function initContainerModel(sequelize: Sequelize): void {
  Container.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      containerNumber: {
        type: DataTypes.STRING,
      },
      ptoLinea: {
        type: DataTypes.STRING,
      },
      ptoAduana: {
        type: DataTypes.STRING,
      },
      otherSeals: {
        type: DataTypes.STRING,
      },
      poRef: {
        type: DataTypes.STRING,
      },
      driver: {
        type: DataTypes.STRING,
      },
      dni: {
        type: DataTypes.STRING,
      },
      truckPlate: {
        type: DataTypes.STRING,
      },
      semiPlate: {
        type: DataTypes.STRING,
      },
      hasTemp: {
        type: DataTypes.STRING,
      },
      temperature: {
        type: DataTypes.INTEGER,
      },
      humidity: {
        type: DataTypes.INTEGER,
      },
      ventilation: {
        type: DataTypes.STRING,
      },
      containerType: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Container",
    }
  );
}
