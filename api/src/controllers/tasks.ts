import { Request, Response } from "express";
import { ResponseApi } from "../utils/responseApi";
import { createTask, deleteTask, getTasks } from "../services/task.service";
import { ITask, Task } from "../models/task";

export const getTasksController = async (_req: Request, res: Response) => {
  try {
    const tasks = await getTasks();
    if (!tasks.length) {
      res.status(200).json(new ResponseApi(1, "No se encontraron tareas"));
    } else {
      res.status(200).json(new ResponseApi(1, "", tasks));
    }
  } catch (error) {
    res
      .status(200)
      .json(new ResponseApi(1, `Error al obtener tareas: ${error}`));
  }
};

export const createTaskController = async (
  req: Request<{}, {}, ITask>,
  res: Response
) => {
  try {
    const task = req.body;
    const exist = await Task.findOne({
      where: {
        description: task.description,
      },
    });
    if (exist)
      return res
        .status(200)
        .json(new ResponseApi(1, "Ya existe tarea creada con ese nombre"));
    const taskCreated = await createTask(task);
    if (!taskCreated)
      return res.status(200).json(new ResponseApi(1, "No se creo tarea"));
    return res
      .status(200)
      .json(new ResponseApi(0, "Tarea creada correctamente"));
  } catch (error) {
    return res
      .status(200)
      .json(new ResponseApi(1, `Error al crear tarea: ${error}`));
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const resp = await deleteTask(id);
    if (!resp)
      return res.status(200).json(new ResponseApi(1, `Error al elminar tarea`));

    return res
      .status(200)
      .json(new ResponseApi(0, "Tarea elminada correctamente"));
  } catch (error) {
    return res
      .status(200)
      .json(new ResponseApi(1, `Error al elminar tarea: ${error}`));
  }
};
