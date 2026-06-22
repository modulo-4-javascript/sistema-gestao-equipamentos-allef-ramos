import { Layout, Menu } from 'antd'
import PinDropOutlined from '@mui/icons-material/PinDropOutlined'
import PrecisionManufacturingOutlined from '@mui/icons-material/PrecisionManufacturingOutlined'
import { useLocation, useNavigate } from 'react-router-dom'

export function SideNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Layout.Sider className="den-sider" width={280}>
      <div className="den-logo">
        <h1 className="den-logo__title">DenkenHub</h1>
        <p className="den-logo__subtitle">Gestão de recursos</p>
      </div>

      <Menu
        className="den-nav"
        mode="inline"
        selectedKeys={[location.pathname.startsWith('/equipamentos') ? '/equipamentos' : '']}
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: '/equipamentos',
            icon: <PrecisionManufacturingOutlined fontSize="small" />,
            label: 'Equipamentos',
          },
          {
            key: '/localizacoes',
            icon: <PinDropOutlined fontSize="small" />,
            label: 'Localizações',
            disabled: true,
          },
        ]}
      />
    </Layout.Sider>
  )
}
