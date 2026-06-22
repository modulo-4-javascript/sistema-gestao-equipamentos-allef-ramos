import { Button, Card, Input, Select } from 'antd'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import type { EquipmentStatus, EquipmentType } from '../types/equipamento'

interface EquipmentFiltersProps {
  searchText: string
  selectedStatus?: EquipmentStatus
  selectedType?: EquipmentType
  statusOptions: EquipmentStatus[]
  typeOptions: EquipmentType[]
  onSearchChange: (value: string) => void
  onStatusChange: (value?: EquipmentStatus) => void
  onTypeChange: (value?: EquipmentType) => void
  onClear: () => void
}

export function EquipmentFilters({
  searchText,
  selectedStatus,
  selectedType,
  statusOptions,
  typeOptions,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onClear,
}: EquipmentFiltersProps) {
  return (
    <Card className="equipment-filters" styles={{ body: { padding: 24 } }}>
      <div className="equipment-filters__grid">
        <label>
          <span className="field-label">Busca</span>
          <Input
            allowClear
            prefix={<SearchOutlined fontSize="small" />}
            placeholder="Nome, modelo ou ID..."
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <label>
          <span className="field-label">Status</span>
          <Select
            allowClear
            placeholder="Todos"
            value={selectedStatus}
            onChange={(value?: EquipmentStatus) => onStatusChange(value)}
            options={statusOptions.map((status) => ({
              label: status,
              value: status,
            }))}
            style={{ width: '100%' }}
          />
        </label>

        <label>
          <span className="field-label">Tipo</span>
          <Select
            allowClear
            placeholder="Selecione um tipo..."
            value={selectedType}
            onChange={(value?: EquipmentType) => onTypeChange(value)}
            options={typeOptions.map((type) => ({
              label: type,
              value: type,
            }))}
            style={{ width: '100%' }}
          />
        </label>

        <Button onClick={onClear}>Limpar filtros</Button>
      </div>
    </Card>
  )
}
