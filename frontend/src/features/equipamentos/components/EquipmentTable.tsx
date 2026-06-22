import { Button, Card, Dropdown, Table } from 'antd'
import ComputerOutlined from '@mui/icons-material/ComputerOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import MoreHorizOutlined from '@mui/icons-material/MoreHorizOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import type { TableProps } from 'antd'
import type { Equipment } from '../types/equipamento'
import { StatusBadge } from './StatusBadge'

interface EquipmentTableProps {
  equipments: Equipment[]
}

const actionLabelByKey: Record<string, string> = {
  view: 'visualizar',
  edit: 'editar',
  remove: 'remover',
}

function handleActionClick(action: string, equipmentName: string) {
  window.alert(
    `Ação "${actionLabelByKey[action]}" para ${equipmentName}. Vamos implementar essa parte durante a aula.`,
  )
}

const columns: TableProps<Equipment>['columns'] = [
  {
    title: 'Equipamento',
    dataIndex: 'name',
    key: 'name',
    render: (_, equipment) => (
      <div className="equipment-cell">
        <span className="equipment-cell__icon">
          <ComputerOutlined fontSize="small" />
        </span>
        <span>
          <strong className="equipment-cell__name">{equipment.name}</strong>
          <small className="equipment-cell__id">{equipment.id}</small>
        </span>
      </div>
    ),
  },
  {
    title: 'Tipo',
    dataIndex: 'type',
    key: 'type',
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
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Última Atualização',
    dataIndex: 'lastUpdate',
    key: 'lastUpdate',
  },
  {
    title: 'Ações',
    key: 'actions',
    align: 'right',
    render: (_, equipment) => (
      <Dropdown
        trigger={['click']}
        menu={{
          onClick: ({ key }) => handleActionClick(String(key), equipment.name),
          items: [
            {
              key: 'view',
              icon: <VisibilityOutlined fontSize="small" />,
              label: 'Visualizar',
            },
            {
              key: 'edit',
              icon: <EditOutlined fontSize="small" />,
              label: 'Editar',
            },
            {
              key: 'remove',
              icon: <DeleteOutlineOutlined fontSize="small" />,
              label: 'Remover',
              danger: true,
            },
          ],
        }}
      >
        <Button
          aria-label={`Abrir ações de ${equipment.name}`}
          className="table-action-button"
          icon={<MoreHorizOutlined fontSize="small" />}
          type="text"
        />
      </Dropdown>
    ),
  },
]

export function EquipmentTable({ equipments }: EquipmentTableProps) {
  return (
    <Card className="equipment-table-card" styles={{ body: { padding: 0 } }}>
      {/* Este componente foi separado para reaproveitarmos em outras telas */}
      <Table
        columns={columns}
        dataSource={equipments}
        pagination={false}
        rowKey="id"
        scroll={{ x: 980 }}
      />
    </Card>
  )
}
