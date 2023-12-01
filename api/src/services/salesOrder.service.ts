import { SalesOrder } from "../models/salesOrder";
import { Client } from "../models/client";
import { Detail } from "../models/detail";
// import { IDetail } from "../interfaces/IDetail";

export const getAllSalesOrders = async () => {
  const salesOrders = await SalesOrder.findAll({
    attributes: {
      exclude: ["isDeleted"],
    },
  });

  if (!salesOrders) throw new Error("Not found");

  return salesOrders;
};

export const getSalesOrderID = async (id: string): Promise<SalesOrder> => {
  const salesOrder = await SalesOrder.findByPk(id, {
    attributes: {
      exclude: ["deleted"],
    },
    include: [{ model: Client }, { model: Detail }],
  });

  if (!salesOrder) throw new Error("Not found");
  return salesOrder;
};

export const createSalesOrder = async (salesOrder: SalesOrder) => {
  const salesOrderCreated = await SalesOrder.create(salesOrder);

  if (!salesOrderCreated) throw new Error("Error in DB");

  return salesOrderCreated;
};

export const updateSalesOrder = async (salesOrder: SalesOrder) => {
  const userUpdated = await SalesOrder.update(
    {
      //totalCost: SalesOrder.totalCost,
    },
    {
      where: {
        id: salesOrder.id,
      },
    }
  );

  if (!userUpdated) throw "Error at update";
  return userUpdated;
};
