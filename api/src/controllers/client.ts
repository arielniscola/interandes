import {
  getAllClients,
  getClientID,
  updateClient,
  createClient,
} from "../services/client.service";
import { Request, Response } from "express";

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
    if (!client) res.status(404).json({ message: "Client not found" });

    res.status(200).json(client);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateClientController = async (req: Request, res: Response) => {
  try {
    const clientUpdated = await updateClient(req.body);
    if (!clientUpdated) res.status(404).json({ message: "Client not updated" });
    res.status(200).json(clientUpdated);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
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
