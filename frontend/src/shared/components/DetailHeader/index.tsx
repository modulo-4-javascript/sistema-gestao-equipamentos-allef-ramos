import type { ReactNode } from 'react'
import { Button } from 'antd'
import {
  Actions,
  BackButton,
  BrandButton,
  Code,
  DetailLine,
  Dot,
  HeaderContainer,
  MutedText,
  Title,
  TitleGroup,
  TitleRow,
} from './styles'

export interface DetailHeaderAction {
  danger?: boolean
  icon?: ReactNode
  label: string
  onClick: () => void
  variant?: 'primary' | 'default'
}

export interface DetailHeaderBackAction {
  icon?: ReactNode
  label: string
  onClick: () => void
}

interface DetailHeaderProps {
  actions: DetailHeaderAction[]
  backAction?: DetailHeaderBackAction
  code?: string
  metadata?: ReactNode[]
  status?: ReactNode
  title: string
}

export function DetailHeader({
  actions,
  backAction,
  code,
  metadata = [],
  status,
  title,
}: DetailHeaderProps) {
  const visibleMetadata = metadata.filter(Boolean)

  return (
    <HeaderContainer $hasBackAction={Boolean(backAction)}>
      <TitleGroup>
        {backAction && (
          <BackButton
            icon={backAction.icon}
            type="text"
            onClick={backAction.onClick}
          >
            {backAction.label}
          </BackButton>
        )}

        <TitleRow>
          <Title>{title}</Title>
          {status}
        </TitleRow>

        {(code || visibleMetadata.length > 0) && (
          <DetailLine>
            {code && <Code>{code}</Code>}

            {visibleMetadata.map((item, index) => (
              <span key={index}>
                {(code || index > 0) && <Dot>•</Dot>}
                <MutedText>{item}</MutedText>
              </span>
            ))}
          </DetailLine>
        )}
      </TitleGroup>

      <Actions>
        {actions.map((action) =>
          action.variant === 'primary' ? (
            <BrandButton
              key={action.label}
              icon={action.icon}
              type="primary"
              onClick={action.onClick}
            >
              {action.label}
            </BrandButton>
          ) : (
            <Button
              danger={action.danger}
              icon={action.icon}
              key={action.label}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ),
        )}
      </Actions>
    </HeaderContainer>
  )
}
