import type { ReactNode } from 'react'

import { Description, Grid, Label, SummaryCard, Value } from './styles'

interface TextColorConfig {
  color?: string
  opacity?: number
}

interface SummaryColorConfig {
  general?: TextColorConfig
  title?: TextColorConfig
  value?: TextColorConfig
  description?: TextColorConfig
}

export interface ResourceDetailSummaryItem {
  id: string
  title: string
  value: ReactNode
  description?: ReactNode
  colorConfig?: SummaryColorConfig
}

interface ResourceDetailSummaryCardsProps {
  ariaLabel: string
  summaries: ResourceDetailSummaryItem[]
  colorConfig?: SummaryColorConfig
}

function getTextColorConfig(
  generalConfig?: SummaryColorConfig,
  itemConfig?: SummaryColorConfig,
  field?: keyof Pick<SummaryColorConfig, 'title' | 'value' | 'description'>,
): TextColorConfig {
  return {
    ...generalConfig?.general,
    ...generalConfig?.[field ?? 'title'],
    ...itemConfig?.general,
    ...itemConfig?.[field ?? 'title'],
  }
}

export function ResourceDetailSummaryCards({
  ariaLabel,
  summaries,
  colorConfig,
}: ResourceDetailSummaryCardsProps) {
  return (
    <Grid aria-label={ariaLabel}>
      {summaries.map((summary) => {
        const titleConfig = getTextColorConfig(
          colorConfig,
          summary.colorConfig,
          'title',
        )

        const valueConfig = getTextColorConfig(
          colorConfig,
          summary.colorConfig,
          'value',
        )

        const descriptionConfig = getTextColorConfig(
          colorConfig,
          summary.colorConfig,
          'description',
        )

        return (
          <SummaryCard key={summary.id} styles={{ body: { padding: 16 } }}>
            <Label
              $color={titleConfig.color}
              $opacity={titleConfig.opacity}
            >
              {summary.title}
            </Label>

            <Value
              $color={valueConfig.color}
              $opacity={valueConfig.opacity}
            >
              {summary.value}
            </Value>

            {summary.description && (
              <Description
                $color={descriptionConfig.color}
                $opacity={descriptionConfig.opacity}
              >
                {summary.description}
              </Description>
            )}
          </SummaryCard>
        )
      })}
    </Grid>
  )
}