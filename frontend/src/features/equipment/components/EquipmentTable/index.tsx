import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined'
import ComputerOutlined from '@mui/icons-material/ComputerOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import MoreHorizOutlined from '@mui/icons-material/MoreHorizOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import { Dropdown } from 'antd'
import type { TableProps } from 'antd'
import { DataTable } from '../../../../shared/components/DataTable'
import {
  ActionButton,
  ResourceCell,
  ResourceCode,
  ResourceIcon,
  ResourceName,
} from '../../../../shared/components/DataTable/styles'
import {
  formatEquipmentDate,
  getEquipmentTypeLabel,
  type Equipment,
} from '../../types/equipment'
import { StatusBadge } from '../StatusBadge'

interface EquipmentTableProps {
  equipments: Equipment[]
  loading?: boolean
  pagination?: TableProps<Equipment>['pagination']
  onChangeStatusEquipment: (equipment: Equipment) => void
  onEditEquipment: (equipment: Equipment) => void
  onRemoveEquipment: (equipment: Equipment) => void
  onViewEquipment?: (equipment: Equipment) => void
}

interface EquipmentTableActions {
  onChangeStatusEquipment: (equipment: Equipment) => void
  onEditEquipment: (equipment: Equipment) => void
  onRemoveEquipment: (equipment: Equipment) => void
  onViewEquipment?: (equipment: Equipment) => void
}

// As colunas dizem para o Ant Design como a tabela deve montar cada campo.
function getColumns({
  onChangeStatusEquipment,
  onEditEquipment,
  onRemoveEquipment,
  onViewEquipment,
}: EquipmentTableActions): TableProps<Equipment>['columns'] {
  return [
    {
      title: 'Equipamento',
      dataIndex: 'name',
      key: 'name',
      render: (_, equipment) => (
        // Render customizado: em vez de mostrar só texto, criamos ícone + nome + ID.
        <ResourceCell>
          <ResourceIcon>
            <ComputerOutlined fontSize="small" />
          </ResourceIcon>
          <span>
            <ResourceName>{equipment.name}</ResourceName>
            <ResourceCode>{equipment.code}</ResourceCode>
          </span>
        </ResourceCell>
      ),
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (type: Equipment['type']) => getEquipmentTypeLabel(type),
    },
    {
      title: 'Modelo',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Equipment['status']) => <StatusBadge status={status} />,
    },
    {
      title: 'Localização',
      dataIndex: 'locationName',
      key: 'location',
      render: (_, equipment) => equipment.locationName ?? 'Sem localização',
    },
    {
      title: 'Última Atualização',
      dataIndex: 'updatedAt',
      key: 'lastUpdate',
      render: (updatedAt: Equipment['updatedAt']) => formatEquipmentDate(updatedAt),
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'right',
      render: (_, equipment) => (
        // Menu de ações. Ainda está visual, mas já prepara a conversa sobre CRUD.
        <Dropdown
          trigger={['click']}
          menu={{
            onClick: ({ key }) => {
              if (key === 'view' && onViewEquipment) {
                onViewEquipment(equipment)
              }

              if (key === 'edit') {
                onEditEquipment(equipment)
              }

              if (key === 'status') {
                onChangeStatusEquipment(equipment)
              }

              if (key === 'remove') {
                onRemoveEquipment(equipment)
              }
            },
            items: [
              ...(onViewEquipment
                ? [
                    {
                      key: 'view',
                      icon: <VisibilityOutlined fontSize="small" />,
                      label: 'Visualizar',
                    },
                  ]
                : []),
              {
                key: 'edit',
                icon: <EditOutlined fontSize="small" />,
                label: 'Editar',
              },
              {
                key: 'status',
                icon: <AutorenewOutlined fontSize="small" />,
                label: 'Alterar status',
              },
              {
                key: 'remove',
                icon: <DeleteOutlineOutlined fontSize="small" />,
                label: 'Excluir',
                danger: true,
              },
            ],
          }}
        >
          <ActionButton
            aria-label={`Abrir ações de ${equipment.name}`}
            icon={<MoreHorizOutlined fontSize="small" />}
            type="text"
          />
        </Dropdown>
      ),
    },
  ]
}

export function EquipmentTable({
  equipments,
  loading,
  pagination,
  onChangeStatusEquipment,
  onEditEquipment,
  onRemoveEquipment,
  onViewEquipment,
}: EquipmentTableProps) {
  return (
    <DataTable
      columns={getColumns({
        onChangeStatusEquipment,
        onEditEquipment,
        onRemoveEquipment,
        onViewEquipment,
      })}
      dataSource={equipments}
      emptyText="Nenhum equipamento encontrado."
      loading={loading}
      pagination={pagination}
      rowKey="id"
    />
  )
}
