import { Request, Response, NextFunction } from "express";

function auditoriaMiddleware(req: Request, res: Response, next: NextFunction) {
  // Registra la hora de inicio de la solicitud.
  const start = new Date();

  // Sobrescribe la función `res.json` para registrar el resultado de la ejecución del controlador.
  const originalJson = res.json;
  res.json = function (body): any {
    // Registra la hora de finalización de la solicitud y calcula el tiempo transcurrido.
    const end = new Date();
    const elapsed = end.getTime() - start.getTime();

    // Registra la auditoría de acuerdo a tus necesidades, incluyendo el tiempo transcurrido y el resultado del controlador.
    console.log(
      `Auditoría: Se ha ejecutado la solicitud ${req.method} ${
        req.originalUrl
      } en ${elapsed}ms. Resultado: ${JSON.stringify(body)}`
    );
    console.log("----------------------");
    console.log(originalJson);

    // Ejecuta la función original `res.json`.
    originalJson.call(res, body);
  };

  // Llama a la función next() para que el controlador correspondiente se ejecute.
  next();
}

export default auditoriaMiddleware;
