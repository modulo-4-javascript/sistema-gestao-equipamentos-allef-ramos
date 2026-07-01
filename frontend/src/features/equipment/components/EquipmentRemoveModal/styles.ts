import styled from 'styled-components'

export const WarningBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`

export const IconBox = styled.span`
  display: inline-flex;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  align-items: center;
  justify-content: center;
  color: #b42318;
  background: #fef3f2;
  border-radius: 8px;
`

export const Content = styled.div`
  min-width: 0;
`

export const Message = styled.p`
  margin: 0;
  color: #111827;
  font-size: 14px;
  line-height: 22px;
`

export const EquipmentName = styled.strong`
  color: #111827;
  font-weight: 700;
`

export const Hint = styled.p`
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 13px;
  line-height: 20px;
`
