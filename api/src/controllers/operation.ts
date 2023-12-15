import { Request, Response } from "express";
import {
  getOperationID,
  getOperations,
  updateOperations,
} from "../services/operation.service";
import { ResponseApi } from "../utils/responseApi";
import { IOperation } from "../models/operation";
import { ITasksList } from "../models/workList";
import { updateWorkList } from "../services/workList.service";

export const getOperationIDController = async (req: Request, res: Response) => {
  try {
    /** Obtener operacion, historial y tareas */
    const id = req.params.id;
    const operation = await getOperationID(id);

    res.status(200).json(new ResponseApi(0, "", operation));
  } catch (error) {
    res
      .status(200)
      .json(new ResponseApi(1, `Error al obtener operacion: ${error}`));
  }
};

export const getOperationsController = async (_req: Request, res: Response) => {
  try {
    const data = await getOperations();
    res.status(200).json(new ResponseApi(0, "", data));
  } catch (error) {
    res
      .status(400)
      .json(new ResponseApi(1, `Error al obtener operaciones: ${error}`));
  }
};

export const updateOperationController = async (
  req: Request<{}, {}, IOperation>,
  res: Response
) => {
  try {
    const operation = req.body;
    const data = await updateOperations(operation);
    res.status(200).json(new ResponseApi(0, "", data));
  } catch (error) {
    res
      .status(400)
      .json(new ResponseApi(1, `Error al actualizar operaciones: ${error}`));
  }
};

export const updateTaskListController = async (
  req: Request<{}, {}, ITasksList>,
  res: Response
) => {
  try {
    const tasklist = req.body;
    const data = await updateWorkList(tasklist);
    res.status(200).json(new ResponseApi(0, "", data));
  } catch (error) {
    res
      .status(400)
      .json(
        new ResponseApi(1, `Error al actualizar tareas operaciones: ${error}`)
      );
  }
};
