import { Request, Response } from "express";
import { getPorts } from "../services/portName";
import { ResponseApi } from "../utils/responseApi";

export const getSeaPortController = async (_req: Request, res: Response) => {
  try {
    const ports = await getPorts();
    if (!ports.length) {
      res.status(200).json(new ResponseApi(0, "No se encontraron puertos"));
    } else {
      res.status(200).json(new ResponseApi(0, "", ports));
    }
  } catch (error: any) {
    res
      .status(200)
      .json(new ResponseApi(1, `Error en obtener puertos: ${error}`));
  }
};
