import { DataTypes, Model, Sequelize } from "sequelize";

export interface ICompany {
  id?: string;
  companyname: string;
  logo: string;
}

export class Company extends Model<ICompany> {
  public id?: string;
  public companyname: string;
  public logo: string;
}

export function initCompanyModel(sequelize: Sequelize): void {
  Company.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      companyname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
}
