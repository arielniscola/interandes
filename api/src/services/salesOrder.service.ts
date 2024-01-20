import { ISalesOrder, SalesOrder } from "../models/salesOrder";
import { Client } from "../models/client";
import { Consignee, IConsignee } from "../models/consignee";
import { Container, IContainer } from "../models/container";
// import { IDetail } from "../interfaces/IDetail";

export const getAllSalesOrders = async () => {
  const salesOrders = await SalesOrder.findAll({
    attributes: {
      exclude: ["isDeleted"],
    },
    order: [["createdAt", "DESC"]],
  });

  if (!salesOrders) throw new Error("Not found");

  return salesOrders;
};

export const getSalesOrderID = async (id: string): Promise<ISalesOrder> => {
  const salesOrder = await SalesOrder.findByPk(id, {
    attributes: {
      exclude: ["deleted"],
    },
    include: [{ model: Client }, { model: Consignee }, { model: Container }],
  });

  if (!salesOrder) throw new Error("Not found");
  return salesOrder;
};

export const createSalesOrder = async (salesOrder: ISalesOrder) => {
  try {
    salesOrder.numberSO = await generateID();
    const salesOrderCreated = await SalesOrder.create(salesOrder);
    if (!salesOrderCreated) throw new Error("Error in DB");
    return salesOrderCreated;
  } catch (error) {
    console.log(error);
    throw error;
  }
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

export const createConsignees = async (consigness: IConsignee[]) => {
  try {
    await Consignee.bulkCreate(consigness);
  } catch (error) {
    throw error;
  }
};

export const createContainers = async (containers: IContainer[]) => {
  try {
    await Container.bulkCreate(containers);
  } catch (error) {
    throw error;
  }
};

export const getConsignees = async () => {
  try {
    const consignees = await Consignee.findAll();
    return consignees;
  } catch (error) {
    throw error;
  }
};

/** generador de ID */
const generateID = async () => {
  try {
    const prefijo = "SO";
    const lastSO = await SalesOrder.findOne({
      order: [["createdAt", "DESC"]],
    });
    if (!lastSO.numberSO) return `${prefijo}-1`;
    const sequence = lastSO.numberSO.split("-");
    const id = `${prefijo}-${parseInt(sequence[1]) + 1}`;
    return id;
  } catch (error) {
    throw error;
  }
};
