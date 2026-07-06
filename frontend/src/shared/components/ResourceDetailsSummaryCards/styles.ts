import { Card } from 'antd'
import styled from 'styled-components'

interface TextStyleProps {
  $color?: string
  $opacity?: number
}

export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export const SummaryCard = styled(Card)`
  &.ant-card {
    border-color: #dde6ee;
    box-shadow: 0 1px 2px rgb(17 24 39 / 5%);
  }
`

export const Label = styled.span<TextStyleProps>`
  display: block;
  color: ${({ $color }) => $color ?? '#6b7280'};
  opacity: ${({ $opacity }) => $opacity ?? 1};
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
`

export const Value = styled.strong<TextStyleProps>`
  display: block;
  margin-top: 6px;
  color: ${({ $color }) => $color ?? '#111827'};
  opacity: ${({ $opacity }) => $opacity ?? 1};
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`

export const Description = styled.span<TextStyleProps>`
  display: block;
  margin-top: 4px;
  color: ${({ $color }) => $color ?? '#6b7280'};
  opacity: ${({ $opacity }) => $opacity ?? 1};
  font-size: 12px;
  line-height: 18px;
`