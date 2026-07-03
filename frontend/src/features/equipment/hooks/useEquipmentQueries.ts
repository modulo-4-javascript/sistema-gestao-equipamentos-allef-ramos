import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { equipmentService, type GetEquipmentListParams } from '../services/equipmentService'
import type {
  CreateEquipmentPayload,
  UpdateEquipmentPayload,
  UpdateEquipmentStatusPayload,
} from '../types/equipment'

// Converte erros do Axios ou do JavaScript em uma mensagem simples para a tela.
export function getRequestErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ??
      error.message ??
      'Não foi possível completar a comunicação com a API.'
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Não foi possível completar a comunicação com a API.'
}

export function useEquipmentList(params: GetEquipmentListParams) {
  // useQuery busca dados e entrega loading, erro e resultado para a página.
  const query = useQuery({
    // Quando filtros mudam, a chave muda e a listagem é buscada novamente.
    queryKey: ['equipment', params],
    queryFn: () => equipmentService.getEquipmentList(params),
  })

  return {
    ...query,
    errorMessage: query.error ? getRequestErrorMessage(query.error) : '',
  }
}

export function useEquipmentSummary() {
  // Busca os totais exibidos nos cards do topo da página.
  const query = useQuery({
    queryKey: ['equipment', 'summary'],
    queryFn: equipmentService.getEquipmentSummary,
  })

  return {
    ...query,
    errorMessage: query.error ? getRequestErrorMessage(query.error) : '',
  }
}

export function useEquipmentDetails(equipmentId?: string) {
  // Busca os dados de um equipamento específico para a tela de detalhes.
  const query = useQuery({
    // Evita chamar a API antes de existir um ID na rota.
    enabled: Boolean(equipmentId),
    queryKey: ['equipment', equipmentId],
    queryFn: () => equipmentService.getEquipmentById(equipmentId ?? ''),
  })

  return {
    ...query,
    errorMessage: query.error ? getRequestErrorMessage(query.error) : '',
  }
}

export function useEquipmentLocationOptions() {
  // Busca localizações em formato pronto para preencher selects.
  const query = useQuery({
    queryKey: ['locations'],
    queryFn: equipmentService.getEquipmentLocationOptions,
  })

  return {
    ...query,
    errorMessage: query.error ? getRequestErrorMessage(query.error) : '',
  }
}

export function useCreateEquipment() {
  const queryClient = useQueryClient()

  // useMutation executa ações que alteram dados no backend.
  const mutation = useMutation({
    mutationFn: (payload: CreateEquipmentPayload) => equipmentService.createEquipment(payload),
    onSuccess: () => {
      // Depois de criar, pedimos para o TanStack atualizar listas, cards e detalhes.
      void queryClient.invalidateQueries({ queryKey: ['equipment'] })
    },
  })

  return {
    ...mutation,
    errorMessage: mutation.error ? getRequestErrorMessage(mutation.error) : '',
  }
}

export function useUpdateEquipment() {
  const queryClient = useQueryClient()

  // Atualiza os dados principais de um equipamento.
  const mutation = useMutation({
    mutationFn: ({
      equipmentId,
      payload,
    }: {
      equipmentId: string
      payload: UpdateEquipmentPayload
    }) => equipmentService.updateEquipment(equipmentId, payload),
    onSuccess: () => {
      // Depois de editar, a tela busca novamente os dados de equipamentos.
      void queryClient.invalidateQueries({ queryKey: ['equipment'] })
    },
  })

  return {
    ...mutation,
    errorMessage: mutation.error ? getRequestErrorMessage(mutation.error) : '',
  }
}

export function useUpdateEquipmentStatus() {
  const queryClient = useQueryClient()

  // Atualiza apenas o status do equipamento.
  const mutation = useMutation({
    mutationFn: ({
      equipmentId,
      payload,
    }: {
      equipmentId: string
      payload: UpdateEquipmentStatusPayload
    }) => equipmentService.updateEquipmentStatus(equipmentId, payload),
    onSuccess: () => {
      // O status aparece na lista, no resumo e nos detalhes, então todos são atualizados.
      void queryClient.invalidateQueries({ queryKey: ['equipment'] })
    },
  })

  return {
    ...mutation,
    errorMessage: mutation.error ? getRequestErrorMessage(mutation.error) : '',
  }
}
