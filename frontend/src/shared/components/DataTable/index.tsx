import { Table } from 'antd'
import type { TableProps } from 'antd'
import { TableCard } from './styles'

interface DataTableProps<RecordData extends object> {
  columns: TableProps<RecordData>['columns']
  dataSource: RecordData[]
  emptyText: string
  loading?: boolean
  pagination?: TableProps<RecordData>['pagination']
  rowKey: TableProps<RecordData>['rowKey']
  onRowDoubleClick?: (record: RecordData) => void
}

export function DataTable<RecordData extends object>({
  columns,
  dataSource,
  emptyText,
  loading,
  pagination,
  rowKey,
  onRowDoubleClick,
}: DataTableProps<RecordData>) {
  return (
    <TableCard styles={{ body: { padding: 0 } }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        locale={{ emptyText }}
        pagination={pagination}
        rowKey={rowKey}
        size="middle"
        tableLayout="fixed"
        scroll={{ x: 'max-content', y: 'clamp(280px, 42vh, 520px)' }}
        onRow={(record) => ({
          onDoubleClick: () => onRowDoubleClick?.(record),
        })}
      />
    </TableCard>
  )
}
