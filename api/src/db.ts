import { Sequelize } from "sequelize";
import * as pg from "pg";
import { Pricing, initPricingModel } from "./models/pricing";
import { Client, initClientModel } from "./models/client";
import { User, initUserModel } from "./models/user";
import { Detail, initDetailModel } from "./models/detail";
import { FileStructure, initFileStructureModel } from "./models/fileStructure";
import { SalesOrder, initSalesOrderModel } from "./models/salesOrder";
import { Container, initContainerModel } from "./models/container";
import { initConsignee } from "./models/consignee";
import { Operation, initOperation } from "./models/operation";
import {
  HistoryOperation,
  initHistoryOperation,
} from "./models/historyOperation";
import { TaskList, initTaskListModel } from "./models/workList";
import { initTaskModel } from "./models/task";
import { TypeOperation, initTypeOperationModel } from "./models/typeOperation";

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

/** Pricing relationships */
Pricing.belongsTo(Client, { foreignKey: "client_id" });
Pricing.belongsTo(User, { foreignKey: "user_id" });
Pricing.hasMany(Detail, { foreignKey: "pricing_id" });
Pricing.belongsTo(Operation, { foreignKey: "operation_id" });

/** Sales Order relationships */
SalesOrder.hasMany(Container, { foreignKey: "salesOrder_id" });
SalesOrder.belongsTo(Client, { foreignKey: "client_id" });
SalesOrder.belongsTo(User, { foreignKey: "client_id" });
SalesOrder.belongsTo(Operation, { foreignKey: "operation_id" });

/** Operation relationships */
FileStructure.belongsTo(Operation, { foreignKey: "operation_id" });
Operation.hasMany(HistoryOperation, { foreignKey: "operation_id" });
Operation.hasOne(TypeOperation, { foreignKey: "typeOperation_id" });
HistoryOperation.belongsTo(Operation, { foreignKey: "operation_id" });
Operation.hasOne(TaskList, { foreignKey: "operation_id" });
