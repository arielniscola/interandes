import fs from "fs";

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
