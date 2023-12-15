import { DataTypes, Model, Sequelize } from "sequelize";

interface IRole {
  id?: string;
  code: string;
  description: string;
  permission: [];
}

class Role extends Model<IRole> {
  public id?: string;
  public code: string;
  public permission: [];
  public description: string;
}

export function initRoleModel(sequelize: Sequelize): void {
  Role.init(
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
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      permission: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
}

export { Role };
