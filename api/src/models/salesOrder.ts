import { DataTypes, Model, Sequelize } from "sequelize";

interface ISalesOrder {
  id?: string;
  merchandise: string;
  originOfCharge: string;
  finalDestination: string;
  chargeLocation: string;
  chargeDate: Date;
  dischargeDate: Date;
  invoicePO: string;
  customsBroker: string;
  transportation: string;
  shippingLine: string;
  booking: string;
  vessel: string;
  voyage: string;
  flag: string;
  physicalCutOffDate: Date;
  documentaryCutOffDate: Date;
  transshipment: string;
  maritimeATA: string;
  blcrtGuiNumber: string;
  loadingPortDepartureDate: Date;
  dischargePortArrivalDate: Date;
  landedATA: string;
  hasHBL: string;
  hblNumber: string;
  containerStruk: number;
  chargeLCL: boolean;
  unity: string;
  weigth: number;
  volumen: string;
  poRef: string;
  brand: string;
}

export class SalesOrder extends Model<ISalesOrder> {
  public id?: string;
  public merchandise: string;
  public originOfCharge: string;
  public finalDestination: string;
  public chargeLocation: string;
  public chargeDate: Date;
  public dischargeDate: Date;
  public invoicePO: string;
  public customsBroker: string;
  public transportation: string;
  public shippingLine: string;
  public booking: string;
  public vessel: string;
  public voyage: string;
  public flag: string;
  public physicalCutOffDate: Date;
  public documentaryCutOffDate: Date;
  public transshipment: string;
  public maritimeATA: string;
  public blcrtGuiNumber: string;
  public loadingPortDepartureDate: Date;
  public dischargePortArrivalDate: Date;
  public landedATA: string;
  public hasHBL: string;
  public hblNumber: string;
  public containerStruk: number;
  public chargeLCL: boolean;
  public unity: string;
  public weigth: number;
  public volumen: string;
  public poRef: string;
  public brand: string;
}

export function initSalesOrderModel(sequelize: Sequelize): void {
  SalesOrder.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      merchandise: {
        type: DataTypes.STRING,
      },
      originOfCharge: {
        type: DataTypes.STRING,
      },
      finalDestination: {
        type: DataTypes.STRING,
      },
      chargeLocation: {
        type: DataTypes.STRING,
      },
      chargeDate: {
        type: DataTypes.DATE,
      },
      dischargeDate: {
        type: DataTypes.STRING,
      },
      invoicePO: {
        type: DataTypes.STRING,
      },
      customsBroker: {
        type: DataTypes.STRING,
      },
      transportation: {
        type: DataTypes.STRING,
      },
      shippingLine: {
        type: DataTypes.STRING,
      },
      booking: {
        type: DataTypes.STRING,
      },
      vessel: {
        type: DataTypes.STRING,
      },
      voyage: {
        type: DataTypes.STRING,
      },
      flag: {
        type: DataTypes.STRING,
      },
      physicalCutOffDate: {
        type: DataTypes.DATE,
      },
      documentaryCutOffDate: {
        type: DataTypes.DATE,
      },
      transshipment: {
        type: DataTypes.STRING,
      },
      maritimeATA: {
        type: DataTypes.STRING,
      },
      blcrtGuiNumber: {
        type: DataTypes.STRING,
      },
      loadingPortDepartureDate: {
        type: DataTypes.DATE,
      },
      dischargePortArrivalDate: {
        type: DataTypes.DATE,
      },
      landedATA: {
        type: DataTypes.STRING,
      },
      hasHBL: {
        type: DataTypes.STRING,
      },
      hblNumber: {
        type: DataTypes.STRING,
      },
      containerStruk: {
        type: DataTypes.INTEGER,
      },
      chargeLCL: {
        type: DataTypes.BOOLEAN,
      },
      brand: {
        type: DataTypes.STRING,
      },
      unity: {
        type: DataTypes.STRING,
      },
      volumen: {
        type: DataTypes.INTEGER,
      },
      weigth: {
        type: DataTypes.INTEGER,
      },
      poRef: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "SalesOrder",
    }
  );
}
