import { StatusPill } from '../../../../shared/components/StatusPill'
import { getEquipmentStatusLabel, type EquipmentStatus } from '../../types/equipment'

interface StatusBadgeProps {
  status: EquipmentStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const tone = status === 'AVAILABLE' ? 'success' : status === 'IN_MAINTENANCE' ? 'info' : 'muted'

  return <StatusPill label={getEquipmentStatusLabel(status)} tone={tone} />
}
