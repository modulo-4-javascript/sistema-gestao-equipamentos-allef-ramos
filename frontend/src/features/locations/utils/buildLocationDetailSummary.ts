import { formatNullableText } from "./formatNullableText";
import {
  formatLocationDate,
  getLocationStatusLabel,
  getLocationTypeLabel,
  type LocationDetails,
} from "../types/location";
import type { ResourceDetailSummaryItem } from "../../../shared/components/ResourceDetailsSummaryCards";

/**
 * Monta os cards de resumo da página de detalhes de localização.
 *
 * A API devolve os dados completos da localização; esta função seleciona
 * os principais campos que devem ser destacados nos cards superiores.
 *
 * @param location Dados detalhados da localização.
 * @returns Lista de cards de resumo formatada para exibição.
 */
export function buildDetailSummary(
  location: LocationDetails,
): ResourceDetailSummaryItem[] {
  return [
    {
      id: "type",
      title: "Tipo",
      value: getLocationTypeLabel(location.type),
    },
    {
      id: "building",
      title: "Prédio",
      value: formatNullableText(location.building),
    },
    ...(location.room
      ? [
          {
            id: "room",
            title: "Sala",
            value: formatNullableText(location.room),
          },
        ]
      : []),
    {
      id: "equipmentCount",
      title: "Equipamentos",
      value: location.equipmentCount,
    },
    {
      id: "status",
      title: "Status",
      value: getLocationStatusLabel(location.status),
      colorConfig: {
        value: {
          color: location.status === "ACTIVE" ? "#25B8A7" : "#6B7280",
        },
      },
    },
    {
      id: "updatedAt",
      title: "Atualizado",
      value: formatLocationDate(location.updatedAt),
      // description: "Última alteração",
    },
  ];
}
