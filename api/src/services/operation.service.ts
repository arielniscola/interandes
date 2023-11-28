import {
  HistoryOperation,
  IHistoryOperation,
} from "../models/historyOperation";
import { IOperation, Operation } from "../models/operation";
import { Task } from "../models/task";
import { TypeOperation } from "../models/typeOperation";
import { ITasksList, TaskList } from "../models/workList";

export const getOperationID = async (id: string): Promise<Operation> => {
  try {
    const operation = await Operation.findByPk(id);
    // Si no encuentra operacion retornar error
    if (operation) throw Error("Operacion no encontrada");
    return operation;
  } catch (error) {
    throw error;
  }
};

export const getOperations = async (): Promise<Operation[]> => {
  try {
    const operations = await Operation.findAll();
    return operations;
  } catch (error) {
    throw error;
  }
};

export const createOperation = async (operationType: string) => {
  try {
    // Obtener tipo de operacion para listar tareas
    const typeOperationTasks = await TypeOperation.findOne({
      where: { code: operationType },
    });
    // Obtener numeracion
    const operationNumber = await getOperationNumber();
    const newOperation: IOperation = {
      operationNumber,
      date: new Date(),
      typeOperation: operationType,
    };
    const op = await Operation.create(newOperation);
    if (op) {
      // Crear lista de tareas
      const taskList: ITasksList = {
        code: operationType,
        taks: typeOperationTasks.tasks.map((task) => {
          return { task: task.description, done: false };
        }),
      };
      await TaskList.create(taskList);
    }
  } catch (error) {}
};

export const addHistoryOperation = async (
  idOperation: string,
  method: string
) => {
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

const getOperationNumber = async () => {
  const lastON = await Operation.findOne({
    order: [["createdAt", "DESC"]],
  });
  if (lastON) return lastON.operationNumber + 1;
  return 1;
};
