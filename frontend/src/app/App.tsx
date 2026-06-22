import { ConfigProvider } from 'antd'
import ptBR from 'antd/locale/pt_BR'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'

function App() {
  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        token: {
          colorPrimary: '#002A64',
          colorInfo: '#007C8C',
          colorSuccess: '#25B8A7',
          colorText: '#111827',
          colorTextSecondary: '#6B7280',
          colorBgLayout: '#F9F9FF',
          colorBgContainer: '#FFFFFF',
          colorBorder: '#DDE6EE',
          borderRadius: 8,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        components: {
          Button: {
            controlHeight: 40,
            borderRadius: 8,
          },
          Card: {
            borderRadiusLG: 8,
          },
          Table: {
            headerBg: '#FFFFFF',
            headerColor: '#6B7280',
            rowHoverBg: '#F4F7FA',
          },
        },
      }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
