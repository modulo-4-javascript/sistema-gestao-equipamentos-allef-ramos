import { Card } from 'antd'
import styled from 'styled-components'

interface GridProps {
  $columns: 4 | 6
}

interface ValueProps {
  $tone: 'default' | 'success'
}

export const Grid = styled.section<GridProps>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export const SummaryCard = styled(Card)`
  &.ant-card {
    min-height: 84px;
    border-color: #dde6ee;
    border-radius: 8px;
    box-shadow:
      0 1px 2px rgb(17 24 39 / 6%),
      0 8px 20px rgb(17 24 39 / 4%);
  }
`

export const Label = styled.span`
  display: block;
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`

export const Value = styled.strong<ValueProps>`
  display: block;
  margin-top: 4px;
  color: ${({ $tone }) => ($tone === 'success' ? '#25b8a7' : '#111827')};
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`

export const Description = styled.span`
  display: block;
  margin-top: 4px;
  color: #6b7280;
  font-size: 12px;
  line-height: 18px;
`
