import { Tag } from 'antd'
import styled from 'styled-components'
import type { StatusPillTone } from './index'

interface StatusTagProps {
  $tone: StatusPillTone
}

function getTextColor(tone: StatusPillTone) {
  if (tone === 'success') {
    return '#007c8c'
  }

  if (tone === 'info') {
    return '#002a64'
  }

  return '#6b7280'
}

function getBackgroundColor(tone: StatusPillTone) {
  if (tone === 'success') {
    return '#e6fffb'
  }

  if (tone === 'info') {
    return '#e6f4ff'
  }

  return '#f3f4f6'
}

function getBorderColor(tone: StatusPillTone) {
  if (tone === 'success') {
    return '#b5f5ec'
  }

  if (tone === 'info') {
    return '#bae0ff'
  }

  return '#dde6ee'
}

export const StatusTag = styled(Tag)<StatusTagProps>`
  &.ant-tag {
    margin: 0;
    min-height: 20px;
    padding: 2px 10px;
    color: ${({ $tone }) => getTextColor($tone)};
    background: ${({ $tone }) => getBackgroundColor($tone)};
    border-color: ${({ $tone }) => getBorderColor($tone)};
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
  }
`
