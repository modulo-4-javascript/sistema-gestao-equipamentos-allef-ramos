import { Form, Input, Modal, Select } from 'antd'
import type { Equipment, EquipmentStatus, EquipmentType } from '../../types/equipment'
import { FormGrid, FullField, HelperText, ModalIntro } from './styles'

export type EquipmentFormMode = 'create' | 'edit'

interface EquipmentFormModalProps {
  equipment?: Equipment
  mode: EquipmentFormMode
  open: boolean
  statusOptions: EquipmentStatus[]
  typeOptions: EquipmentType[]
  onCancel: () => void
  onSubmit: () => void
}

const emptyEquipmentForm = {
  id: '',
  name: '',
  type: undefined,
  model: '',
  status: 'Disponível',
  location: '',
  lastUpdate: '',
  serialNumber: '',
}

export function EquipmentFormModal({
  equipment,
  mode,
  open,
  statusOptions,
  typeOptions,
  onCancel,
  onSubmit,
}: EquipmentFormModalProps) {
  const isEditing = mode === 'edit'
  const initialValues = equipment ?? emptyEquipmentForm

  return (
    <Modal
      destroyOnHidden
      open={open}
      title={isEditing ? 'Editar equipamento' : 'Novo equipamento'}
      okText={isEditing ? 'Salvar alterações' : 'Cadastrar equipamento'}
      cancelText="Cancelar"
      width={760}
      onCancel={onCancel}
      onOk={onSubmit}
      centered
    >
      <ModalIntro>
        {isEditing
          ? 'Atualize os dados principais do equipamento. Por enquanto, esta ação só simula o fluxo visual.'
          : 'Preencha os dados principais para simular o cadastro de um novo equipamento.'}
      </ModalIntro>

      <Form
        key={`${mode}-${equipment?.id ?? 'empty'}`}
        layout="vertical"
        initialValues={initialValues}
      >
        <FormGrid>
          <Form.Item label="Código" name="id">
            <Input placeholder="EQP-000" />
          </Form.Item>

          <Form.Item label="Número de série" name="serialNumber">
            <Input placeholder="Informe o número de série" />
          </Form.Item>

          <FullField>
            <Form.Item label="Nome do equipamento" name="name">
              <Input placeholder="Ex: Notebook Dell" />
            </Form.Item>
          </FullField>

          <Form.Item label="Tipo" name="type">
            <Select
              placeholder="Selecione um tipo"
              options={typeOptions.map((type) => ({
                label: type,
                value: type,
              }))}
            />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select
              placeholder="Selecione um status"
              options={statusOptions.map((status) => ({
                label: status,
                value: status,
              }))}
            />
          </Form.Item>

          <Form.Item label="Modelo" name="model">
            <Input placeholder="Informe o modelo" />
          </Form.Item>

          <Form.Item label="Localização" name="location">
            <Input placeholder="Ex: Lab 01" />
          </Form.Item>

          <FullField>
            <Form.Item label="Última atualização" name="lastUpdate">
              <Input placeholder="Ex: 24 Out 2023" />
            </Form.Item>
          </FullField>
        </FormGrid>
      </Form>

      <HelperText>
        Os campos ainda não são enviados para uma API. A confirmação fecha o modal e mostra um
        feedback visual.
      </HelperText>
    </Modal>
  )
}
