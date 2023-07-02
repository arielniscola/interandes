import { DataTypes, Model, Sequelize } from "sequelize";

interface IFileStructure {
  id?: string;
  path: string;
  files: [];
  collection: string;
}

class FileStructure extends Model<IFileStructure> {
  public id?: string;
  public path: string;
  public files: [];
  public collection: string;
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
      files: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      collection: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "FileStruture",
    }
  );
}

export { FileStructure };
