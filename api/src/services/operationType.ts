import { ITypeOperation, TypeOperation } from "../models/typeOperation";

export const createOperationType = async (opType: ITypeOperation) => {
  try {
    const exist = await TypeOperation.findOne({
      where: {
        code: opType.code,
      },
    });
    if (exist) throw new Error("Existe tipo de operacion");
    const op = await TypeOperation.create(opType);
    return op;
  } catch (error) {
    throw error;
  }
};

export const getOperationsType = async () => {
  try {
    const data = await TypeOperation.findAll({});
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateOperationType = async (op: ITypeOperation) => {
  try {
    const opUpdated = await TypeOperation.update(
      {
        tasks: op.tasks,
        code: op.code,
      },
      {
        where: {
          id: op.id,
        },
      }
    );
    return opUpdated;
  } catch (error) {
    throw error;
  }
};

export const deleteOperationType = async (id: string) => {
  try {
    const opDeleted = await TypeOperation.destroy({
      where: {
        id: id,
      },
    });
    return opDeleted;
  } catch (error) {
    throw error;
  }
};

export const getOperationTypeID = async (id: string) => {
  try {
    const opType = await TypeOperation.findOne({
      where: {
        id: id,
      },
    });
    return opType;
  } catch (error) {
    throw error;
  }
};
