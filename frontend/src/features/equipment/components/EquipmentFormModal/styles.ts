import styled from 'styled-components'

export const ModalIntro = styled.p`
  margin: 0 0 24px;
  color: #6b7280;
  font-size: 14px;
  line-height: 22px;
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 16px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export const FullField = styled.div`
  grid-column: 1 / -1;
`

export const HelperText = styled.p`
  margin: -4px 0 0;
  color: #6b7280;
  font-size: 12px;
  line-height: 18px;
`
