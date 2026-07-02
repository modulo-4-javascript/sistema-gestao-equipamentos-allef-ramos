import type {
  Equipment,
  EquipmentSummary,
} from '../types/equipment'
import {
  statusOptions as apiStatusOptions,
  typeOptions as apiTypeOptions,
} from '../types/equipment'

// Este mock simula os dados que aparecerão na tabela durante a aula.
// Para a aula, mantemos poucos itens para ficar fácil enxergar o que mudou na tela.
export const equipmentMock: Equipment[] = [
  {
    id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    code: 'EQP-001',
    name: 'Notebook do Professor',
    type: 'NOTEBOOK',
    model: 'Dell Latitude 5420',
    status: 'AVAILABLE',
    locationId: '11111111-1111-4111-8111-111111111111',
    locationName: 'LAB-1 - Lab Info 1',
    serialNumber: 'NB-DENKEN-001',
    responsibleUserName: 'Professor da disciplina',
    createdAt: '2026-01-15T10:00:00.000Z',
    updatedAt: '2026-01-15T10:00:00.000Z',
  },
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    code: 'EQP-002',
    name: 'Monitor da Bancada 01',
    type: 'MONITOR',
    model: 'LG UltraWide 29',
    status: 'AVAILABLE',
    locationId: '11111111-1111-4111-8111-111111111111',
    locationName: 'LAB-1 - Lab Info 1',
    serialNumber: 'MON-LAB01-001',
    responsibleUserName: 'Equipe de patrimônio',
    createdAt: '2026-01-15T10:05:00.000Z',
    updatedAt: '2026-01-15T10:05:00.000Z',
  },
  {
    id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    code: 'EQP-003',
    name: 'Impressora da Secretaria',
    type: 'PRINTER',
    model: 'HP LaserJet Pro M404',
    status: 'IN_MAINTENANCE',
    locationId: '55555555-5555-4555-8555-555555555555',
    locationName: 'Manutenção',
    serialNumber: 'IMP-SEC-003',
    responsibleUserName: 'Equipe de manutenção',
    createdAt: '2026-01-15T10:10:00.000Z',
    updatedAt: '2026-01-15T10:10:00.000Z',
  },
  {
    id: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
    code: 'EQP-004',
    name: 'Roteador Principal do Lab',
    type: 'NETWORK',
    model: 'Ubiquiti EdgeRouter X',
    status: 'AVAILABLE',
    locationId: '66666666-6666-4666-8666-666666666666',
    locationName: 'Redes',
    serialNumber: 'RTR-LAB-004',
    responsibleUserName: 'Equipe de infraestrutura',
    createdAt: '2026-01-15T10:15:00.000Z',
    updatedAt: '2026-01-15T10:15:00.000Z',
  },
  {
    id: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
    code: 'EQP-005',
    name: 'Kit Teclado e Mouse Reserva',
    type: 'PERIPHERAL',
    model: 'Logitech MK120',
    status: 'AVAILABLE',
    locationId: '44444444-4444-4444-8444-444444444444',
    locationName: 'Almoxarifado',
    serialNumber: 'KIT-RES-005',
    responsibleUserName: 'Equipe de patrimônio',
    createdAt: '2026-01-15T10:20:00.000Z',
    updatedAt: '2026-01-15T10:20:00.000Z',
  },
  {
    id: 'ffffffff-ffff-4fff-8fff-ffffffffffff',
    code: 'EQP-006',
    name: 'Projetor Reserva',
    type: 'OTHER',
    model: 'Epson PowerLite X39',
    status: 'INACTIVE',
    locationId: '44444444-4444-4444-8444-444444444444',
    locationName: 'Almoxarifado',
    serialNumber: 'PROJ-RES-006',
    responsibleUserName: 'Equipe de patrimônio',
    createdAt: '2026-01-15T10:25:00.000Z',
    updatedAt: '2026-01-15T10:25:00.000Z',
  },
]

// Estes números também estão mockados.
// Eles alimentam os cards de resumo da interface.
export const equipmentSummaryMock: EquipmentSummary[] = [
  {
    id: 'total',
    title: 'Total',
    value: 128,
    icon: 'total',
    lineColor: 'linear-gradient(90deg, #002A64, #007C8C)',
    iconBackground: '#E1E8FD',
  },
  {
    id: 'available',
    title: 'Disponíveis',
    value: 86,
    icon: 'available',
    lineColor: '#25B8A7',
    iconBackground: '#E6FFFB',
  },
  {
    id: 'maintenance',
    title: 'Em manutenção',
    value: 24,
    icon: 'maintenance',
    lineColor: '#007C8C',
    iconBackground: '#E6F4FF',
  },
  {
    id: 'inactive',
    title: 'Inativos',
    value: 18,
    icon: 'inactive',
    lineColor: '#6B7280',
    iconBackground: '#F3F4F6',
  },
]

// Opções usadas nos selects dos filtros.
// Deixar separado evita repetir textos dentro do componente.
export const statusOptions = apiStatusOptions

export const typeOptions = apiTypeOptions
