import { useCallback, useEffect, useState } from "react";
import { locationService } from "../services/locationService";
import type { LocationHistoryItem, PaginatedResult } from "../types/location";
import type { RequestState } from "../../../shared/hooks/requestState";
import { getRequestErrorMessage } from "../../../shared/http/getRequestErrorMessage";

/**
 * Busca o histórico de uma localização a partir do ID recebido.
 *
 * Controla os estados de dados, carregamento e erro usados pela tela
 * de detalhes da localização. Caso nenhum ID seja informado, a busca
 * não é executada e o histórico é mantido vazio.
 *
 * @param locationId Identificador da localização.
 * @returns Estado da requisição e função para recarregar o histórico.
 */
export function useLocationHistory(
  locationId?: string,
): RequestState<PaginatedResult<LocationHistoryItem>> {
  const [data, setData] = useState<PaginatedResult<LocationHistoryItem>>();
  const [isLoading, setIsLoading] = useState(Boolean(locationId));
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Carrega o histórico da localização.
   *
   * Se não houver ID disponível, limpa os dados atuais e encerra
   * o estado de carregamento.
   */
  const loadLocationHistory = useCallback(async () => {
    if (!locationId) {
      setData(undefined);
      setErrorMessage("");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await locationService.getLocationHistory(locationId);
      setData(result);
    } catch (error) {
      setData(undefined);
      setErrorMessage(getRequestErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [locationId]);

  /**
   * Recarrega o histórico sempre que o ID da localização mudar.
   */
  useEffect(() => {
    void Promise.resolve().then(loadLocationHistory);
  }, [loadLocationHistory]);

  return {
    data,
    isLoading,
    errorMessage,
    reload: loadLocationHistory,
  };
}
