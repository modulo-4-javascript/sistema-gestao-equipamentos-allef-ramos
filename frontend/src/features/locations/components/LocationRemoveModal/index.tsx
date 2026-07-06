import { ResourceRemoveModal } from '../../../../shared/components/ResourceRemoveModal'
import type { LocationDetails } from '../../types/location'

interface LocationRemoveModalProps {
  location?: LocationDetails
  open: boolean
  confirmLoading?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function LocationRemoveModal({
  location,
  open,
  confirmLoading,
  onCancel,
  onConfirm,
}: LocationRemoveModalProps) {
  const locationLabel = location ? `${location.code} - ${location.name}` : 'este local'

  return (
    <ResourceRemoveModal
      confirmLoading={confirmLoading}
      hint="Locais com equipamentos vinculados não podem ser excluídos."
      message={`Deseja excluir "${locationLabel}"?`}
      open={open}
      title="Excluir local"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  )
}
