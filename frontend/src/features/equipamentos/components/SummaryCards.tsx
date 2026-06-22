import { Card } from 'antd'
import BlockOutlined from '@mui/icons-material/BlockOutlined'
import BuildOutlined from '@mui/icons-material/BuildOutlined'
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined'
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined'
import type { CSSProperties } from 'react'
import type { EquipmentSummary, SummaryIconName } from '../types/equipamento'

interface SummaryCardsProps {
  summaries: EquipmentSummary[]
}

function renderSummaryIcon(icon: SummaryIconName) {
  if (icon === 'available') {
    return <CheckCircleOutlineOutlined fontSize="small" />
  }

  if (icon === 'maintenance') {
    return <BuildOutlined fontSize="small" />
  }

  if (icon === 'inactive') {
    return <BlockOutlined fontSize="small" />
  }

  return <Inventory2Outlined fontSize="small" />
}

export function SummaryCards({ summaries }: SummaryCardsProps) {
  return (
    <section className="summary-grid" aria-label="Resumo dos equipamentos">
      {summaries.map((summary) => {
        const summaryStyle = {
          '--summary-line': summary.lineColor,
          '--summary-icon-bg': summary.iconBackground,
        } as CSSProperties

        return (
          <Card
            className="summary-card"
            key={summary.id}
            styles={{ body: { padding: 25 } }}
            style={summaryStyle}
          >
            <div className="summary-card__content">
              <div className="summary-card__header">
                <span className="summary-card__label">{summary.title}</span>
                <span className="summary-card__icon">{renderSummaryIcon(summary.icon)}</span>
              </div>

              <strong className="summary-card__value">{summary.value}</strong>
            </div>
          </Card>
        )
      })}
    </section>
  )
}
