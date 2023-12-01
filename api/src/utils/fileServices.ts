import fs from "fs";
import multer from "multer";
import path from "path";

class FileStorage {
  private _storage: multer.StorageEngine;
  constructor() {
    const storage = multer.diskStorage({
      destination: async function (req, _file, cb) {
        try {
          const directorySave = path.join(process.cwd(), "uploads");
          if (!fs.existsSync(directorySave)) {
            console.log(
              `La carpeta ${directorySave} no existe. Se creara a continuación`
            );
            fs.mkdirSync(directorySave);
            console.log(`El directorio ${directorySave} se creo correctamene`);
          }
          const operation = req.params.id;
          // Ruta especifica de operacion
          const finalDirectory = path.join(
            directorySave,
            `operacion_${operation}`
          );
          await createFolder(finalDirectory);
          cb(null, directorySave);
        } catch (error) {
          console.log(`Error en crear carpeta upload: ${error}`);
        }
      },
      filename: async function (_req, file, cb) {
        const filename = Date.now() + file.originalname;
        console.log(`Se va a guardar archivo en ${filename}`);
      },
    });
    this._storage = storage;
  }
}

export const createFolder = async (pathName: string): Promise<boolean> => {
  try {
    /** verificamos que carpetan no exista */
    const folder = await fs.promises.readdir(pathName);
    if (!folder) {
      /** Creamos carpeta */
      await fs.promises.mkdir(pathName);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

export const saveFile = async (
  pathName: string,
  nameFile: string,
  contentFile: string
): Promise<boolean> => {
  try {
    await fs.promises.writeFile(pathName + nameFile, contentFile);
    return true;
  } catch (error) {
    throw error;
  }
};

export const getFileCollection = async (
  pathName: string
): Promise<string[]> => {
  try {
    /** Leemos archivos del path */
    const files = await fs.promises.readdir(pathName);
    return files;
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (pathName: string) => {
  try {
    await fs.promises.unlink(pathName);
  } catch (error) {
    throw error;
  }
};
