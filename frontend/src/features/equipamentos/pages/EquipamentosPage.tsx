import { message } from 'antd'
import { useState } from 'react'
import { AppLayout } from '../components/AppLayout'
import { EquipmentFilters } from '../components/EquipmentFilters'
import { EquipmentTable } from '../components/EquipmentTable'
import { PageHeader } from '../components/PageHeader'
import { SummaryCards } from '../components/SummaryCards'
import {
  equipamentosMock,
  resumoEquipamentosMock,
  statusOptions,
  tipoOptions,
} from '../mocks/equipamentos.mock'
import type { EquipmentStatus, EquipmentType } from '../types/equipamento'

export function EquipamentosPage() {
  const [messageApi, contextHolder] = message.useMessage()
  const [searchText, setSearchText] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<EquipmentStatus>()
  const [selectedType, setSelectedType] = useState<EquipmentType>()

  function handleCreateEquipment() {
    // TODO: vamos completar essa parte durante a aula
    messageApi.info('O formulário de novo equipamento será criado junto com a turma.')
  }

  function handleClearFilters() {
    setSearchText('')
    setSelectedStatus(undefined)
    setSelectedType(undefined)
  }

  // TODO: vamos completar essa parte durante a aula aplicando filtros nos mocks
  const equipamentosVisiveis = equipamentosMock

  return (
    <AppLayout>
      {contextHolder}
      <section className="equipment-page">
        <PageHeader onCreateEquipment={handleCreateEquipment} />

        <SummaryCards summaries={resumoEquipamentosMock} />

        <EquipmentFilters
          searchText={searchText}
          selectedStatus={selectedStatus}
          selectedType={selectedType}
          statusOptions={statusOptions}
          typeOptions={tipoOptions}
          onSearchChange={setSearchText}
          onStatusChange={setSelectedStatus}
          onTypeChange={setSelectedType}
          onClear={handleClearFilters}
        />

        <EquipmentTable equipments={equipamentosVisiveis} />
      </section>
    </AppLayout>
  )
}
