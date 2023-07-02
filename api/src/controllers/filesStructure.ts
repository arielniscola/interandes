import { Request, Response } from "express";

export const uploadFiles = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getFilesCollection = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
