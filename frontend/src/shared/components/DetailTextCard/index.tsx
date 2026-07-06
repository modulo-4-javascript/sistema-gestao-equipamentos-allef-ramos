import { HeaderDivider, NotesCard, NotesText, Title } from './styles'

interface DetailTextCardProps {
  emptyText: string
  text?: string | null
  title: string
}

export function DetailTextCard({ emptyText, text, title }: DetailTextCardProps) {
  return (
    <NotesCard styles={{ body: { padding: 24 } }}>
      <Title>{title}</Title>
      <HeaderDivider />
      <NotesText>{text || emptyText}</NotesText>
    </NotesCard>
  )
}
