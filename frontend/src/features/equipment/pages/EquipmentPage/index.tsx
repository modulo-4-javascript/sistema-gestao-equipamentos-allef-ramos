import { message } from 'antd'
import { useState } from 'react'
import { AppLayout } from '../../../../app/layout/AppLayout'
import { EquipmentDetailsModal } from '../../components/EquipmentDetailsModal'
import { EquipmentFilters } from '../../components/EquipmentFilters'
import { EquipmentFormModal } from '../../components/EquipmentFormModal'
import type { EquipmentFormMode } from '../../components/EquipmentFormModal'
import { EquipmentRemoveModal } from '../../components/EquipmentRemoveModal'
import { EquipmentTable } from '../../components/EquipmentTable'
import { PageHeader } from '../../components/PageHeader'
import { SummaryCards } from '../../components/SummaryCards'
import {
  equipmentMock,
  equipmentSummaryMock,
  statusOptions,
  typeOptions,
} from '../../mocks/equipment.mock'
import type { Equipment, EquipmentStatus, EquipmentType } from '../../types/equipment'
import { Container } from './styles'

export function EquipmentPage() {
  const [messageApi, contextHolder] = message.useMessage()

  // Estados dos filtros. Cada campo da área de filtros controla um estado aqui.
  const [searchText, setSearchText] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<EquipmentStatus>()
  const [selectedType, setSelectedType] = useState<EquipmentType>()
  const [formMode, setFormMode] = useState<EquipmentFormMode>('create')
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [equipmentInForm, setEquipmentInForm] = useState<Equipment>()
  const [equipmentInDetails, setEquipmentInDetails] = useState<Equipment>()
  const [equipmentToRemove, setEquipmentToRemove] = useState<Equipment>()

  function handleCreateEquipment() {
    setFormMode('create')
    setEquipmentInForm(undefined)
    setIsFormModalOpen(true)
  }

  function handleEditEquipment(equipment: Equipment) {
    setFormMode('edit')
    setEquipmentInForm(equipment)
    setIsFormModalOpen(true)
  }

  function handleViewEquipment(equipment: Equipment) {
    setEquipmentInDetails(equipment)
  }

  function handleCloseFormModal() {
    setIsFormModalOpen(false)
    setEquipmentInForm(undefined)
  }

  function handleSubmitFormModal() {
    const feedback =
      formMode === 'edit'
        ? 'Alterações simuladas com sucesso.'
        : 'Cadastro simulado com sucesso.'

    messageApi.success(feedback)
    handleCloseFormModal()
  }

  function handleEditFromDetails(equipment: Equipment) {
    setEquipmentInDetails(undefined)
    handleEditEquipment(equipment)
  }

  function handleConfirmRemoveEquipment() {
    messageApi.success('Remoção simulada com sucesso.')
    setEquipmentToRemove(undefined)
  }

  function handleClearFilters() {
    // Limpa todos os filtros e volta a tabela para o estado inicial.
    setSearchText('')
    setSelectedStatus(undefined)
    setSelectedType(undefined)
  }

  // AULA 05 - parte prática:
  // Primeiro deixamos a lista sem filtro para a tela aparecer.
  const visibleEquipment = equipmentMock

  return (
    <AppLayout currentPage="Equipamentos">
      {contextHolder}
      <Container>
        {/* Cabeçalho da feature: título, descrição e botão principal. */}
        <PageHeader onCreateEquipment={handleCreateEquipment} />

        {/* Cards de resumo: usam dados mockados para simular indicadores do sistema. */}
        <SummaryCards summaries={equipmentSummaryMock} />

        {/* Filtros controlados: os valores ficam nesta página e são enviados por props. */}
        <EquipmentFilters
          searchText={searchText}
          selectedStatus={selectedStatus}
          selectedType={selectedType}
          statusOptions={statusOptions}
          typeOptions={typeOptions}
          onSearchChange={setSearchText}
          onStatusChange={setSelectedStatus}
          onTypeChange={setSelectedType}
          onClear={handleClearFilters}
        />

        {/* Tabela principal: recebe a lista que, depois, será filtrada. */}
        <EquipmentTable
          equipments={visibleEquipment}
          onEditEquipment={handleEditEquipment}
          onRemoveEquipment={setEquipmentToRemove}
          onViewEquipment={handleViewEquipment}
        />

        <EquipmentFormModal
          equipment={equipmentInForm}
          mode={formMode}
          open={isFormModalOpen}
          statusOptions={statusOptions}
          typeOptions={typeOptions}
          onCancel={handleCloseFormModal}
          onSubmit={handleSubmitFormModal}
        />

        <EquipmentDetailsModal
          equipment={equipmentInDetails}
          open={Boolean(equipmentInDetails)}
          onCancel={() => setEquipmentInDetails(undefined)}
          onEdit={handleEditFromDetails}
        />

        <EquipmentRemoveModal
          equipment={equipmentToRemove}
          open={Boolean(equipmentToRemove)}
          onCancel={() => setEquipmentToRemove(undefined)}
          onConfirm={handleConfirmRemoveEquipment}
        />
      </Container>
    </AppLayout>
  )
}
