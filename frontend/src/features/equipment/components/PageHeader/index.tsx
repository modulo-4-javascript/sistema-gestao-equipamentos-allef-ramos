import AddOutlined from '@mui/icons-material/AddOutlined'
import { BrandButton, Container, Description, Title } from './styles'

interface PageHeaderProps {
  // A página passa a ação do botão por props.
  // Assim, este componente só cuida da parte visual do cabeçalho.
  onCreateEquipment: () => void
}

export function PageHeader({ onCreateEquipment }: PageHeaderProps) {
  return (
    <Container>
      <div>
        <Title>Equipamentos</Title>
        <Description>Gerencie os equipamentos cadastrados no laboratório.</Description>
      </div>

      <BrandButton
        type="primary"
        icon={<AddOutlined fontSize="small" />}
        onClick={onCreateEquipment}
      >
        Novo equipamento
      </BrandButton>
    </Container>
  )
}
