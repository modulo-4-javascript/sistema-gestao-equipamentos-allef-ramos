import { DetailTextCard } from '../../../../shared/components/DetailTextCard'

interface EquipmentNotesCardProps {
  notes?: string | null
}

export function EquipmentNotesCard({ notes }: EquipmentNotesCardProps) {
  return (
    <DetailTextCard
      emptyText="Nenhuma observação cadastrada."
      text={notes}
      title="Observações"
    />
  )
}
