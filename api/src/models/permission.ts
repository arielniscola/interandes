import { DataTypes, Model, Sequelize } from "sequelize";

interface IPermission {
  id?: string;
  url: string;
}

class Permission extends Model<IPermission> {
  public id?: string;
  public url: string;
}

export function initPermissionModel(sequelize: Sequelize): void {
  Permission.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
}

export { Permission };
