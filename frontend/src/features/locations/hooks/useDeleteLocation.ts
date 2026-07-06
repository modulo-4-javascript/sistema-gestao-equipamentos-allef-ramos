import { useState } from "react";
import { getRequestErrorMessage } from "../../../shared/http/getRequestErrorMessage";
import { locationService } from "../services/locationService";

interface DeleteLocationState {
  isLoading: boolean;
  errorMessage: string;
  remove: (locationId: string) => Promise<void>;
}

/**
 * Controla o fluxo de exclusão de localizações.
 *
 * Expõe a função `remove` para chamar o DELETE no backend e mantém
 * os estados de carregamento e erro usados pelo modal de confirmação.
 *
 * @returns Estado da requisição e função para excluir uma localização.
 */
export function useDeleteLocation(): DeleteLocationState {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Exclui uma localização existente no backend.
   *
   * A função apenas executa a exclusão. A responsabilidade de fechar modal,
   * exibir mensagem de sucesso ou recarregar listagem e resumo fica com o
   * componente que chamou o hook.
   *
   * @param locationId Identificador da localização que será excluída.
   */
  async function remove(locationId: string) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await locationService.deleteLocation(locationId);
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
    remove,
  };
}
