import { Button } from 'antd'
import styled from 'styled-components'

interface HeaderContainerProps {
  $hasBackAction: boolean
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  align-items: ${({ $hasBackAction }) => ($hasBackAction ? 'flex-start' : 'center')};
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const TitleGroup = styled.div`
  min-width: 0;
`

export const BackButton = styled(Button)`
  &.ant-btn {
    margin-bottom: 16px;
    padding-inline: 0;
    color: #6b7280;
    font-weight: 600;
  }
`

export const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`

export const Title = styled.h2`
  margin: 0;
  color: #111827;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
`

export const DetailLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
`

export const Code = styled.span`
  color: #6b7280;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
`

export const Dot = styled.span`
  margin-right: 12px;
  color: #6b7280;
  font-size: 14px;
  line-height: 20px;
`

export const MutedText = styled.span`
  color: #6b7280;
  font-size: 14px;
  line-height: 20px;
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 900px) {
    justify-content: flex-start;
  }
`

export const BrandButton = styled(Button)`
  &.ant-btn {
    border: 0;
    color: #ffffff;
    background: linear-gradient(90deg, #1f5ca8, #007c8c);
    box-shadow: 0 4px 8px rgb(0 42 100 / 12%);
  }

  &.ant-btn:hover,
  &.ant-btn:focus {
    color: #ffffff !important;
    background: linear-gradient(90deg, #1f5ca8, #007c8c) !important;
  }
`
