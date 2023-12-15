import { ITypeOperation } from "../models/typeOperation";
import { Request, Response } from "express";
import {
  createOperationType,
  deleteOperationType,
  getOperationsType,
  getOperationTypeID,
  updateOperationType,
} from "../services/operationType";
import { ResponseApi } from "../utils/responseApi";

export const createOperationTypeController = async (
  req: Request<{}, {}, ITypeOperation>,
  res: Response
) => {
  try {
    const operationType = req.body;
    delete operationType.id;
    const op = await createOperationType(operationType);
    if (!op) {
      return res
        .status(200)
        .json(new ResponseApi(1, "No se creo Tipo de operacion"));
    } else {
      return res
        .status(200)
        .json(new ResponseApi(0, "Tipo de operation creada correctamente"));
    }
  } catch (error) {
    return res
      .status(200)
      .json(new ResponseApi(1, `Error al crear tipo de operacion: ${error}`));
  }
};

export const deleteOperationTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const opDeleted = await deleteOperationType(id);
    if (!opDeleted) {
      return res
        .status(200)
        .json(new ResponseApi(1, "No se elimino Tipo de operacion"));
    } else {
      return res
        .status(200)
        .json(new ResponseApi(0, "Tipo de operacion eliminada correctamente"));
    }
  } catch (error) {
    return res
      .status(200)
      .json(new ResponseApi(1, `Error al eliminar: ${error}`));
  }
};

export const updateOperationTypeController = async (
  req: Request<{}, {}, ITypeOperation>,
  res: Response
) => {
  try {
    const operationType = req.body;
    const op = await updateOperationType(operationType);
    if (!op) {
      return res
        .status(200)
        .json(new ResponseApi(1, "No se actualizo Tipo de operacion"));
    } else {
      return res
        .status(200)
        .json(new ResponseApi(0, "Tipo de operacion modificada correctamente"));
    }
  } catch (error) {
    return res
      .status(200)
      .json(
        new ResponseApi(1, `Error al modificar tipo de operacion: ${error}`)
      );
  }
};

export const getOperationsTypeController = async (
  _req: Request,
  res: Response
) => {
  try {
    const data = await getOperationsType();

    return res.status(200).json(new ResponseApi(0, "", data));
  } catch (error) {
    return res
      .status(200)
      .json(
        new ResponseApi(1, `Error al obtener tipos de operaciones: ${error}`)
      );
  }
};

export const getOperationIDController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await getOperationTypeID(id);
    return res.status(200).json(new ResponseApi(0, "", data));
  } catch (error) {
    return res
      .status(200)
      .json(new ResponseApi(1, `Error al obtener operacion: ${error}`));
  }
};
