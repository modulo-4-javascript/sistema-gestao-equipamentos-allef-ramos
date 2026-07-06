import { useState } from "react";
import { locationService } from "../services/locationService";
import type { CreateLocationPayload, LocationDetails } from "../types/location";
import { getRequestErrorMessage } from "../../../shared/http/getRequestErrorMessage";

interface CreateLocationState {
  isLoading: boolean;
  errorMessage: string;
  create: (payload: CreateLocationPayload) => Promise<LocationDetails>;
}

/**
 * Controla o fluxo de criação de localizações.
 *
 * Expõe a função `create` para enviar os dados ao backend e mantém
 * os estados de carregamento e erro usados pela interface.
 *
 * @returns Estado da requisição e função para criar uma localização.
 */
export function useCreateLocation(): CreateLocationState {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Envia os dados da nova localização para o backend.
   *
   * A função apenas realiza a criação. A responsabilidade de recarregar
   * listas, summaries ou fechar modais fica com o componente que chamou o hook.
   *
   * @param payload Dados necessários para criar a localização.
   * @returns Localização criada retornada pela API.
   */
  async function create(payload: CreateLocationPayload) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      return await locationService.createLocation(payload);
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    errorMessage,
    create,
  };
}
