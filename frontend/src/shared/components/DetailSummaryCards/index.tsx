import { Description, Grid, Label, SummaryCard, Value } from './styles'

export interface DetailSummaryCardItem {
  description?: string
  id: string
  title: string
  tone?: 'default' | 'success'
  value: string
}

interface DetailSummaryCardsProps {
  ariaLabel: string
  columns?: 4 | 6
  summaries: DetailSummaryCardItem[]
}

export function DetailSummaryCards({
  ariaLabel,
  columns = 4,
  summaries,
}: DetailSummaryCardsProps) {
  return (
    <Grid $columns={columns} aria-label={ariaLabel}>
      {summaries.map((summary) => (
        <SummaryCard key={summary.id} styles={{ body: { padding: 16 } }}>
          <Label>{summary.title}</Label>
          <Value $tone={summary.tone ?? 'default'}>{summary.value}</Value>
          {summary.description && <Description>{summary.description}</Description>}
        </SummaryCard>
      ))}
    </Grid>
  )
}
