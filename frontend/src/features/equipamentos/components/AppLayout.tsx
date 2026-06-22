import type { ReactNode } from 'react'
import { Layout } from 'antd'
import { SideNav } from './SideNav'
import { TopBar } from './TopBar'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Layout className="den-layout">
      <SideNav />

      <Layout className="den-content-layout">
        <TopBar />
        <Layout.Content className="den-main">{children}</Layout.Content>
      </Layout>
    </Layout>
  )
}
