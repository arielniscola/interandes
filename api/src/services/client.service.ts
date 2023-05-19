import { Client } from "../db";
import { IClient } from "../interfaces/IClient";

export const getAllClients = async () => {
  const clients = await Client.findAll({
    attributes: {
      exclude: ["isDeleted"],
    },
  });

  if (!clients) throw new Error("Not found");

  return clients;
};

export const getClientID = async (id: any) => {
  const client = await Client.findByPk(id, {
    attributes: {
      exclude: ["deleted"],
    },
  });

  if (!client) throw new Error("Not found");
  return client;
};

export const createClient = async (client: any) => {
  const { contactperson, mailaddress } = client;

  if (!contactperson) throw new Error("Data required missing");
  const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!emailRegex.test(mailaddress)) throw new Error("Email isn't valid");

  const clientCreated = await Client.create(client);

  if (!clientCreated) throw new Error("Error in DB");

  return clientCreated;
};

export const updateClient = async (client: IClient) => {
  const userUpdated = await Client.update(
    {
      contactperson: client.contactperson,
      companyname: client.companyname,
      phonenumber: client.phonenumber,
      category: client.category,
      direction: client.direction,
    },
    {
      where: {
        id: client.id,
      },
    }
  );

  if (!userUpdated) throw "Error at update";
  return userUpdated;
};
