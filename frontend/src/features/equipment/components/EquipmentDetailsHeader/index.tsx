import ArrowBackOutlined from '@mui/icons-material/ArrowBackOutlined'
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import { DetailHeader } from '../../../../shared/components/DetailHeader'
import type { EquipmentDetail } from '../../types/equipment'
import { EquipmentStatusBadge } from '../EquipmentStatusBadge'

interface EquipmentDetailsHeaderProps {
  equipment: EquipmentDetail
  onBack: () => void
  onChangeStatus: () => void
  onEdit: () => void
  onRemove: () => void
}

export function EquipmentDetailsHeader({
  equipment,
  onBack,
  onChangeStatus,
  onEdit,
  onRemove,
}: EquipmentDetailsHeaderProps) {
  return (
    <DetailHeader
      code={equipment.code}
      title={equipment.name}
      status={<EquipmentStatusBadge status={equipment.status} />}
      backAction={{
        icon: <ArrowBackOutlined fontSize="small" />,
        label: 'Voltar para equipamentos',
        onClick: onBack,
      }}
      actions={[
        {
          icon: <EditOutlined fontSize="small" />,
          label: 'Editar',
          onClick: onEdit,
          variant: 'primary',
        },
        {
          icon: <AutorenewOutlined fontSize="small" />,
          label: 'Alterar status',
          onClick: onChangeStatus,
        },
        {
          danger: true,
          icon: <DeleteOutlineOutlined fontSize="small" />,
          label: 'Excluir',
          onClick: onRemove,
        },
      ]}
    />
  )
}
