import { DataTypes, Model, Sequelize } from "sequelize";

interface IDetail {
  id?: string;
  currency: string;
  item: string;
  typeItem: string;
  base?: number;
  units?: number;
  price: number;
  subtotal: number;
  unitType?: string;
  pricingId?: string;
}

class Detail extends Model<IDetail> {
  id?: string;
  currency: string;
  item: string;
  typeItem: string;
  base?: number;
  units?: number;
  price: number;
  subtotal: number;
  unitType?: string;
  pricingId?: string;
}

export function initDetailModel(sequelize: Sequelize): void {
  Detail.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      currency: {
        type: DataTypes.STRING,
      },
      item: {
        type: DataTypes.STRING(100),
      },
      typeItem: {
        type: DataTypes.STRING,
      },
      base: {
        type: DataTypes.INTEGER,
      },
      units: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      subtotal: {
        type: DataTypes.FLOAT,
      },
      unitType: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Detail",
      timestamps: true,
    }
  );
}

export { Detail };
