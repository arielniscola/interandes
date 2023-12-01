import { DataTypes, Model, Sequelize } from "sequelize";
import { ITask } from "./task";

interface ITypeOperation {
  id?: string;
  code: string;
  tasks: ITask[];
}

export class TypeOperation extends Model<ITypeOperation> {
  public id?: string;
  public code: string;
  public tasks: ITask[];
}

export function initTypeOperationModel(sequelize: Sequelize): void {
  TypeOperation.init(
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
        allowNull: false,
        unique: true,
      },
      tasks: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
    },
    {
      sequelize,
      modelName: "TypeOperation",
    }
  );
}
