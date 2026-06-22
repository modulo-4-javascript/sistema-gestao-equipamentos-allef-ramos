export type EquipmentStatus = 'Disponível' | 'Em manutenção' | 'Inativo'

export type EquipmentType =
  | 'Informática'
  | 'Imagem'
  | 'Laboratório'
  | 'Rede'
  | 'Impressão'

export type SummaryIconName = 'total' | 'available' | 'maintenance' | 'inactive'

export interface Equipment {
  id: string
  name: string
  type: EquipmentType
  model: string
  status: EquipmentStatus
  location: string
  lastUpdate: string
  serialNumber: string
}

export interface EquipmentSummary {
  id: string
  title: string
  value: number
  icon: SummaryIconName
  lineColor: string
  iconBackground: string
}
