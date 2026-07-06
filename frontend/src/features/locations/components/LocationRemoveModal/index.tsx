
import type { Location } from '../../types/location'
import { Hint, Message, RemoveModal } from './styles'

interface LocationRemoveModalProps {
  location?: Location
  open: boolean
  confirmLoading?: boolean
  onCancel: () => void
  onConfirm: () => void
}


/**
 * Modal de confirmação para exclusão de uma localização.
 *
 * Exibe o nome e o código da localização selecionada, informa que a ação
 * não poderá ser desfeita e delega a confirmação para o componente pai.
 *
 * @param location Localização selecionada para exclusão.
 * @param open Define se o modal está visível.
 * @param confirmLoading Indica carregamento durante a confirmação da exclusão.
 * @param onCancel Função chamada ao cancelar o modal.
 * @param onConfirm Função chamada ao confirmar a exclusão.
 */
export function LocationRemoveModal({
  location,
  open,
  confirmLoading,
  onCancel,
  onConfirm,
}: LocationRemoveModalProps) {
  const locationLabel = location ? `${location.name} (${location.code})` : 'este local'

  return (
    <RemoveModal
      centered
      open={open}
      title="Excluir local"
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
      <Message>Deseja excluir "{locationLabel}"?</Message>
      <Hint>Essa ação não poderá ser desfeita.</Hint>
    </RemoveModal>
  )
}
