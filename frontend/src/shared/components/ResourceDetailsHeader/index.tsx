import ArrowBackOutlined from '@mui/icons-material/ArrowBackOutlined'
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import { Button } from 'antd'

import {
  Actions,
  BackButton,
  BrandButton,
  Code,
  HeaderContainer,
  Title,
  TitleGroup,
  TitleRow,
} from './styles'

interface ResourceDetailsHeaderProps {
  title: string
  code: string
  backLabel: string
  status: React.ReactNode
  editLabel?: string
  changeStatusLabel?: string
  removeLabel?: string
  onBack: () => void
  onChangeStatus: () => void
  onEdit: () => void
  onRemove: () => void
}

export function ResourceDetailsHeader({
  title,
  code,
  backLabel,
  status,
  editLabel = 'Editar',
  changeStatusLabel = 'Alterar status',
  removeLabel = 'Excluir',
  onBack,
  onChangeStatus,
  onEdit,
  onRemove,
}: ResourceDetailsHeaderProps) {
  return (
    <HeaderContainer>
      <TitleGroup>
        <BackButton
          icon={<ArrowBackOutlined fontSize="small" />}
          type="text"
          onClick={onBack}
        >
          {backLabel}
        </BackButton>

        <TitleRow>
          <Title>{title}</Title>
          {status}
        </TitleRow>

        <Code>{code}</Code>
      </TitleGroup>

      <Actions>
        <BrandButton
          type="primary"
          icon={<EditOutlined fontSize="small" />}
          onClick={onEdit}
        >
          {editLabel}
        </BrandButton>

        <Button
          icon={<AutorenewOutlined fontSize="small" />}
          onClick={onChangeStatus}
        >
          {changeStatusLabel}
        </Button>

        <Button
          danger
          icon={<DeleteOutlineOutlined fontSize="small" />}
          onClick={onRemove}
        >
          {removeLabel}
        </Button>
      </Actions>
    </HeaderContainer>
  )
}