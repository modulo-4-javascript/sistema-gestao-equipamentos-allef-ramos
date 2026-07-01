# Aula 06 - Guia do aluno

Hoje vamos construir a tela de detalhes de um equipamento.

A integração com API ainda não será feita. Primeiro vamos usar dados mockados para entender:

- rota dinâmica;
- leitura de parâmetro da URL;
- busca de item por ID;
- composição de página com componentes;
- passagem de dados por props.

No final da aula, o professor vai mostrar a API e explicar qual rota vai alimentar cada parte do sistema.

## Antes de começar

Entre na pasta do frontend:

```bash
cd frontend
```

Rode o projeto:

```bash
npm run dev
```

Abra no navegador:

```txt
http://localhost:5173/equipment
```

## O que vamos construir

A tela final será acessada por uma URL com ID:

```txt
/equipment/EQP-001
```

Essa URL significa:

- `/equipment`: estamos dentro da feature de equipamentos;
- `EQP-001`: queremos ver os detalhes desse equipamento.

No React Router, isso será escrito como:

```txt
/equipment/:equipmentId
```

O nome `equipmentId` é um parâmetro. Ele muda conforme o equipamento selecionado.

## Arquivos importantes desta aula

### Rota

```txt
src/app/routes.tsx
```

Aqui vamos ativar a rota dinâmica.

### Página de detalhes

```txt
src/features/equipment/pages/EquipmentDetailsPage/index.tsx
```

Aqui vamos montar a tela.

### Mock de detalhes

```txt
src/features/equipment/mocks/equipment-details.mock.ts
```

Aqui estão os dados falsos que simulam a API.

### Componentes prontos

```txt
src/features/equipment/components/DetailsHeader
src/features/equipment/components/DetailSummaryCards
src/features/equipment/components/EquipmentInfoCard
src/features/equipment/components/EquipmentNotesCard
src/features/equipment/components/EquipmentHistoryCard
```

Esses componentes já estão preparados. Nosso trabalho será conectar os dados neles.

## Passo 1 - Ativar a rota de detalhes

Abra:

```txt
src/app/routes.tsx
```

Procure o trecho marcado com `AULA 06`.

Descomente o import:

```tsx
import { EquipmentDetailsPage } from '../features/equipment/pages/EquipmentDetailsPage'
```

Depois descomente a rota:

```tsx
<Route path="/equipment/:equipmentId" element={<EquipmentDetailsPage />} />
```

Agora o React Router já conhece a página de detalhes.

Teste no navegador:

```txt
http://localhost:5173/equipment/EQP-001
```

Você ainda não verá a tela completa. Por enquanto, a página está só preparada para ser implementada.

## Passo 2 - Entender o mock

Abra:

```txt
src/features/equipment/mocks/equipment-details.mock.ts
```

Observe que existe uma lista:

```ts
equipmentDetailsMock
```

Cada item tem informações mais completas do que a tabela:

- `id`;
- `name`;
- `type`;
- `model`;
- `status`;
- `location`;
- `serialNumber`;
- `responsible`;
- `createdAt`;
- `lastUpdate`;
- `notes`;
- `history`.

Também existe uma função pronta:

```ts
findEquipmentDetailById(equipmentId)
```

Ela recebe um ID e devolve o equipamento correspondente.

Exemplo:

```ts
findEquipmentDetailById('EQP-001')
```

E existe uma função para montar os cards de resumo:

```ts
getEquipmentDetailSummary(equipment)
```

Ela usa o equipamento encontrado e cria os cards de status, localização, responsável e última atualização.

## Passo 3 - Ler o ID da URL

Abra:

```txt
src/features/equipment/pages/EquipmentDetailsPage/index.tsx
```

Adicione estes imports:

```tsx
import { useNavigate, useParams } from 'react-router-dom'
```

O `useParams` permite ler valores da URL.

Dentro do componente, adicione:

```tsx
const navigate = useNavigate()
const { equipmentId } = useParams()
```

Agora a página consegue navegar entre telas e ler o ID da rota.

Se a URL for:

```txt
/equipment/EQP-001
```

então:

```ts
equipmentId
```

será:

```txt
EQP-001
```

## Passo 4 - Buscar o equipamento no mock

Ainda em:

```txt
EquipmentDetailsPage/index.tsx
```

Importe a função do mock:

```tsx
import {
  findEquipmentDetailById,
  getEquipmentDetailSummary,
} from '../../mocks/equipment-details.mock'
```

Depois, dentro do componente:

```tsx
const equipment = findEquipmentDetailById(equipmentId)
```

Agora a página tem acesso aos dados do equipamento.

## Passo 5 - Tratar equipamento não encontrado

Nem todo ID existe no mock.

Se alguém abrir:

```txt
/equipment/ABC-999
```

a função não encontrará nenhum equipamento.

Adicione este tratamento:

```tsx
if (!equipment) {
  return (
    <AppLayout currentPage="Detalhes">
      <Container>
        <StarterBox>Equipamento não encontrado.</StarterBox>
      </Container>
    </AppLayout>
  )
}
```

Esse bloco evita erro na tela.

## Passo 6 - Importar os componentes visuais

Adicione os imports:

```tsx
import { DetailSummaryCards } from '../../components/DetailSummaryCards'
import { DetailsHeader } from '../../components/DetailsHeader'
import { EquipmentHistoryCard } from '../../components/EquipmentHistoryCard'
import { EquipmentInfoCard } from '../../components/EquipmentInfoCard'
import { EquipmentNotesCard } from '../../components/EquipmentNotesCard'
```

E importe as colunas do layout:

```tsx
import { Container, ContentGrid, MainColumn, SideColumn, StarterBox } from './styles'
```

## Passo 7 - Usar navegação de voltar

Como criamos `navigate` antes do tratamento de equipamento não encontrado, podemos usar no botão de voltar:

```tsx
onBack={() => navigate('/equipment')}
```

Depois do tratamento de equipamento não encontrado, monte os cards de resumo:

```tsx
const summaries = getEquipmentDetailSummary(equipment)
```

## Passo 8 - Renderizar a tela

Substitua o conteúdo do `return` principal por:

```tsx
return (
  <AppLayout currentPage="Detalhes">
    <Container>
      <DetailsHeader
        equipment={equipment}
        onBack={() => navigate('/equipment')}
        onEdit={() => undefined}
        onChangeStatus={() => undefined}
        onRemove={() => undefined}
      />

      <DetailSummaryCards summaries={summaries} />

      <ContentGrid>
        <MainColumn>
          <EquipmentInfoCard equipment={equipment} />
          <EquipmentNotesCard notes={equipment.notes} />
        </MainColumn>

        <SideColumn>
          <EquipmentHistoryCard history={equipment.history} />
        </SideColumn>
      </ContentGrid>
    </Container>
  </AppLayout>
)
```

Neste momento, as ações `Editar`, `Alterar status` e `Excluir` ainda são apenas visuais.

## Passo 9 - Conectar a tabela à tela de detalhes

Agora vamos voltar para a listagem.

Abra:

```txt
src/features/equipment/pages/EquipmentPage/index.tsx
```

Importe:

```tsx
import { useNavigate } from 'react-router-dom'
```

Dentro do componente, adicione:

```tsx
const navigate = useNavigate()
```

Depois crie uma função:

```tsx
function handleViewEquipment(equipment: Equipment) {
  navigate(`/equipment/${equipment.id}`)
}
```

Agora passe essa função para a tabela:

```tsx
<EquipmentTable
  equipments={visibleEquipment}
  onChangeStatusEquipment={setEquipmentInStatus}
  onEditEquipment={handleEditEquipment}
  onRemoveEquipment={setEquipmentToRemove}
  onViewEquipment={handleViewEquipment}
/>
```

Quando essa prop existir, a tabela mostra a ação `Visualizar`.

## Passo 10 - Testar

Abra:

```txt
http://localhost:5173/equipment
```

Na tabela:

1. clique no menu de ações;
2. clique em `Visualizar`;
3. confira se abriu a rota do equipamento.

Teste alguns IDs direto no navegador:

```txt
http://localhost:5173/equipment/EQP-001
http://localhost:5173/equipment/EQP-042
http://localhost:5173/equipment/EQP-087
```

## Passo 11 - Entender o que aconteceu

O fluxo ficou assim:

```txt
Tabela
  -> usuário clica em Visualizar
  -> EquipmentPage chama navigate
  -> React Router abre /equipment/:equipmentId
  -> EquipmentDetailsPage lê equipmentId
  -> busca o item no mock
  -> renderiza os componentes de detalhe
```

Esse fluxo é o mesmo que usaremos com API.

A diferença é que, na próxima aula, vamos trocar:

```ts
findEquipmentDetailById(equipmentId)
```

por uma chamada real:

```txt
GET /equipments/{equipmentId}
```

## Passo 12 - Leitura da API

Depois que a tela estiver pronta, abra:

```txt
frontend/docs/aula-06/README-api.md
```

Esse arquivo mostra qual endpoint alimenta cada parte do sistema.

Hoje vamos apenas entender. A integração fica para a próxima aula.

## Problemas comuns

### A tela ficou em branco

Confira se a rota foi descomentada em:

```txt
src/app/routes.tsx
```

### O TypeScript reclamou de import não usado

Confira se você importou um componente mas ainda não colocou ele no JSX.

### O botão Visualizar não aparece

Confira se você passou a prop:

```tsx
onViewEquipment={handleViewEquipment}
```

### A tela mostra "Equipamento não encontrado"

Confira se a URL usa um ID que existe no mock:

```txt
EQP-001
EQP-042
EQP-087
```

## Entrega da aula

Ao final, você deve ter:

- rota dinâmica `/equipment/:equipmentId`;
- navegação da tabela para detalhes;
- tela de detalhes usando mock;
- histórico renderizado com `map`;
- entendimento inicial de quais endpoints serão usados na próxima aula.
