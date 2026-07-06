import { Card } from 'antd'
import styled from 'styled-components'

export const NotesCard = styled(Card)`
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
  margin: 16px 0;
  background: #dde6ee;
`

export const NotesText = styled.p`
  margin: 0;
  padding: 16px;
  color: #4b5563;
  background: #f9f9ff;
  border: 1px solid #dde6ee;
  border-radius: 6px;
  font-size: 14px;
  line-height: 22px;
`
