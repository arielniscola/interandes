import { DataTypes, Model, Sequelize } from "sequelize";

interface INotification {
  id?: string;
  message: string;
  read: string;
  dateGenerated: [];
}

class Notification extends Model<INotification> {
  public id?: string;
  public message: string;
  public read: [];
  public dateGenerated: string;
}

export function initNotificationModel(sequelize: Sequelize): void {
  Notification.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      message: {
        type: DataTypes.STRING,
      },
      read: {
        type: DataTypes.BOOLEAN,
      },
      dateGenerated: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
}

export { Notification };
