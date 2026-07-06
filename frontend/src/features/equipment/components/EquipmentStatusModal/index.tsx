import { ResourceStatusModal } from '../../../../shared/components/ResourceStatusModal'
import type { ResourceStatusFormValues } from '../../../../shared/components/ResourceStatusModal'
import {
  getEquipmentStatusLabel,
  type Equipment,
  type EquipmentStatus,
} from '../../types/equipment'

export type EquipmentStatusFormValues = ResourceStatusFormValues<EquipmentStatus>

interface EquipmentStatusModalProps {
  equipment?: Equipment
  confirmLoading?: boolean
  open: boolean
  statusOptions: EquipmentStatus[]
  onCancel: () => void
  onSubmit: (values: EquipmentStatusFormValues) => void
}

export function EquipmentStatusModal({
  equipment,
  confirmLoading,
  open,
  statusOptions,
  onCancel,
  onSubmit,
}: EquipmentStatusModalProps) {
  return (
    <ResourceStatusModal
      confirmLoading={confirmLoading}
      currentStatus={equipment?.status}
      currentStatusPrefix="Status atual"
      getStatusLabel={getEquipmentStatusLabel}
      notePlaceholder="Ex: equipamento enviado para manutenção preventiva."
      open={open}
      statusLabel="Novo status"
      statusOptions={statusOptions}
      title="Alterar status"
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  )
}
