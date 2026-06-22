import { Button } from 'antd'
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined'

interface PageHeaderProps {
  onCreateEquipment: () => void
}

export function PageHeader({ onCreateEquipment }: PageHeaderProps) {
  return (
    <header className="equipment-page-header">
      <div>
        <h2 className="equipment-page-title">Equipamentos</h2>
        <p className="equipment-page-description">
          Gerencie os equipamentos cadastrados no laboratório.
        </p>
      </div>

      <Button
        className="brand-action"
        type="primary"
        icon={<AddCircleOutlineOutlined fontSize="small" />}
        onClick={onCreateEquipment}
      >
        Novo equipamento
      </Button>
    </header>
  )
}
