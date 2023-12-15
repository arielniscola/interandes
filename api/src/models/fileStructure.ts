import { DataTypes, Model, Sequelize } from "sequelize";

export interface IFileStructure {
  id?: string;
  path: string;
  filename: string;
  size: number;
  mimeType: string;
  operation_id?: string;
}

export class FileStructure extends Model<IFileStructure> {
  public id?: string;
  public path: string;
  public filename: string;
  public size: number;
  public mimeType: string;
  public operation_id: string;
}

export function initFileStructureModel(sequelize: Sequelize): void {
  FileStructure.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      path: {
        type: DataTypes.STRING,
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "FileStruture",
    }
  );
}
