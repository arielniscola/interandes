import { Request, Response } from "express";
import { getOperationID } from "../services/operation.service";

export const getOperationIDController = async (req: Request, res: Response) => {
  try {
    /** Obtener operacion, historial y tareas */
    const id = req.params.id;
    const operation = await getOperationID(id);

    res.status(200).json(operation);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getOperationsController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(400).json({ error });
  }
};
