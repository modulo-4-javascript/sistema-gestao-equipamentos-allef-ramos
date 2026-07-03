import { Tag } from 'antd'
import styled from 'styled-components'
import type { LocationStatus } from '../../types/location'

interface LocationStatusTagProps {
  $status: LocationStatus
}

export const Container = styled.section`
  width: 100%;
  max-width: 1440px;
`

function getStatusTextColor(status: LocationStatus) {
  return status === 'ACTIVE' ? '#007c8c' : '#6b7280'
}

function getStatusBackgroundColor(status: LocationStatus) {
  return status === 'ACTIVE' ? '#e6fffb' : '#f3f4f6'
}

function getStatusBorderColor(status: LocationStatus) {
  return status === 'ACTIVE' ? '#b5f5ec' : '#dde6ee'
}

export const LocationStatusTag = styled(Tag)<LocationStatusTagProps>`
  &.ant-tag {
    margin: 0;
    color: ${({ $status }) => getStatusTextColor($status)};
    background: ${({ $status }) => getStatusBackgroundColor($status)};
    border-color: ${({ $status }) => getStatusBorderColor($status)};
    border-radius: 999px;
    font-weight: 600;
  }
`
