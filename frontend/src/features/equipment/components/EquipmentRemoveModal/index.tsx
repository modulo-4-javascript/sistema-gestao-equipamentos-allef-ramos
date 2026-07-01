import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import { Modal } from 'antd'
import type { Equipment } from '../../types/equipment'
import { Content, EquipmentName, Hint, IconBox, Message, WarningBox } from './styles'

interface EquipmentRemoveModalProps {
  equipment?: Equipment
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function EquipmentRemoveModal({
  equipment,
  open,
  onCancel,
  onConfirm,
}: EquipmentRemoveModalProps) {
  return (
    <Modal
      open={open}
      title="Remover equipamento"
      okText="Remover"
      cancelText="Cancelar"
      okButtonProps={{ danger: true }}
      onCancel={onCancel}
      onOk={onConfirm}
    >
      <WarningBox>
        <IconBox>
          <DeleteOutlineOutlined fontSize="small" />
        </IconBox>

        <Content>
          <Message>
            Você está removendo{' '}
            <EquipmentName>{equipment?.name ?? 'este equipamento'}</EquipmentName> da listagem.
          </Message>
          <Hint>
            Esta confirmação ainda é apenas visual. A remoção real será conectada quando existir
            integração com a API.
          </Hint>
        </Content>
      </WarningBox>
    </Modal>
  )
}
