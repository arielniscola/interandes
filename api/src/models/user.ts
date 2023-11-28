import { DataTypes, Model, Sequelize } from "sequelize";

interface IUser {
  id?: string;
  company: string;
  username: string;
  mailaddress: string;
  phonenumber: string;
  password: string;
  isActive: boolean;
  role: string;
  deleted: boolean;
}

export class User extends Model<IUser> {
  public id?: string;
  public company: string;
  public username: string;
  public mailaddress: string;
  public phonenumber: string;
  public password: string;
  public isActive: boolean;
  public role: string;
  public deleted: boolean;
}

export function initUserModel(sequelize: Sequelize): void {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
      },
      mailaddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phonenumber: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "client",
        validate: {
          customValidator: (value: string) => {
            const enums = [
              "client",
              "admin",
              "custumer",
              "saleslead",
              "operator",
            ];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
}
