import { useEffect } from "react";
import { Form, Input, Select } from "antd";

import {
  getLocationStatusLabel,
  type Location,
  type LocationStatus,
} from "../../types/location";
import { CurrentStatusText, StatusModal } from "./styles";

export interface LocationStatusFormValues {
  status: LocationStatus;
  note?: string;
}

interface LocationStatusModalProps {
  location?: Location;
  confirmLoading?: boolean;
  open: boolean;
  statusOptions: LocationStatus[];
  onCancel: () => void;
  onSubmit: (values: LocationStatusFormValues) => void;
}

/**
 * Modal de alteração de status de uma localização.
 *
 * Exibe o status atual do local, permite selecionar um novo status
 * e adicionar uma observação opcional para registrar o motivo da alteração.
 *
 * @param location Localização selecionada para alteração de status.
 * @param confirmLoading Indica carregamento durante a confirmação.
 * @param open Define se o modal está visível.
 * @param statusOptions Lista de status disponíveis para seleção.
 * @param onCancel Função chamada ao cancelar o modal.
 * @param onSubmit Função chamada ao confirmar a alteração de status.
 */
export function LocationStatusModal({
  location,
  confirmLoading,
  open,
  statusOptions,
  onCancel,
  onSubmit,
}: LocationStatusModalProps) {
  const [form] = Form.useForm<LocationStatusFormValues>();

  /**
   * Preenche o formulário sempre que o modal é aberto.
   *
   * O status inicial recebe o status atual da localização selecionada
   * e a observação é reiniciada para evitar reaproveitar textos anteriores.
   */
  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        status: location?.status,
        note: "",
      });
    }
  }, [location, form, open]);

  /**
   * Valida os campos do formulário e envia os dados para o componente pai.
   *
   * Caso a validação falhe, o próprio Ant Design exibe os erros nos campos.
   */
  function handleSubmit() {
    form
      .validateFields()
      .then((values) => onSubmit(values))
      .catch(() => undefined);
  }

  return (
    <StatusModal
      centered
      destroyOnHidden
      open={open}
      title="Alterar status"
      okText="Salvar"
      cancelText="Cancelar"
      confirmLoading={confirmLoading}
      width={480}
      maskStyle={{
        backdropFilter: "blur(2px)",
        background: "rgb(0 0 0 / 45%)",
      }}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Novo status"
          name="status"
          rules={[{ required: true, message: "Selecione o novo status." }]}
        >
          <Select
            placeholder="Selecione o status..."
            options={statusOptions.map((status) => ({
              label: getLocationStatusLabel(status),
              value: status,
            }))}
          />
        </Form.Item>

        <Form.Item label="Observação" name="note">
          <Input.TextArea placeholder="Ex: Local em obras." />
        </Form.Item>
      </Form>

      <CurrentStatusText>
        Status atual: {location ? getLocationStatusLabel(location.status) : "-"}
      </CurrentStatusText>
    </StatusModal>
  );
}
