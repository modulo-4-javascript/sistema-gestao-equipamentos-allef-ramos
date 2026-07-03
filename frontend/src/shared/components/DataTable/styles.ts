import { Button, Card } from 'antd'
import styled from 'styled-components'

export const TableCard = styled(Card)`
  &.ant-card {
    border-color: #dde6ee;
    box-shadow: 0 1px 2px rgb(17 24 39 / 5%);
    overflow: hidden;
  }

  .ant-table-body {
    max-height: clamp(280px, 42vh, 520px);
  }

  .ant-table-thead > tr > th {
    font-weight: 700;
  }

  .ant-table-placeholder .ant-table-cell {
    height: clamp(280px, 42vh, 520px);
  }

  .ant-pagination {
    padding: 0 16px;
  }
`

export const ResourceCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const ResourceIcon = styled.span`
  display: inline-flex;
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  align-items: center;
  justify-content: center;
  color: #002a64;
  background: #e6f4ff;
  border-radius: 8px;
`

export const ResourceName = styled.strong`
  display: block;
  overflow: hidden;
  color: #111827;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ResourceCode = styled.small`
  display: block;
  color: #6b7280;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 12px;
  line-height: 18px;
`

export const ActionButton = styled(Button)`
  &.ant-btn {
    color: #6b7280;
  }
`
