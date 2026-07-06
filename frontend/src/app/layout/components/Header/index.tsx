import { HeaderContainer, PageBreadcrumb } from './styles'

interface HeaderProps {
  breadcrumbItems?: string[]
  currentPage: string
}

export function Header({ breadcrumbItems, currentPage }: HeaderProps) {
  const items = breadcrumbItems ?? [currentPage]

  return (
    <HeaderContainer>
      <PageBreadcrumb
        items={items.map((item) => ({
          title: item,
        }))}
      />
    </HeaderContainer>
  )
}
