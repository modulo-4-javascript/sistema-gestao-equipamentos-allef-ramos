# Aula 08 - Resolução

Este material explica a solução pronta da Aula 08. A ideia é mostrar como o
módulo de Localizações foi construído seguindo o mesmo padrão do módulo de
Equipamentos, sem criar uma arquitetura difícil de entender.

Use este README como roteiro para apresentar a resolução em aula.

## Objetivo da aula

Ao final da aula, o aluno deve conseguir entender:

- como uma tela conversa com a API;
- como separar responsabilidades entre page, hook, service e component;
- quando um componente deve ir para `shared/components`;
- como reaproveitar UI sem esconder regra de negócio;
- como repetir um padrão de uma feature em outra.

## Visão geral

O projeto agora tem duas features principais no frontend:

```txt
features/equipment
features/locations
```

As duas seguem a mesma ideia:

```txt
page -> hook -> service -> API
page -> component
component da feature -> shared component
```

```mermaid
flowchart LR
  Page["Page<br/>tela da feature"] --> Hook["Hook<br/>estado da requisição"]
  Hook --> Service["Service<br/>chamada HTTP"]
  Service --> API["API Backend"]

  Page --> FeatureComponent["Componentes da feature"]
  FeatureComponent --> Shared["shared/components"]
```

## Regra didática de organização

Esta é a regra mais importante para explicar aos alunos:

```txt
Page: junta tudo que a tela precisa.
Hook: controla loading, erro e dados.
Service: conhece a URL da API.
Feature component: traduz regra da feature.
Shared component: renderiza UI genérica.
```

Exemplo prático:

```txt
EquipmentStatusBadge sabe que AVAILABLE significa "Disponível".
LocationStatusBadge sabe que ACTIVE significa "Ativo".
StatusPill não sabe nada disso. Ele só recebe label e cor.
```

```mermaid
flowchart TD
  EquipmentStatus["AVAILABLE<br/>IN_MAINTENANCE<br/>INACTIVE"]
  LocationStatus["ACTIVE<br/>INACTIVE"]

  EquipmentBadge["EquipmentStatusBadge"]
  LocationBadge["LocationStatusBadge"]
  StatusPill["StatusPill<br/>label + tone"]

  EquipmentStatus --> EquipmentBadge
  LocationStatus --> LocationBadge
  EquipmentBadge --> StatusPill
  LocationBadge --> StatusPill
```

## O que foi entregue

### Localizações

- listagem em `/locations`;
- busca com debounce;
- filtro por situação;
- filtro por tipo;
- paginação;
- cadastro;
- edição;
- alteração de situação;
- exclusão;
- detalhes em `/locations/:locationId`;
- lista de equipamentos vinculados ao local;
- navegação do local para o detalhe do equipamento.

### Equipamentos

O módulo de Equipamentos continuou funcionando e também foi alinhado com os
componentes compartilhados.

O detalhe de Localizações segue a mesma estrutura visual do detalhe de
Equipamentos.

## Rotas principais

```mermaid
flowchart TB
  EquipmentList["/equipment"]
  EquipmentDetails["/equipment/:equipmentId"]
  LocationList["/locations"]
  LocationDetails["/locations/:locationId"]

  EquipmentList --> EquipmentDetails
  LocationList --> LocationDetails
  LocationDetails --> EquipmentDetails
```

## Fluxo da listagem de Localizações

Quando o usuário abre `/locations`, a tela busca a lista e o resumo.

```mermaid
sequenceDiagram
  participant User as Usuário
  participant Page as LocationsPage
  participant ListHook as useLocationList
  participant SummaryHook as useLocationSummary
  participant Service as locationService
  participant API as Backend

  User->>Page: abre /locations
  Page->>ListHook: pede lista
  Page->>SummaryHook: pede resumo
  ListHook->>Service: getLocationList()
  SummaryHook->>Service: getLocationSummary()
  Service->>API: GET /locations
  Service->>API: GET /locations/summary
  API-->>Service: dados
  Service-->>ListHook: lista
  Service-->>SummaryHook: resumo
  ListHook-->>Page: loading, erro, dados
  SummaryHook-->>Page: loading, erro, dados
  Page-->>User: cards, filtros e tabela
```

## Fluxo de criar ou editar

Criar e editar usam o mesmo modal. A diferença está no `mode`.

```mermaid
flowchart TD
  Button["Botão Novo ou Editar"] --> OpenModal["Abre LocationFormModal"]
  OpenModal --> UserFill["Usuário preenche formulário"]
  UserFill --> Submit["Submit"]
  Submit --> Payload["buildLocationPayload"]
  Payload --> Decision{"mode"}
  Decision -->|"create"| Post["POST /locations"]
  Decision -->|"edit"| Put["PUT /locations/:id"]
  Post --> Reload["Recarrega lista/resumo"]
  Put --> Reload
  Reload --> Close["Fecha modal"]
```

## Fluxo de detalhes de Localizações

O detalhe usa o ID que vem da URL.

```mermaid
sequenceDiagram
  participant Router as React Router
  participant Page as LocationDetailsPage
  participant DetailsHook as useLocationDetails
  participant EquipmentHook as useLocationEquipment
  participant Service as locationService
  participant API as Backend

  Router->>Page: locationId
  Page->>DetailsHook: busca dados do local
  Page->>EquipmentHook: busca equipamentos do local
  DetailsHook->>Service: getLocationById(locationId)
  EquipmentHook->>Service: getLocationEquipment(locationId)
  Service->>API: GET /locations/:id
  Service->>API: GET /locations/:id/equipment
  API-->>Service: respostas
  Service-->>DetailsHook: local
  Service-->>EquipmentHook: equipamentos
  Page-->>Page: monta resumo e componentes
```

## Como explicar os componentes compartilhados

Os componentes compartilhados não devem conhecer regra específica.

```mermaid
flowchart LR
  subgraph Feature["features"]
    EquipmentRemove["EquipmentRemoveModal"]
    LocationRemove["LocationRemoveModal"]
    EquipmentStatus["EquipmentStatusModal"]
    LocationStatus["LocationStatusModal"]
  end

  subgraph Shared["shared/components"]
    Remove["RemoveModal"]
    Status["StatusModal"]
    Pill["StatusPill"]
    Header["DetailHeader"]
    Info["DetailInfoCard"]
  end

  EquipmentRemove --> Remove
  LocationRemove --> Remove
  EquipmentStatus --> Status
  LocationStatus --> Status
```

### Por que isso é didático?

Porque o aluno consegue responder:

- onde está a regra de negócio?
- onde está a chamada da API?
- onde está o visual reutilizável?
- onde a tela junta tudo?

## Arquivos para demonstrar

Comece por estes arquivos:

```txt
frontend/src/features/locations/pages/LocationsPage/index.tsx
frontend/src/features/locations/pages/LocationDetailsPage/index.tsx
frontend/src/features/locations/services/locationService.ts
frontend/src/features/locations/hooks/useLocationList.ts
frontend/src/features/locations/hooks/useLocationDetails.ts
frontend/src/features/locations/hooks/useLocationEquipment.ts
frontend/src/features/locations/components/LocationTable
frontend/src/features/locations/components/LocationFormModal
frontend/src/features/locations/components/LocationStatusBadge
frontend/src/features/locations/components/LocationEquipmentCard
```

Depois mostre o reaproveitamento:

```txt
frontend/src/shared/components/DataTable
frontend/src/shared/components/DetailHeader
frontend/src/shared/components/DetailSummaryCards
frontend/src/shared/components/DetailInfoCard
frontend/src/shared/components/DetailTextCard
frontend/src/shared/components/RemoveModal
frontend/src/shared/components/StatusModal
frontend/src/shared/components/StatusPill
```

## Pontos bons para destacar em aula

- O nome dos componentes diz a feature: `LocationTable`, `EquipmentTable`.
- Componentes compartilhados têm nome genérico: `StatusPill`, `RemoveModal`.
- O service centraliza as URLs.
- Os hooks evitam que a tela chame axios diretamente.
- Os modais específicos da feature só configuram texto, labels e payload.
- A tela de detalhes fica parecida entre Equipamentos e Localizações.

## Checklist de demonstração

Antes de apresentar:

```txt
npm run lint
npm run build
```

Durante a apresentação:

- abrir `/locations`;
- usar busca;
- usar filtros;
- criar um local;
- editar o local;
- alterar situação;
- tentar excluir local com equipamentos;
- abrir detalhe;
- clicar em um equipamento vinculado.

## Observação sobre o build

O Vite pode mostrar aviso de chunk grande. Isso não quebra o projeto. O aviso
aparece por causa das bibliotecas de UI usadas no frontend.
