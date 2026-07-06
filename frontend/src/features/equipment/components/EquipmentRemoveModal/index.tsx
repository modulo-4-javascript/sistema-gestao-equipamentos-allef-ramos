import { ResourceRemoveModal } from '../../../../shared/components/ResourceRemoveModal'
import type { Equipment } from '../../types/equipment'

interface EquipmentRemoveModalProps {
  equipment?: Equipment
  open: boolean
  confirmLoading?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function EquipmentRemoveModal({
  equipment,
  open,
  confirmLoading,
  onCancel,
  onConfirm,
}: EquipmentRemoveModalProps) {
  const equipmentLabel = equipment ? `${equipment.name} ${equipment.model}` : 'este equipamento'

  return (
    <ResourceRemoveModal
      confirmLoading={confirmLoading}
      hint="Essa ação não poderá ser desfeita."
      message={`Deseja excluir "${equipmentLabel}"?`}
      open={open}
      title="Excluir equipamento"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  )
}
