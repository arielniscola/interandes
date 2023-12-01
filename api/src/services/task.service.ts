import { Op } from "sequelize";
import { ITask, Task } from "../models/task";
import { TypeOperation } from "../models/typeOperation";

export const getTasks = async () => {
  try {
    const tasks = await Task.findAll();
    return tasks;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (task: ITask) => {
  try {
    const taskCreated = await Task.create(task);
    if (!taskCreated) throw new Error("Error al crear tarea");
    return taskCreated;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    // Buscamos id de tarea
    const task = await Task.findOne({
      where: {
        id: id,
      },
    });
    if (!task) throw new Error("No se encontro tarea");
    // Verificar que tarea no este en algun worklist
    const exist = await TypeOperation.findAll({
      where: {
        tasks: {
          [Op.contains]: [task.description],
        },
      },
    });
    if (exist)
      throw new Error("No se puede eliminar tarea. Esta asociada a una lista");
    // Eliminar tarea
    const response = await Task.destroy({
      where: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
