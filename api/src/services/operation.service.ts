import {
  HistoryOperation,
  IHistoryOperation,
} from "../models/historyOperation";
import { Operation } from "../models/operation";

export const getOperation = async (id: string): Promise<Operation> => {
  try {
    const operation = await Operation.findByPk(id);
    // Si no encuentra operacion retornar error
    if (operation) throw Error("Operacion no encontrada");
    return operation;
  } catch (error) {
    throw error;
  }
};

export const addHistoryOperation = async (id: string, method: string) => {
  try {
    // Crear historial de operacion
    const operationHistory: IHistoryOperation = {
      dateTime: new Date(),
      method,
    };
    await HistoryOperation.create(operationHistory);
  } catch (error) {
    throw error;
  }
};
