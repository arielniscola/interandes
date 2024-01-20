import {
  getAllClients,
  getClientID,
  updateClient,
  createClient,
} from "../services/client.service";
import { Request, Response } from "express";
import { ResponseApi } from "../utils/responseApi";

export const getAllClientsController = async (_req: Request, res: Response) => {
  try {
    const clients = await getAllClients();
    if (!clients) res.status(404).json({ message: "Clients not found" });

    res.status(200).json(clients);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getClientIDController = async (req: Request, res: Response) => {
  try {
    const client = await getClientID(req.params.id);
    if (!client)
      res.status(404).json(new ResponseApi(0, "Cliente no encontrado"));

    res.status(200).json(new ResponseApi(0, "", client));
  } catch (error: any) {
    res.status(404).json(new ResponseApi(0, `Error en el servicio: ${error}`));
  }
};

export const updateClientController = async (req: Request, res: Response) => {
  try {
    const clientUpdated = await updateClient(req.body);
    if (!clientUpdated)
      res.status(404).json(new ResponseApi(1, `Error al modificar cliente`));
    res
      .status(200)
      .json(
        new ResponseApi(0, "Cliente modificado correctamente", clientUpdated)
      );
  } catch (error: any) {
    res.status(404).json(new ResponseApi(1, `Error en el servicio: ${error}`));
  }
};

export const createClientController = async (req: Request, res: Response) => {
  try {
    const clientCreated = await createClient(req.body);
    if (!clientCreated) res.status(404).json({ message: "Client not created" });
    res.status(200).json(clientCreated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
