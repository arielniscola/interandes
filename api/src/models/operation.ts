import { DataTypes, Model, Sequelize } from "sequelize";

export interface IOperation {
  id?: string;
  operationNumber: number;
  date: Date;
  typeOperation: string;
  deleted: boolean;
}

export class Operation extends Model<IOperation> {
  public id?: string;
  public operationNumber: number;
  public date: Date;
  public typeOperation: string;
  public deleted: boolean;
}

export function initOperation(sequelize: Sequelize): void {
  Operation.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      operationNumber: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
      },
      typeOperation: {
        type: DataTypes.STRING,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Operation",
    }
  );
}
