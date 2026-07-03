import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { Button, Input, Select } from 'antd'
import { Field, FieldLabel, FilterCard, FiltersGrid } from './styles'

interface ResourceFiltersProps<StatusValue extends string, TypeValue extends string> {
  searchText: string
  selectedStatus?: StatusValue
  selectedType?: TypeValue
  statusOptions: StatusValue[]
  typeOptions: TypeValue[]
  getStatusLabel: (status: StatusValue) => string
  getTypeLabel: (type: TypeValue) => string
  searchLabel?: string
  searchPlaceholder: string
  statusLabel?: string
  typeLabel?: string
  typePlaceholder: string
  onSearchChange: (value: string) => void
  onStatusChange: (value?: StatusValue) => void
  onTypeChange: (value?: TypeValue) => void
  onClear: () => void
}

export function ResourceFilters<StatusValue extends string, TypeValue extends string>({
  searchText,
  selectedStatus,
  selectedType,
  statusOptions,
  typeOptions,
  getStatusLabel,
  getTypeLabel,
  searchLabel = 'Busca',
  searchPlaceholder,
  statusLabel = 'Status',
  typeLabel = 'Tipo',
  typePlaceholder,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onClear,
}: ResourceFiltersProps<StatusValue, TypeValue>) {
  return (
    <FilterCard styles={{ body: { padding: 24 } }}>
      <FiltersGrid>
        <Field>
          <FieldLabel>{searchLabel}</FieldLabel>
          <Input
            allowClear
            prefix={<SearchOutlined fontSize="small" />}
            placeholder={searchPlaceholder}
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>{statusLabel}</FieldLabel>
          <Select
            allowClear
            placeholder="Todos"
            value={selectedStatus}
            onChange={(value?: StatusValue) => onStatusChange(value)}
            options={statusOptions.map((status) => ({
              label: getStatusLabel(status),
              value: status,
            }))}
            style={{ width: '100%' }}
          />
        </Field>

        <Field>
          <FieldLabel>{typeLabel}</FieldLabel>
          <Select
            allowClear
            placeholder={typePlaceholder}
            value={selectedType}
            onChange={(value?: TypeValue) => onTypeChange(value)}
            options={typeOptions.map((type) => ({
              label: getTypeLabel(type),
              value: type,
            }))}
            style={{ width: '100%' }}
          />
        </Field>

        <Button onClick={onClear}>Limpar filtros</Button>
      </FiltersGrid>
    </FilterCard>
  )
}
