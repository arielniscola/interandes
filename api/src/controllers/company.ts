import { Request, Response } from "express";
import { ResponseApi } from "../utils/responseApi";
import { downloadFile } from "../services/files.service";
import fs from "fs";
import {
  createCompany,
  getCompanies,
  getLogo,
  updateCompany,
} from "../services/company";

export const uploadLogoController = async (req: Request, res: Response) => {
  try {
    const files = req.files;
    const companyID = req.params.id;
    const companyUpdated = await updateCompany(companyID, files);
    res
      .status(200)
      .json(
        new ResponseApi(0, "Logo actualizado correctamente", companyUpdated)
      );
  } catch (error: any) {
    res
      .status(400)
      .json(new ResponseApi(1, `Error en la carga de archivos ${error}`));
  }
};

export const createCompanyController = async (req: Request, res: Response) => {
  try {
    const company = req.body;
    const companyCreated = await createCompany(company);
    res
      .status(200)
      .json(
        new ResponseApi(0, "Compañia creada correctamente", companyCreated)
      );
  } catch (error) {
    res
      .status(200)
      .json(new ResponseApi(1, `Error al crear compañia: ${error}`));
  }
};

export const getLogoController = async (
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

export const getCompaniesController = async (_req: Request, res: Response) => {
  try {
    const companies = await getCompanies();
    res.status(200).json(new ResponseApi(0, "", companies));
  } catch (error: any) {
    res
      .status(200)
      .json(new ResponseApi(1, `Error al buscar compañias: ${error}`));
  }
};

export const getLogoView = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await getLogo(id);
    res.status(200).json(new ResponseApi(0, "", data));
  } catch (error) {
    res.status(200).json(new ResponseApi(1, `Error al buscar logo: ${error}`));
  }
};
