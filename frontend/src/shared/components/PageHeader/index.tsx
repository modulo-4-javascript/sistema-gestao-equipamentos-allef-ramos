import { AddOutlined } from '@mui/icons-material'
import type { ReactNode } from 'react'
import { BrandButton, Container, Description, Title } from './styles'

interface PageHeaderProps {
  title: string
  description: string
  actionLabel?: string
  actionIcon?: ReactNode
  onAction?: () => void
}

export function PageHeader({
  title,
  description,
  actionLabel,
  actionIcon,
  onAction,
}: PageHeaderProps) {
  return (
    <Container>
      <div>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>

      {actionLabel && onAction && (
        <BrandButton
          type="primary"
          icon={actionIcon ?? <AddOutlined fontSize="small" />}
          onClick={onAction}
        >
          {actionLabel}
        </BrandButton>
      )}
    </Container>
  )
}
