import { Request, Response } from "express";

export const uploadFiles = async (_req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getFilesCollection = async (_req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const downloadFile = async (_req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
