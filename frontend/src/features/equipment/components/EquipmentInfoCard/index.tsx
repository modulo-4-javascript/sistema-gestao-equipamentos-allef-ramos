import { DetailInfoCard } from '../../../../shared/components/DetailInfoCard'
import {
  formatEquipmentDate,
  getEquipmentTypeLabel,
  type EquipmentDetail,
} from '../../types/equipment'
import { Avatar, Responsible } from './styles'

interface EquipmentInfoCardProps {
  equipment: EquipmentDetail
}

export function EquipmentInfoCard({ equipment }: EquipmentInfoCardProps) {
  const responsibleLabel = equipment.responsibleUserName ?? 'Equipe de patrimônio'

  return (
    <DetailInfoCard
      title="Informações gerais"
      items={[
        {
          label: 'Tipo',
          value: getEquipmentTypeLabel(equipment.type),
        },
        {
          label: 'Modelo',
          value: equipment.model ?? 'Não informado',
        },
        {
          label: 'S/N (Serial Number)',
          value: equipment.serialNumber ?? 'Não informado',
        },
        {
          label: 'Localização',
          value: equipment.locationName ?? 'Sem localização',
        },
        {
          label: 'Responsável',
          value: (
            <Responsible>
              <Avatar>{responsibleLabel.slice(0, 2).toUpperCase()}</Avatar>
              {responsibleLabel}
            </Responsible>
          ),
        },
        {
          label: 'Data de cadastro',
          value: formatEquipmentDate(equipment.createdAt),
        },
        {
          label: 'Última atualização',
          value: formatEquipmentDate(equipment.updatedAt),
        },
      ]}
    />
  )
}
