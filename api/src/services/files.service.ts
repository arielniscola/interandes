import { FileStructure, IFileStructure } from "../models/fileStructure";

export const getFilesOperation = async (id: string) => {
  try {
    const files = await FileStructure.findAll({
      where: {
        operation_id: id,
      },
    });
    return files;
  } catch (error) {
    throw error;
  }
};

export const createFiles = async (id: string, files: any) => {
  try {
    for (const file of files) {
      const newFile: IFileStructure = {
        filename: file.filename,
        path: file.path,
        mimeType: file.mimetype,
        size: file.size,
        operation_id: id,
      };
      await FileStructure.create(newFile);
    }
  } catch (error) {
    throw error;
  }
};

export const downloadFile = async (id: string) => {
  try {
    const file = await FileStructure.findOne({
      where: {
        id: id,
      },
    });
    return file;
  } catch (error) {
    throw error;
  }
};
