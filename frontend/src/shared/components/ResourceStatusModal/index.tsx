import { Form, Input, Select } from 'antd'
import { useEffect } from 'react'
import { CurrentStatusText, StatusModal } from '../ResourceModalStyles'

export interface ResourceStatusFormValues<StatusValue extends string> {
  note?: string
  status: StatusValue
}

interface ResourceStatusModalProps<StatusValue extends string> {
  confirmLoading?: boolean
  currentStatus?: StatusValue
  currentStatusPrefix: string
  getStatusLabel: (status: StatusValue) => string
  notePlaceholder: string
  open: boolean
  statusLabel: string
  statusOptions: StatusValue[]
  title: string
  onCancel: () => void
  onSubmit: (values: ResourceStatusFormValues<StatusValue>) => void
}

export function ResourceStatusModal<StatusValue extends string>({
  confirmLoading,
  currentStatus,
  currentStatusPrefix,
  getStatusLabel,
  notePlaceholder,
  open,
  statusLabel,
  statusOptions,
  title,
  onCancel,
  onSubmit,
}: ResourceStatusModalProps<StatusValue>) {
  const [form] = Form.useForm<ResourceStatusFormValues<StatusValue>>()

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        status: currentStatus,
        note: '',
      } as ResourceStatusFormValues<StatusValue>)
    }
  }, [currentStatus, form, open])

  function handleSubmit() {
    form
      .validateFields()
      .then((values) => onSubmit(values))
      .catch(() => undefined)
  }

  return (
    <StatusModal
      centered
      destroyOnHidden
      open={open}
      title={title}
      okText="Salvar"
      cancelText="Cancelar"
      confirmLoading={confirmLoading}
      width={480}
      maskStyle={{
        backdropFilter: 'blur(2px)',
        background: 'rgb(0 0 0 / 45%)',
      }}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={statusLabel}
          name="status"
          rules={[{ required: true, message: `Selecione ${statusLabel.toLowerCase()}.` }]}
        >
          <Select
            placeholder={`${statusLabel}...`}
            options={statusOptions.map((status) => ({
              label: getStatusLabel(status),
              value: status,
            }))}
          />
        </Form.Item>

        <Form.Item label="Observação" name="note">
          <Input.TextArea placeholder={notePlaceholder} />
        </Form.Item>
      </Form>

      <CurrentStatusText>
        {currentStatusPrefix}: {currentStatus ? getStatusLabel(currentStatus) : '-'}
      </CurrentStatusText>
    </StatusModal>
  )
}
