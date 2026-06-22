import { Tag } from 'antd'
import type { EquipmentStatus } from '../types/equipamento'

const statusClassByName: Record<EquipmentStatus, string> = {
  Disponível: 'status-tag--available',
  'Em manutenção': 'status-tag--maintenance',
  Inativo: 'status-tag--inactive',
}

interface StatusBadgeProps {
  status: EquipmentStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Tag className={`status-tag ${statusClassByName[status]}`}>{status}</Tag>
}
