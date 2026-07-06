import { Alert, Button, Spin } from 'antd'
import {
  getEquipmentStatusLabel,
  type EquipmentSummaryResponse,
} from '../../../equipment/types/equipment'
import type { LocationEquipment } from '../../types/location'
import {
  CardTitle,
  Event,
  EventDescription,
  EventEyebrow,
  EventTitle,
  HeaderDivider,
  ListCard,
  StateBox,
  Timeline,
} from './styles'

interface LocationEquipmentCardProps {
  equipment: LocationEquipment[]
  equipmentSummary: EquipmentSummaryResponse
  loading?: boolean
  errorMessage?: string
  onViewAllEquipment: () => void
  onViewEquipment: (equipment: LocationEquipment) => void
}

function buildSummaryDescription(summary: EquipmentSummaryResponse) {
  return `${summary.available} disponíveis, ${summary.inMaintenance} em manutenção e ${summary.inactive} inativos`
}

export function LocationEquipmentCard({
  equipment,
  equipmentSummary,
  loading,
  errorMessage,
  onViewAllEquipment,
  onViewEquipment,
}: LocationEquipmentCardProps) {
  const visibleEquipment = equipment.slice(0, 2)

  return (
    <ListCard styles={{ body: { padding: 24 } }}>
      <CardTitle>Equipamentos neste local</CardTitle>
      <HeaderDivider />

      {errorMessage && (
        <Alert
          showIcon
          message="Erro ao carregar equipamentos vinculados"
          description={errorMessage}
          type="error"
        />
      )}

      {loading ? (
        <StateBox>
          <Spin /> Carregando equipamentos...
        </StateBox>
      ) : errorMessage ? null : (
        <Timeline>
          <Event $active>
            <EventEyebrow>Resumo</EventEyebrow>
            <EventTitle>{equipmentSummary.total} equipamentos</EventTitle>
            <EventDescription>{buildSummaryDescription(equipmentSummary)}</EventDescription>
          </Event>

          {visibleEquipment.map((item) => (
            <Event key={item.id}>
              <EventEyebrow>{item.name}</EventEyebrow>
              <Button type="link" onClick={() => onViewEquipment(item)}>
                {item.code}
              </Button>
              <EventDescription>
                {getEquipmentStatusLabel(item.status)}
                {item.model ? ` - ${item.model}` : ''}
              </EventDescription>
            </Event>
          ))}

          {equipmentSummary.total === 0 ? (
            <Event>
              <EventEyebrow>Sem equipamentos</EventEyebrow>
              <EventTitle>Nenhum vínculo</EventTitle>
              <EventDescription>Este local ainda não possui equipamentos.</EventDescription>
            </Event>
          ) : (
            <Event>
              <EventEyebrow>Ver todos</EventEyebrow>
              <Button type="link" onClick={onViewAllEquipment}>
                Abrir equipamentos
              </Button>
              <EventDescription>Lista de equipamentos cadastrados</EventDescription>
            </Event>
          )}
        </Timeline>
      )}
    </ListCard>
  )
}
