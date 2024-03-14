import { DataTypes, Model, Sequelize } from "sequelize";

export interface IPricing {
  id?: string;
  pricingnumber: string;
  companyname: string;
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
  operation_id?: string;
  client_id?: string;
  qty: number;
  saleTerm: string;
  origin: string;
  customDestiny: string;
  finalDestiny: string;
  estimateTransitTime: string;
  transshipment: string;
}

export class Pricing extends Model<IPricing> {
  public id?: string;
  public pricingnumber: string;
  public companyname: string;
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
  public qty: number;
  public saleTerm: string;
  public origin: string;
  public customDestiny: string;
  public finalDestiny: string;
  public estimateTransitTime: string;
  public transshipment: string;
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
      qty: {
        type: DataTypes.INTEGER,
      },
      transshipment: {
        type: DataTypes.STRING,
      },
      finalDestiny: {
        type: DataTypes.STRING,
      },
      customDestiny: {
        type: DataTypes.STRING,
      },
      estimateTransitTime: {
        type: DataTypes.STRING,
      },
      origin: {
        type: DataTypes.STRING,
      },
      saleTerm: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Pricing",
    }
  );
}
