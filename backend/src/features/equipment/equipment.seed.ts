import { LOCATION_SEED_IDS } from "../locations/locations.seed";
import { EquipmentStatus, EquipmentType, type Equipment } from "./equipment.types";

export const EQUIPMENT_SEED_IDS = {
  notebook: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  monitor: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  printer: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
  router: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
  keyboard: "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee",
  projector: "ffffffff-ffff-4fff-8fff-ffffffffffff"
};

export const equipmentSeed: Equipment[] = [
  {
    id: EQUIPMENT_SEED_IDS.notebook,
    code: "EQP-001",
    name: "Notebook do Professor",
    type: EquipmentType.NOTEBOOK,
    model: "Dell Latitude 5420",
    serialNumber: "NB-DENKEN-001",
    status: EquipmentStatus.AVAILABLE,
    locationId: LOCATION_SEED_IDS.lab01,
    responsibleUserName: "Professor da disciplina",
    notes: "Equipamento usado para projetar exemplos e testar a aplicacao durante a aula.",
    createdAt: "2026-01-15T10:00:00.000Z",
    updatedAt: "2026-01-15T10:00:00.000Z"
  },
  {
    id: EQUIPMENT_SEED_IDS.monitor,
    code: "EQP-002",
    name: "Monitor da Bancada 01",
    type: EquipmentType.MONITOR,
    model: "LG UltraWide 29",
    serialNumber: "MON-LAB01-001",
    status: EquipmentStatus.AVAILABLE,
    locationId: LOCATION_SEED_IDS.lab01,
    responsibleUserName: "Equipe de patrimonio",
    notes: "Monitor extra disponivel para demonstracoes e atividades em dupla.",
    createdAt: "2026-01-15T10:05:00.000Z",
    updatedAt: "2026-01-15T10:05:00.000Z"
  },
  {
    id: EQUIPMENT_SEED_IDS.printer,
    code: "EQP-003",
    name: "Impressora da Secretaria",
    type: EquipmentType.PRINTER,
    model: "HP LaserJet Pro M404",
    serialNumber: "IMP-SEC-003",
    status: EquipmentStatus.IN_MAINTENANCE,
    locationId: LOCATION_SEED_IDS.maintenance,
    responsibleUserName: "Equipe de manutencao",
    notes: "Em manutencao para troca de toner e limpeza preventiva.",
    createdAt: "2026-01-15T10:10:00.000Z",
    updatedAt: "2026-01-15T10:10:00.000Z"
  },
  {
    id: EQUIPMENT_SEED_IDS.router,
    code: "EQP-004",
    name: "Roteador Principal do Lab",
    type: EquipmentType.NETWORK,
    model: "Ubiquiti EdgeRouter X",
    serialNumber: "RTR-LAB-004",
    status: EquipmentStatus.AVAILABLE,
    locationId: LOCATION_SEED_IDS.network,
    responsibleUserName: "Equipe de infraestrutura",
    notes: "Roteador usado como referencia para explicar equipamentos de rede.",
    createdAt: "2026-01-15T10:15:00.000Z",
    updatedAt: "2026-01-15T10:15:00.000Z"
  },
  {
    id: EQUIPMENT_SEED_IDS.keyboard,
    code: "EQP-005",
    name: "Kit Teclado e Mouse Reserva",
    type: EquipmentType.PERIPHERAL,
    model: "Logitech MK120",
    serialNumber: "KIT-RES-005",
    status: EquipmentStatus.AVAILABLE,
    locationId: LOCATION_SEED_IDS.storage,
    responsibleUserName: "Equipe de patrimonio",
    notes: "Conjunto reserva para substituir perifericos com defeito no laboratorio.",
    createdAt: "2026-01-15T10:20:00.000Z",
    updatedAt: "2026-01-15T10:20:00.000Z"
  },
  {
    id: EQUIPMENT_SEED_IDS.projector,
    code: "EQP-006",
    name: "Projetor Reserva",
    type: EquipmentType.OTHER,
    model: "Epson PowerLite X39",
    serialNumber: "PROJ-RES-006",
    status: EquipmentStatus.INACTIVE,
    locationId: LOCATION_SEED_IDS.storage,
    responsibleUserName: "Equipe de patrimonio",
    notes: "Equipamento antigo mantido no sistema para demonstrar o status inativo.",
    createdAt: "2026-01-15T10:25:00.000Z",
    updatedAt: "2026-01-15T10:25:00.000Z"
  }
];
