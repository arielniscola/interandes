import { IProvider, Provider } from "../models/provider";

export const getProviderID = async (id: string): Promise<IProvider> => {
  try {
    const provider = await Provider.findOne({
      where: {
        id: id,
      },
    });
    // Si no encuentra operacion retornar error
    if (!provider) throw Error("Proveedor no encontrado");
    return provider;
  } catch (error) {
    throw error;
  }
};

export const createProvider = async (
  provider: IProvider
): Promise<IProvider> => {
  try {
    const data = await Provider.create(provider);
    return data;
  } catch (error) {
    throw error;
  }
};
export const getProviders = async () => {
  try {
    const providers = await Provider.findAll();
    return providers;
  } catch (error) {
    throw error;
  }
};

export const updateProvider = async (provider: IProvider) => {
  try {
    const providerUpdated = Provider.update(provider, {
      where: {
        id: provider.id,
      },
    });
    return providerUpdated;
  } catch (error) {
    throw error;
  }
};
