import { StatusPill } from '../../../../shared/components/StatusPill'
import { getEquipmentStatusLabel, type EquipmentStatus } from '../../types/equipment'

interface EquipmentStatusBadgeProps {
  status: EquipmentStatus
}

export function EquipmentStatusBadge({ status }: EquipmentStatusBadgeProps) {
  const tone = status === 'AVAILABLE' ? 'success' : status === 'IN_MAINTENANCE' ? 'info' : 'muted'

  return <StatusPill label={getEquipmentStatusLabel(status)} tone={tone} />
}
