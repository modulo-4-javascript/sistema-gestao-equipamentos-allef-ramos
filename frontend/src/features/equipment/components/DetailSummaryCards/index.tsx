import { DetailSummaryCards as SharedDetailSummaryCards } from '../../../../shared/components/DetailSummaryCards'
import type { EquipmentDetailSummary } from '../../types/equipment'

interface DetailSummaryCardsProps {
  summaries: EquipmentDetailSummary[]
}

export function DetailSummaryCards({ summaries }: DetailSummaryCardsProps) {
  return <SharedDetailSummaryCards ariaLabel="Resumo do equipamento" summaries={summaries} />
}
