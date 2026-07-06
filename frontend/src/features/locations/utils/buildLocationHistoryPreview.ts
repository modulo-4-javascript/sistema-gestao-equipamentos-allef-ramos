import type {
  LocationHistoryItem,
  ResourceHistoryPreviewItem,
} from "../types/location";

/**
 * Converte o histórico retornado pela API para o formato visual
 * usado pelo card de histórico recente.
 *
 * @param history Lista de eventos de histórico da localização.
 * @param limit Quantidade máxima de itens exibidos no preview.
 * @returns Lista reduzida e formatada para exibição.
 */
export function buildLocationHistoryPreview(
  history: LocationHistoryItem[],
  limit = 3,
): ResourceHistoryPreviewItem[] {
  return history.slice(0, limit).map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    createdAt: event.createdAt,
  }));
}
