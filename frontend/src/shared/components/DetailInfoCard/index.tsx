import type { ReactNode } from 'react'
import {
  CountBadge,
  DescriptionList,
  Detail,
  FieldInline,
  HeaderDivider,
  InfoCard,
  Term,
  Title,
  Value,
} from './styles'

export interface DetailInfoItem {
  countBadge?: number
  label: string
  tech?: boolean
  value: ReactNode
}

interface DetailInfoCardProps {
  items: DetailInfoItem[]
  title: string
}

export function DetailInfoCard({ items, title }: DetailInfoCardProps) {
  return (
    <InfoCard styles={{ body: { padding: 24 } }}>
      <Title>{title}</Title>
      <HeaderDivider />

      <DescriptionList>
        {items.map((item) => (
          <Detail key={item.label}>
            <Term>{item.label}</Term>
            <Value $tech={item.tech}>
              {typeof item.countBadge === 'number' ? (
                <FieldInline>
                  <CountBadge>{item.countBadge}</CountBadge>
                  {item.value}
                </FieldInline>
              ) : (
                item.value
              )}
            </Value>
          </Detail>
        ))}
      </DescriptionList>
    </InfoCard>
  )
}
