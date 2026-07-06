import type { LocationFormValues } from "../components/LocationFormModal";

/**
 * Monta o payload de localização a partir dos valores do formulário.
 *
 * Remove espaços desnecessários dos campos textuais e converte campos opcionais
 * vazios para `undefined` ou `null`, conforme o formato esperado pela API.
 *
 * @param values Valores preenchidos no formulário de localização.
 * @returns Payload formatado para criação ou edição de localização.
 */
export function buildLocationPayload(values: LocationFormValues) {
  return {
    code: values.code.trim(),
    name: values.name.trim(),
    type: values.type,
    building: values.building?.trim() || undefined,
    floor: values.floor?.trim() || undefined,
    room: values.room?.trim() || undefined,
    description: values.description?.trim() || null,
    status: values.status,
  };
}