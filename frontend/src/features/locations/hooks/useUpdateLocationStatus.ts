import { useState } from "react";
import { getRequestErrorMessage } from "../../../shared/http/getRequestErrorMessage";
import type {
  LocationDetails,
  UpdateLocationStatusPayload,
} from "../types/location";
import { locationService } from "../services/locationService";

interface UpdateLocationStatusState {
  isLoading: boolean;
  errorMessage: string;
  updateStatus: (
    payload: UpdateLocationStatusActionPayload,
  ) => Promise<LocationDetails>;
}

interface UpdateLocationStatusActionPayload {
  locationId: string;
  payload: UpdateLocationStatusPayload;
}

/**
 * Controla o fluxo de alteração de status de localizações.
 *
 * Expõe a função `updateStatus` para alterar apenas o status de uma localização
 * e mantém os estados de carregamento e erro usados pela interface.
 *
 * @returns Estado da requisição e função para alterar o status da localização.
 */
export function useUpdateLocationStatus(): UpdateLocationStatusState {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Atualiza o status de uma localização existente no backend.
   *
   * A função recebe o ID da localização e o payload com o novo status,
   * chama o PATCH do service e retorna a resposta da API.
   *
   * @param action Dados necessários para alterar o status da localização.
   * @param action.locationId Identificador da localização que terá o status alterado.
   * @param action.payload Dados da alteração de status.
   * @returns Localização atualizada retornada pela API.
   */
  async function updateStatus({
    locationId,
    payload,
  }: UpdateLocationStatusActionPayload) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      return await locationService.updateLocationStatus(locationId, payload);
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
    updateStatus,
  };
}
