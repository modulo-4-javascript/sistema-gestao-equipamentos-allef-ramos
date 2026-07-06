import { useCallback, useEffect, useState } from "react";
import { locationService } from "../services/locationService";
import type { LocationDetails } from "../types/location";
import type { RequestState } from "../../../shared/hooks/requestState";
import { getRequestErrorMessage } from "../../../shared/http/getRequestErrorMessage";

/**
 * Busca os detalhes de uma localização a partir do ID recebido pela rota.
 *
 * Controla os estados de dados, carregamento e erro usados pela tela de detalhes.
 * Caso nenhum ID seja informado, a busca não é executada.
 *
 * @param locationId Identificador da localização presente na URL.
 * @returns Estado da requisição e função para recarregar os detalhes.
 */
export function useLocationDetails(
  locationId?: string,
): RequestState<LocationDetails> {
  const [data, setData] = useState<LocationDetails>();
  const [isLoading, setIsLoading] = useState(Boolean(locationId));
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Carrega os dados detalhados de uma localização.
   *
   * Se não houver ID disponível, limpa os dados atuais e encerra o carregamento.
   */
  const loadLocationDetails = useCallback(async () => {
    if (!locationId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await locationService.getLocationById(locationId);
      setData(result);
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [locationId]);

  // Recarrega os detalhes sempre que o ID da localização mudar.
  useEffect(() => {
    void Promise.resolve().then(loadLocationDetails);
  }, [loadLocationDetails]);

  return {
    data,
    isLoading,
    errorMessage,
    reload: loadLocationDetails,
  };
}
