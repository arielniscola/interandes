export interface IClient {
  id?: string;
  companyname: string;
  direction: string;
  taxID: string;
  contactperson: string;
  mailaddress: string;
  phonenumber: string;
  category: string;
  isDeleted?: boolean;
}
