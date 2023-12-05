import { Request, Response } from "express";
import { getOperationID, getOperations } from "../services/operation.service";
import { ResponseApi } from "../utils/responseApi";

export const getOperationIDController = async (req: Request, res: Response) => {
  try {
    /** Obtener operacion, historial y tareas */
    const id = req.params.id;
    const operation = await getOperationID(id);

    res.status(200).json(new ResponseApi(0, "", operation));
  } catch (error) {
    res.status(200).json(new ResponseApi(1, `Error al obtener operacion: ${error}`));
  }
};

export const getOperationsController = async (_req: Request, res: Response) => {
  try {
      const data = await getOperations();
      res.status(200).json(new ResponseApi(0, "", data))
  } catch (error) {
    res.status(400).json(new ResponseApi(1, `Error al obtener operaciones: ${error}`));
  }
};
