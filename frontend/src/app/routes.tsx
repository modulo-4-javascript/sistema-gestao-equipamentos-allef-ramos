import { Navigate, Route, Routes } from 'react-router-dom'
import { EquipamentosPage } from '../features/equipamentos/pages/EquipamentosPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/equipamentos" replace />} />

      {/* Esta rota permite acessar a tela principal da feature */}
      <Route path="/equipamentos" element={<EquipamentosPage />} />

      {/* TODO: vamos criar a rota de detalhes durante uma próxima aula */}
      <Route path="*" element={<Navigate to="/equipamentos" replace />} />
    </Routes>
  )
}
