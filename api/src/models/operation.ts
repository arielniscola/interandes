import { DataTypes, Model, Sequelize } from "sequelize";

export interface IOperation {
  id?: string;
  operationNumber: number;
  date: Date;
  typeOperation: string;
}

export class Operation extends Model<IOperation> {
  public id?: string;
  public operationNumber: number;
  public date: Date;
  public typeOperation: string;
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
    },
    {
      sequelize,
      modelName: "Operation",
    }
  );
}
