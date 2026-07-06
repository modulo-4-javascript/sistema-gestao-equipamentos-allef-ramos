import { StatusTag } from './styles'

export type StatusPillTone = 'success' | 'info' | 'muted'

interface StatusPillProps {
  label: string
  tone: StatusPillTone
}

export function StatusPill({ label, tone }: StatusPillProps) {
  return <StatusTag $tone={tone}>{label}</StatusTag>
}
