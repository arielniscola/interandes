import { readFile, utils } from "xlsx";
import { ISeaPort, SeaPort } from "../models/seaPort";

export const getPorts = async () => {
  try {
    let ports = await SeaPort.findAll();
    if (!ports.length) {
      await getPortsXlsx();
      ports = await SeaPort.findAll();
    }
    return ports;
  } catch (error) {
    throw error;
  }
};

export const getPortsXlsx = async () => {
  try {
    const workbook = readFile("./assets/WPI2019.xls");
    const countryCodesFile = readFile("./assets/country-codes.xlsx");
    const sheetNameCountry = countryCodesFile.SheetNames[0];
    const sheetDataCountry = utils.sheet_to_json(
      countryCodesFile.Sheets[sheetNameCountry]
    );
    const sheetName = workbook.SheetNames[0];
    /** Leer la hoja del documento */
    const sheetData = utils.sheet_to_json(workbook.Sheets[sheetName]);
    /** Obtener los nombres de los paises segun codigo */
    const values = sheetDataCountry.map((row: any) => ({
      code: row["Country Code"],
      name: row["Country Name"],
    }));
    const columnName = "PORT_NAME";
    const countryCode = "COUNTRY";
    const index = "INDEX_NO";
    const valuesOfColumn = sheetData.map((row: any) => ({
      id: row[index],
      seaPort: row[columnName],
      country: findCountryName(values, row[countryCode]),
    }));
    /** Crear valores en BD */
    let portsToSave: ISeaPort[] = [];
    for (const port of valuesOfColumn) {
      let item: ISeaPort = {
        code: port.id,
        portName: port.seaPort,
        country: port.country,
      };
      const exist = portsToSave.find((el) => el.code === item.code);
      if (!exist) portsToSave.push(item);
    }
    await SeaPort.bulkCreate(portsToSave);
  } catch (error) {
    console.log(error);
  }
};

function findCountryName(countries: any, code: string) {
  const portObject = countries.find((item: any) => item.code === code);
  return portObject ? portObject.name : undefined;
}
