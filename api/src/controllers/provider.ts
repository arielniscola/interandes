import { Request, Response } from "express";
import { ResponseApi } from "../utils/responseApi";
import {
  createProvider,
  getProviderID,
  getProviders,
  updateProvider,
} from "../services/provider.service";
import { IProvider } from "../models/provider";

export const getProviderIDController = async (req: Request, res: Response) => {
  try {
    /** Obtener operacion, historial y tareas */
    const id = req.params.id;
    const operation = await getProviderID(id);

    res.status(200).json(new ResponseApi(0, "", operation));
  } catch (error) {
    res
      .status(200)
      .json(new ResponseApi(1, `Error al obtener proveedor: ${error}`));
  }
};

export const getProvidersController = async (_req: Request, res: Response) => {
  try {
    const data = await getProviders();
    res.status(200).json(new ResponseApi(0, "", data));
  } catch (error) {
    res
      .status(400)
      .json(new ResponseApi(1, `Error al obtener proveedores: ${error}`));
  }
};

export const createProviderController = async (
  req: Request<{}, {}, IProvider>,
  res: Response
) => {
  try {
    const provider = req.body;
    const data = await createProvider(provider);
    res.status(200).json(new ResponseApi(0, "", data));
  } catch (error) {
    res
      .status(400)
      .json(new ResponseApi(1, `Error al crear proveedor: ${error}`));
  }
};

export const updateProviderController = async (
  req: Request<{}, {}, IProvider>,
  res: Response
) => {
  try {
    const provider = req.body;
    const data = await updateProvider(provider);
    res.status(200).json(new ResponseApi(0, "", data));
  } catch (error) {
    res
      .status(400)
      .json(new ResponseApi(1, `Error al actualizar proveedor: ${error}`));
  }
};
