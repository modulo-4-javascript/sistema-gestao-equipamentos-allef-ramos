import { useState } from "react";
import { locationService } from "../services/locationService";
import type { LocationDetails, UpdateLocationPayload } from "../types/location";
import { getRequestErrorMessage } from "../../../shared/http/getRequestErrorMessage";

interface UpdateLocationState {
  isLoading: boolean;
  errorMessage: string;
  update: (payload: UpdateLocationActionPayload) => Promise<LocationDetails>;
}

interface UpdateLocationActionPayload {
  locationId: string;
  payload: UpdateLocationPayload;
}

/**
 * Controla o fluxo de edição de localizações.
 *
 * Expõe a função `update` para enviar alterações ao backend e mantém
 * os estados de carregamento e erro usados pela interface.
 *
 * @returns Estado da requisição e função para atualizar uma localização.
 */
export function useUpdateLocation(): UpdateLocationState {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Atualiza uma localização existente no backend.
   *
   * A função recebe o ID da localização e os dados editados,
   * chama o service responsável e retorna a resposta da API.
   *
   * @param action Dados necessários para atualizar a localização.
   * @param action.locationId Identificador da localização que será atualizada.
   * @param action.payload Dados atualizados da localização.
   * @returns Localização atualizada retornada pela API.
   */
  async function update({ locationId, payload }: UpdateLocationActionPayload) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      return await locationService.updateLocation(locationId, payload);
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
    update,
  };
}
