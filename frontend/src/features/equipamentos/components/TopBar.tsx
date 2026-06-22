import { Breadcrumb, Layout } from 'antd'

export function TopBar() {
  return (
    <Layout.Header className="den-topbar">
      <Breadcrumb
        className="den-breadcrumb"
        items={[
          {
            title: 'Equipamentos',
          },
        ]}
      />
    </Layout.Header>
  )
}
