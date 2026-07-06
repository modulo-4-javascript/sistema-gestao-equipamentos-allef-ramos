import { Form, Input, Select } from "antd";
import { useEffect } from "react";
import {
  getLocationStatusLabel,
  getLocationTypeLabel,
  type Location,
  type LocationStatus,
  type LocationType,
} from "../../types/location";
import { FormGrid, FormModal, FullField } from "./styles";

export type LocationFormMode = "create" | "edit";

export interface LocationFormValues {
  name: string;
  type: LocationType;
  code: string;
  building?: string;
  floor?: string;
  room?: string;
  description?: string;
  status: LocationStatus;
}

interface LocationFormModalProps {
  location?: Location;
  confirmLoading?: boolean;
  mode?: LocationFormMode;
  open: boolean;
  statusOptions: LocationStatus[];
  typeOptions: LocationType[];
  onCancel: () => void;
  onSubmit: (values: LocationFormValues) => void;
}

const emptyLocationForm: Partial<LocationFormValues> = {
  name: "",
  type: undefined,
  code: "",
  building: "",
  floor: "",
  room: "",
  description: "",
  status: undefined,
};

export function LocationFormModal({
  location,
  confirmLoading,
  mode = "create",
  open,
  statusOptions,
  typeOptions,
  onCancel,
  onSubmit,
}: LocationFormModalProps) {
  const [form] = Form.useForm();
  const isEditing = mode === "edit";

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue(
        location
          ? {
              name: location.name,
              type: location.type,
              code: location.code,
              building: location.building,
              room: location.room,
              floor: location.floor,
              description: location.description,
              status: location.status,
            }
          : emptyLocationForm,
      );
    }
  }, [location, form, open]);

  function handleSubmit() {
    form
      .validateFields()
      .then((values: LocationFormValues) => {
        // Fluxo da aula: formulário -> payload -> service -> API -> atualização da tela.
        onSubmit(values);
      })
      .catch(() => undefined);
  }

  return (
    <FormModal
      centered
      destroyOnHidden
      open={open}
      title={isEditing ? "Editar localização" : "Nova localização"}
      okText="Salvar"
      cancelText="Cancelar"
      confirmLoading={confirmLoading}
      width={800}
      styles={{
        mask: { backdropFilter: "blur(2px)", background: "rgb(0 0 0 / 45%)" },
      }}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        key={`${mode}-${location?.id ?? "empty"}`}
        layout="vertical"
        initialValues={emptyLocationForm}
        requiredMark={false}
      >
        <FormGrid>
          <Form.Item
            label="Nome de exibição *"
            name="name"
            rules={[
              {
                required: true,
                message: "Informe o nome de exibição da localização.",
              },
            ]}
          >
            <Input placeholder="Ex: Almoxarifado principal, Sala de TI, Linha 01" />
          </Form.Item>

          <Form.Item
            label="Tipo *"
            name="type"
            rules={[
              {
                required: true,
                message: "Informe o tipo da localização.",
              },
            ]}
          >
            <Select
              placeholder="Selecione o tipo..."
              options={typeOptions.map((type) => ({
                label: getLocationTypeLabel(type),
                value: type,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Código *"
            name="code"
            rules={[
              {
                required: true,
                message: "Selecione o código do local.",
              },
            ]}
          >
            <Input placeholder="Ex: LOC-001, SALA-TI, LINHA-01" />
          </Form.Item>

          <Form.Item label="Prédio" name="building">
            <Input placeholder="Ex: Prédio administrativo, Galpão 01" />
          </Form.Item>

          <Form.Item label="Andar" name="floor">
            <Input placeholder="Ex: Térreo, 1º andar, 2º pavimento" />
          </Form.Item>

          <Form.Item label="Sala ou ambiente" name="room">
            <Input placeholder="Ex: Sala 204, Laboratório, Área de produção" />
          </Form.Item>

          <Form.Item
            label="Status *"
            name="status"
            rules={[
              {
                required: true,
                message: "Selecione o status do local.",
              },
            ]}
          >
            <Select
              style={{ padding: "8px" }}
              placeholder="Selecione o status..."
              options={statusOptions.map((status) => ({
                label: getLocationStatusLabel(status),
                value: status,
              }))}
            />
          </Form.Item>

          <FullField>
            <Form.Item label="Descrição" name="description">
              <Input.TextArea placeholder="Informações adicionais sobre a localização..." />
            </Form.Item>
          </FullField>
        </FormGrid>
      </Form>
    </FormModal>
  );
}
