import { Company, ICompany } from "../models/company";
import fs from "fs";
import path from "path";

export const getCompanies = async (): Promise<ICompany[]> => {
  try {
    const companies = await Company.findAll();
    return companies;
  } catch (error) {
    throw error;
  }
};

export const createCompany = async (company: ICompany) => {
  try {
    const companyCreated = await Company.create(company);
    return companyCreated;
  } catch (error) {
    throw error;
  }
};

export const updateCompany = async (companyId: string, files: any) => {
  try {
    const companyExist = await Company.findOne({ where: { id: companyId } });
    if (!companyExist) throw "Compañia no existe";
    const companyUpdated = await Company.update(
      {
        logo: path.join(files[0].path, files[0].filename),
      },
      {
        where: {
          id: companyId,
        },
      }
    );
    fs.unlinkSync(companyExist.logo);
    return companyUpdated;
  } catch (error) {
    throw error;
  }
};
