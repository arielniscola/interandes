import { Sequelize } from "sequelize";
import * as pg from "pg";
import { Pricing, initPricingModel } from "./models/pricing";
import { Client, initClientModel } from "./models/client";
import { User, initUserModel } from "./models/user";
import { Detail, initDetailModel } from "./models/detail";
import { FileStructure, initFileStructureModel } from "./models/fileStructure";
import { SalesOrder, initSalesOrderModel } from "./models/salesOrder";
import { Container, initContainerModel } from "./models/container";
import { Consignee, initConsignee } from "./models/consignee";
import { Operation, initOperation } from "./models/operation";
import {
  HistoryOperation,
  initHistoryOperation,
} from "./models/historyOperation";
import { TaskList, initTaskListModel } from "./models/workList";
import { initTaskModel } from "./models/task";
import { initTypeOperationModel } from "./models/typeOperation";
import { initProvider } from "./models/provider";
import { initCompanyModel } from "./models/company";

const DB_USER = "postgres";
const DB_PASSWORD = "1234";
const DB_HOST = "localhost:5432";

export const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/interandes`,
  {
    logging: false,
    native: false,
    dialectModule: pg,
  }
);

/** Inicializar modelos */

initPricingModel(sequelize);
initClientModel(sequelize);
initUserModel(sequelize);
initDetailModel(sequelize);
initFileStructureModel(sequelize);
initSalesOrderModel(sequelize);
initContainerModel(sequelize);
initConsignee(sequelize);
initOperation(sequelize);
initHistoryOperation(sequelize);
initTaskListModel(sequelize);
initTaskModel(sequelize);
initTypeOperationModel(sequelize);
initProvider(sequelize);
initCompanyModel(sequelize);

/** Pricing relationships */
Pricing.belongsTo(Client, { foreignKey: "client_id" });
Client.hasMany(Pricing, { foreignKey: "client_id" });
Client.hasMany(SalesOrder, { foreignKey: "client_id" });
Pricing.belongsTo(User, { foreignKey: "user_id" });
Pricing.hasMany(Detail, { foreignKey: "pricing_id" });
Detail.belongsTo(Pricing, { foreignKey: "pricing_id" });

/** Sales Order relationships */
SalesOrder.hasMany(Container, { foreignKey: "salesOrder_id" });
Container.belongsTo(SalesOrder, { foreignKey: "salesOrder_id" });
SalesOrder.belongsTo(Client, { foreignKey: "client_id" });
SalesOrder.belongsTo(User, { foreignKey: "user_id" });
SalesOrder.hasMany(Consignee, { foreignKey: "salesOrder_id" });
Consignee.belongsTo(SalesOrder, { foreignKey: "salesOrder_id" });

/** Operation relationships */
Operation.hasOne(FileStructure, { foreignKey: "operation_id" });
FileStructure.belongsTo(Operation, { foreignKey: "operation_id" });
Operation.hasMany(HistoryOperation, { foreignKey: "operation_id" });
Operation.hasOne(Pricing, { foreignKey: "operation_id" });
Pricing.belongsTo(Operation);
Operation.hasOne(SalesOrder, { foreignKey: "operation_id" });
HistoryOperation.belongsTo(Operation, { foreignKey: "operation_id" });
Operation.hasOne(TaskList, { foreignKey: "operation_id" });
TaskList.belongsTo(Operation, { foreignKey: "operation_id" });

/** Provider */
