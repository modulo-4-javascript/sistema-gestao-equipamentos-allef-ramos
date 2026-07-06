import { Card } from 'antd'
import styled from 'styled-components'

interface ValueProps {
  $tech?: boolean
}

export const InfoCard = styled(Card)`
  &.ant-card {
    border-color: #dde6ee;
    border-radius: 8px;
    box-shadow:
      0 1px 2px rgb(17 24 39 / 6%),
      0 8px 20px rgb(17 24 39 / 4%);
  }
`

export const Title = styled.h3`
  margin: 0;
  color: #111827;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
`

export const HeaderDivider = styled.div`
  height: 1px;
  margin: 16px 0 24px;
  background: #dde6ee;
`

export const DescriptionList = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 40px;
  margin: 0;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export const Detail = styled.div`
  min-width: 0;
`

export const Term = styled.dt`
  margin: 0 0 4px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`

export const Value = styled.dd<ValueProps>`
  margin: 0;
  color: #111827;
  font-family: ${({ $tech }) =>
    $tech ? "'SFMono-Regular', Consolas, 'Liberation Mono', monospace" : 'inherit'};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`

export const FieldInline = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

export const CountBadge = styled.span`
  display: inline-flex;
  min-width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  padding: 0 7px;
  color: #002a64;
  background: #e1e8fd;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
`
