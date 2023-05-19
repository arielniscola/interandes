export interface IPricing {
  id?: string;
  pricingnumber: string;
  companyname: string;
  typeServices: string;
  revalidate: string;
  language: string;
  effectiveDate: Date;
  validate: Date;
  deleted: boolean;
  observations: string;
  conditions: string;
  operationType: string;
  stage: string;
  totalCost: number;
  totalSale: number;
  totalTax: number;
  profit: number;
}
