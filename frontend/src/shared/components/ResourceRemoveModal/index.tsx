import { Hint, Message, RemoveModal } from '../ResourceModalStyles'

interface ResourceRemoveModalProps {
  confirmLoading?: boolean
  hint: string
  message: string
  open: boolean
  title: string
  onCancel: () => void
  onConfirm: () => void
}

export function ResourceRemoveModal({
  confirmLoading,
  hint,
  message,
  open,
  title,
  onCancel,
  onConfirm,
}: ResourceRemoveModalProps) {
  return (
    <RemoveModal
      centered
      open={open}
      title={title}
      okText="Excluir"
      cancelText="Cancelar"
      confirmLoading={confirmLoading}
      okButtonProps={{ danger: true }}
      width={440}
      maskStyle={{
        backdropFilter: 'blur(2px)',
        background: 'rgb(0 0 0 / 45%)',
      }}
      onCancel={onCancel}
      onOk={onConfirm}
    >
      <Message>{message}</Message>
      <Hint>{hint}</Hint>
    </RemoveModal>
  )
}
