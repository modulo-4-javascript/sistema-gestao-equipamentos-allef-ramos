import BlockOutlined from '@mui/icons-material/BlockOutlined'
import BuildOutlined from '@mui/icons-material/BuildOutlined'
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined'
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined'
import PinDropOutlined from '@mui/icons-material/PinDropOutlined'
import { CardContent, CardHeader, Grid, IconBox, Label, SummaryCard, Value } from './styles'

export type SummaryIconName =
  | 'total'
  | 'available'
  | 'maintenance'
  | 'inactive'
  | 'active'
  | 'location'
  | 'equipment'

export interface SummaryCardItem {
  id: string
  title: string
  value: number
  icon: SummaryIconName
  lineColor: string
  iconBackground: string
}

interface SummaryCardsProps {
  ariaLabel: string
  summaries: SummaryCardItem[]
}

function renderSummaryIcon(icon: SummaryIconName) {
  if (icon === 'available' || icon === 'active') {
    return <CheckCircleOutlineOutlined fontSize="small" />
  }

  if (icon === 'maintenance') {
    return <BuildOutlined fontSize="small" />
  }

  if (icon === 'inactive') {
    return <BlockOutlined fontSize="small" />
  }

  if (icon === 'location') {
    return <PinDropOutlined fontSize="small" />
  }

  return <Inventory2Outlined fontSize="small" />
}

export function SummaryCards({ ariaLabel, summaries }: SummaryCardsProps) {
  return (
    <Grid aria-label={ariaLabel}>
      {summaries.map((summary) => (
        <SummaryCard
          key={summary.id}
          $lineColor={summary.lineColor}
          styles={{ body: { padding: 25 } }}
        >
          <CardContent>
            <CardHeader>
              <Label>{summary.title}</Label>
              <IconBox $iconBackground={summary.iconBackground}>
                {renderSummaryIcon(summary.icon)}
              </IconBox>
            </CardHeader>

            <Value>{summary.value}</Value>
          </CardContent>
        </SummaryCard>
      ))}
    </Grid>
  )
}
