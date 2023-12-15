import { Request, Response } from "express";
import { ResponseApi } from "../utils/responseApi";
import {
  createFiles,
  downloadFile,
  getFilesOperation,
} from "../services/files.service";
import fs from "fs";

export const uploadFilesController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const files = req.files;
    const id = req.params.id;
    await createFiles(id, files);
    res
      .status(200)
      .json(new ResponseApi(0, "Archivos subidos correctamente", files));
  } catch (error: any) {
    res
      .status(400)
      .json(new ResponseApi(1, `Error en la carga de archivos ${error}`));
  }
};

export const getFilesOperationController = async (
  req: Request<{ id: string }, {}>,
  res: Response
) => {
  try {
    const idOperation = req.params.id;
    const files = await getFilesOperation(idOperation);
    res.status(200).json(new ResponseApi(0, "", files));
  } catch (error: any) {
    res
      .status(200)
      .json(new ResponseApi(1, `Error en la obtencion de archivos ${error}`));
  }
};

export const downloadFileController = async (
  req: Request<{ id: string }, {}>,
  res: Response
) => {
  try {
    const id = req.params.id;
    const file = await downloadFile(id);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.filename}`
    );
    res.setHeader("Content-type", file.mimeType);
    let filestream = fs.createReadStream(file.path);
    filestream.pipe(res);
  } catch (error: any) {
    res
      .status(400)
      .json(new ResponseApi(1, `Error al descargar archivo: ${error}`));
  }
};
