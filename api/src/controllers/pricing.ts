import {
  getAllPricings,
  getPricingID,
  updatePricing,
  createPricing,
} from "../services/pricing.service";
import { createDetailPricing } from "../services/detail.service";
import { Request, Response } from "express";
import { generatePDF } from "../utils/pdf";
import { createOperation } from "../services/operation.service";
import { IPricing } from "../models/pricing";
import { IDetail } from "../models/detail";
import { ResponseApi } from "../utils/responseApi";
import fs from "fs";

export const getAllPricingsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const pricings = await getAllPricings();
    if (!pricings) res.status(404).json({ message: "Pricings not found" });

    res.status(200).json(pricings);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getPricingIDController = async (req: Request, res: Response) => {
  try {
    const pricing = await getPricingID(req.params.id);
    res.status(200).json(new ResponseApi(0, "", pricing));
  } catch (error: any) {
    res
      .status(404)
      .json(new ResponseApi(1, `Error al obtener pricing: ${error}`));
  }
};

export const updatePricingController = async (req: Request, res: Response) => {
  try {
    const pricingUpdated = await updatePricing(req.body);
    if (!pricingUpdated)
      res
        .status(404)
        .json(new ResponseApi(1, "Problemas para actualizar pricing"));
    res
      .status(200)
      .json(
        new ResponseApi(0, "Pricing actualizado correctamente", pricingUpdated)
      );
  } catch (error) {
    res
      .status(404)
      .json(new ResponseApi(1, `Error en actualizar pricing: ${error}`));
  }
};

export const createPricingController = async (
  req: Request<{}, {}, { pricing: IPricing; details: IDetail[] }>,
  res: Response
) => {
  try {
    // Crear operacion principal
    const { pricing, details } = req.body;
    const operation = await createOperation(pricing.operationType);
    pricing.operation_id = operation.id;
    const pricingCreated = await createPricing(pricing);
    if (!pricingCreated)
      res.status(200).json(new ResponseApi(1, "Error al crear pricing"));
    /** Crear detalles */
    await createDetailPricing(details, pricingCreated.id);

    res.status(200).json(new ResponseApi(0, "Pricing creado correctamente"));
  } catch (error: any) {
    res
      .status(200)
      .json(
        new ResponseApi(1, `Error en creacion de pricing: ${error.message}`)
      );
  }
};

export const pdfPricingController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const pricing = (await getPricingID(id)) as IPricing & { Details: IDetail };
    const pdfStrem = await generatePDF(pricing, pricing.Details);
    pdfStrem.on("finish", () => {
      console.log("Escritura en el archivo PDF completada");
      // Configurar encabezados y enviar el archivo como respuesta HTTP
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=cotizacion_${pricing.pricingnumber}.pdf`
      );
      res.setHeader("Content-type", "application/pdf");

      // Crear un nuevo stream para leer el archivo PDF y enviarlo en la respuesta
      const filestream = fs.createReadStream("files/cotizacion.pdf");
      filestream.pipe(res);
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
