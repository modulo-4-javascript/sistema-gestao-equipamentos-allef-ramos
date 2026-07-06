import { formatLocationDate } from '../../types/location'
import type { ResourceHistoryPreviewItem } from '../../types/location'
import {
  DateText,
  Description,
  Event,
  EventTitle,
  HistoryCard,
  Timeline,
  Title,
} from './styles'

interface LocationHistoryCardProps {
  history: ResourceHistoryPreviewItem[]
  hasMore?: boolean
  onViewMore?: () => void
}

export function LocationHistoryCard({
  history,
  hasMore,
  onViewMore,
}: LocationHistoryCardProps) {
  const hasHistory = history.length > 0

  return (
    <HistoryCard styles={{ body: { padding: 24 } }}>
      <Title>Histórico recente</Title>

      <Timeline>
        {!hasHistory && (
          <Event>
            <DateText>Nenhum registro</DateText>
            <EventTitle>Sem histórico disponível</EventTitle>
            <Description>
              Ainda não há eventos registrados para esta localização.
            </Description>
          </Event>
        )}

        {history.map((event) => (
          <Event key={event.id}>
            <DateText>{formatLocationDate(event.createdAt)}</DateText>
            <EventTitle>{event.title}</EventTitle>
            <Description>
              {event.description || 'Sem descrição informada.'}
            </Description>
          </Event>
        ))}

        {hasMore && (
          <Event
            role="button"
            tabIndex={0}
            onClick={onViewMore}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                onViewMore?.()
              }
            }}
          >
            <DateText>Ver mais</DateText>
            <EventTitle>Histórico completo</EventTitle>
            <Description>
              Acesse todos os eventos registrados para esta localização.
            </Description>
          </Event>
        )}
      </Timeline>
    </HistoryCard>
  )
}
