import { DataTypes, Model, Sequelize } from "sequelize";

export interface ITask {
  id?: string;
  description: string;
}

export class Task extends Model<ITask> {
  public id?: string;
  public description: string;
}

export function initTaskModel(sequelize: Sequelize): void {
  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Task",
      timestamps: false
    }
  );
}
