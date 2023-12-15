import { IOperation } from "../models/operation";
import { TypeOperation } from "../models/typeOperation";
import { TaskList, ITasksList } from "../models/workList";

export const createList = async (operation: IOperation) => {
  try {
    console.log("Creando lista de tareas");
    // Obtener tareas asiganadas a tipo de operacion
    const opType = await TypeOperation.findOne({
      where: {
        code: operation.typeOperation,
      },
    });
    const tasksList = opType.tasks.map((task) => {
      return { task: task, done: false };
    });
    const workList = await TaskList.create({
      taks: tasksList,
      operation_id: operation.id,
      code: "",
    });

    return workList;
  } catch (error) {
    throw error;
  }
};

export const updateWorkList = async (wl: ITasksList) => {
  try {
    const wlUpdated = await TaskList.update(
      {
        taks: wl.taks,
        code: wl.code,
      },
      {
        where: {
          id: wl.id,
        },
      }
    );
    return wlUpdated;
  } catch (error) {
    throw error;
  }
};
