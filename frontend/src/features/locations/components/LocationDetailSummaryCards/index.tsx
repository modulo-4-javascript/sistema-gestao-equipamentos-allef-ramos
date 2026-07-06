import { DetailSummaryCards } from '../../../../shared/components/DetailSummaryCards'
import type { LocationDetailSummary } from '../../types/location'

interface LocationDetailSummaryCardsProps {
  summaries: LocationDetailSummary[]
}

export function LocationDetailSummaryCards({
  summaries,
}: LocationDetailSummaryCardsProps) {
  return (
    <DetailSummaryCards
      ariaLabel="Resumo da localização"
      summaries={summaries.map((summary) => ({
        ...summary,
        tone: summary.id === 'status' ? 'success' : 'default',
      }))}
    />
  )
}
