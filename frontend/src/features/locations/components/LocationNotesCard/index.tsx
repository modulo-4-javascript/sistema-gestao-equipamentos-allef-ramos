import { DetailTextCard } from '../../../../shared/components/DetailTextCard'

interface LocationNotesCardProps {
  description?: string | null
}

export function LocationNotesCard({ description }: LocationNotesCardProps) {
  return (
    <DetailTextCard
      emptyText="Nenhuma descrição cadastrada."
      text={description}
      title="Descrição"
    />
  )
}
