import { DataTypes, Model, Sequelize } from "sequelize";

interface IPricing {
  id?: string;
  pricingnumber: string;
  companyname: string;
  typeServices: string;
  revalidate: Date;
  language?: string;
  effectiveDate: Date;
  deleted?: boolean;
  observations: string;
  conditions: string;
  operationType: string;
  stage: string;
  totalCost: number;
  totalSale: number;
  totalTax: number;
  profit: number;
  totalCostEu: number;
  totalSaleEu: number;
  totalTaxEu: number;
  profitEu: number;
  totalCostDol: number;
  totalSaleDol: number;
  totalTaxDol: number;
  profitDol: number;
}

class Pricing extends Model<IPricing> {
  public id?: string;
  public pricingnumber: string;
  public companyname: string;
  public typeServices: string;
  public revalidate: Date;
  public language?: string;
  public effectiveDate: Date;
  public deleted?: boolean;
  public observations: string;
  public conditions: string;
  public operationType: string;
  public stage: string;
  public totalCost: number;
  public totalSale: number;
  public totalTax: number;
  public profit: number;
  public totalCostEu: number;
  public totalSaleEu: number;
  public totalTaxEu: number;
  public profitEu: number;
  public totalCostDol: number;
  public totalSaleDol: number;
  public totalTaxDol: number;
  public profitDol: number;
}

export function initPricingModel(sequelize: Sequelize): void {
  Pricing.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      pricingnumber: {
        type: DataTypes.STRING,
      },
      companyname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeServices: {
        type: DataTypes.STRING,
      },
      revalidate: {
        type: DataTypes.DATE,
      },
      language: {
        type: DataTypes.STRING,
      },
      effectiveDate: {
        type: DataTypes.DATE,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      observations: {
        type: DataTypes.STRING(500),
      },
      conditions: {
        type: DataTypes.STRING(500),
      },
      operationType: {
        type: DataTypes.STRING,
      },
      stage: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      totalCost: {
        type: DataTypes.FLOAT,
      },
      totalSale: {
        type: DataTypes.FLOAT,
      },
      totalTax: {
        type: DataTypes.FLOAT,
      },
      profit: {
        type: DataTypes.FLOAT,
      },
      totalCostEu: {
        type: DataTypes.FLOAT,
      },
      totalSaleEu: {
        type: DataTypes.FLOAT,
      },
      totalTaxEu: {
        type: DataTypes.FLOAT,
      },
      profitEu: {
        type: DataTypes.FLOAT,
      },
      totalCostDol: {
        type: DataTypes.FLOAT,
      },
      totalSaleDol: {
        type: DataTypes.FLOAT,
      },
      totalTaxDol: {
        type: DataTypes.FLOAT,
      },
      profitDol: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "Pricing",
    }
  );
}

export { Pricing };
