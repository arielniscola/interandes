import { DataTypes, Model, Sequelize } from "sequelize";

export interface ITasksList {
  id?: string;
  code: string;
  taks: { task: string; done: boolean }[];
}

export class TaskList extends Model<ITasksList> {
  public id?: string;
  public code: string;
  public task: { task: string; done: boolean }[];
}

export function initTaskListModel(sequelize: Sequelize): void {
  TaskList.init(
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
      },
      taks: {
        type: DataTypes.ARRAY,
      },
    },
    {
      sequelize,
      modelName: "TaskList",
    }
  );
}
