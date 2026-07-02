import { LocationStatus, LocationType, type Location } from "./locations.types";

export const LOCATION_SEED_IDS = {
  lab01: "11111111-1111-4111-8111-111111111111",
  lab02: "22222222-2222-4222-8222-222222222222",
  coordination: "33333333-3333-4333-8333-333333333333",
  storage: "44444444-4444-4444-8444-444444444444",
  maintenance: "55555555-5555-4555-8555-555555555555",
  network: "66666666-6666-4666-8666-666666666666"
};

export const locationsSeed: Location[] = [
  {
    id: LOCATION_SEED_IDS.lab01,
    code: "LAB-1",
    name: "Lab Info 1",
    type: LocationType.LABORATORY,
    building: "Bloco A",
    floor: "1o andar",
    room: "A101",
    description: "Sala principal usada nas aulas praticas do curso.",
    status: LocationStatus.ACTIVE,
    createdAt: "2026-01-10T10:00:00.000Z",
    updatedAt: "2026-01-10T10:00:00.000Z"
  },
  {
    id: LOCATION_SEED_IDS.lab02,
    code: "MAKER",
    name: "Lab Maker",
    type: LocationType.LABORATORY,
    building: "Bloco A",
    floor: "1o andar",
    room: "A102",
    description: "Espaco usado para oficinas, projetos integradores e prototipos.",
    status: LocationStatus.ACTIVE,
    createdAt: "2026-01-10T10:05:00.000Z",
    updatedAt: "2026-01-10T10:05:00.000Z"
  },
  {
    id: LOCATION_SEED_IDS.coordination,
    code: "COORD",
    name: "Coordenacao",
    type: LocationType.OFFICE,
    building: "Bloco Administrativo",
    floor: "2o andar",
    room: "C201",
    description: "Sala da coordenacao, usada como referencia administrativa.",
    status: LocationStatus.ACTIVE,
    createdAt: "2026-01-10T10:10:00.000Z",
    updatedAt: "2026-01-10T10:10:00.000Z"
  },
  {
    id: LOCATION_SEED_IDS.storage,
    code: "ALMOX",
    name: "Almoxarifado",
    type: LocationType.STORAGE,
    building: "Bloco de Apoio",
    floor: "Terreo",
    room: "S01",
    description: "Local para guardar equipamentos reservas ou aguardando distribuicao.",
    status: LocationStatus.ACTIVE,
    createdAt: "2026-01-10T10:15:00.000Z",
    updatedAt: "2026-01-10T10:15:00.000Z"
  },
  {
    id: LOCATION_SEED_IDS.maintenance,
    code: "MANUT",
    name: "Manutencao",
    type: LocationType.MAINTENANCE,
    building: "Bloco de Apoio",
    floor: "Terreo",
    room: "M01",
    description: "Espaco usado para diagnostico, reparos e manutencao preventiva.",
    status: LocationStatus.ACTIVE,
    createdAt: "2026-01-10T10:20:00.000Z",
    updatedAt: "2026-01-10T10:20:00.000Z"
  },
  {
    id: LOCATION_SEED_IDS.network,
    code: "REDES",
    name: "Redes",
    type: LocationType.NETWORK,
    building: "Bloco A",
    floor: "Terreo",
    room: "N01",
    description: "Sala restrita para equipamentos de rede e infraestrutura.",
    status: LocationStatus.ACTIVE,
    createdAt: "2026-01-10T10:25:00.000Z",
    updatedAt: "2026-01-10T10:25:00.000Z"
  }
];
