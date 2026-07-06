import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AutorenewOutlined from "@mui/icons-material/AutorenewOutlined";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import MoreHorizOutlined from "@mui/icons-material/MoreHorizOutlined";
import PinDropOutlined from "@mui/icons-material/PinDropOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import { Container } from "@mui/material";
import { Alert, App as AntDesignApp, Dropdown, type TableProps } from "antd";

import { AppLayout } from "../../../../app/layout/AppLayout";
import { DataTable } from "../../../../shared/components/DataTable";
import {
  ActionButton,
  ResourceCell,
  ResourceCode,
  ResourceIcon,
  ResourceName,
} from "../../../../shared/components/DataTable/styles";
import { PageHeader } from "../../../../shared/components/PageHeader";
import { ResourceFilters } from "../../../../shared/components/ResourceFilters";
import {
  SummaryCards,
  type SummaryCardItem,
} from "../../../../shared/components/SummaryCards";
import { getRequestErrorMessage } from "../../../../shared/http/getRequestErrorMessage";

import {
  LocationFormModal,
  type LocationFormMode,
  type LocationFormValues,
} from "../../components/LocationFormModal";
import { LocationRemoveModal } from "../../components/LocationRemoveModal";
import {
  LocationStatusModal,
  type LocationStatusFormValues,
} from "../../components/LocationStatusModal";
import { useCreateLocation } from "../../hooks/useCreateLocation";
import { useDeleteLocation } from "../../hooks/useDeleteLocation";
import { useLocationList } from "../../hooks/useLocationList";
import { useLocationSummary } from "../../hooks/useLocationSummary";
import { useUpdateLocation } from "../../hooks/useUpdateLocation";
import { useUpdateLocationStatus } from "../../hooks/useUpdateLocationStatus";
import {
  formatLocationDate,
  getLocationStatusLabel,
  getLocationTypeLabel,
  locationStatusOptions,
  locationTypeOptions,
  type Location,
  type LocationDetails,
  type LocationStatus,
  type LocationSummaryResponse,
  type LocationType,
} from "../../types/location";
import { buildLocationPayload } from "../../utils/buildLocationPayload";
import { LocationStatusTag } from "./styles";

interface LocationTableActions {
  onChangeStatusLocation: (location: LocationDetails) => void;
  onEditLocation: (location: LocationDetails) => void;
  onRemoveLocation: (location: LocationDetails) => void;
  onViewLocation: (location: LocationDetails) => void;
}

/**
 * Summary vazio usado como fallback enquanto os dados da API
 * ainda não foram carregados ou quando não houver resposta disponível.
 */
const emptySummary: LocationSummaryResponse = {
  total: 0,
  active: 0,
  inactive: 0,
  equipmentCount: 0,
};

/**
 * Quantidade padrão de registros exibidos por página na listagem de localizações.
 */
const defaultPageSize = 10;

/**
 * Converte o summary de localizações retornado pela API
 * para a estrutura esperada pelos cards de resumo da tela.
 *
 * @param summary Dados resumidos de localizações retornados pela API.
 * @returns Lista de cards de resumo formatada para exibição.
 */
function buildLocationSummaryCards(
  summary: LocationSummaryResponse,
): SummaryCardItem[] {
  return [
    {
      id: "total",
      title: "Locais",
      value: summary.total,
      icon: "location",
      lineColor: "linear-gradient(90deg, #002A64, #007C8C)",
      iconBackground: "#E1E8FD",
    },
    {
      id: "active",
      title: "Ativos",
      value: summary.active,
      icon: "active",
      lineColor: "#25B8A7",
      iconBackground: "#E6FFFB",
    },
    {
      id: "equipmentCount",
      title: "Equipamentos",
      value: summary.equipmentCount,
      icon: "maintenance",
      lineColor: "#007C8C",
      iconBackground: "#E6F4FF",
    },
    {
      id: "inactive",
      title: "Inativos",
      value: summary.inactive,
      icon: "inactive",
      lineColor: "#6B7280",
      iconBackground: "#F3F4F6",
    },
  ];
}

// Constantes e helpers dos elementos visuais.

/**
 * Formata o nome da sala garantindo o prefixo "Sala".
 *
 * Caso o valor já comece com "sala", independentemente de maiúsculas ou minúsculas,
 * o texto original é mantido. Caso contrário, o prefixo "Sala" é adicionado.
 *
 * @param room Nome ou número da sala.
 * @returns Nome da sala formatado ou `undefined` quando nenhum valor é informado.
 */
function formatRoomLabel(room?: string) {
  if (!room) {
    return undefined;
  }

  return room.toLowerCase().startsWith("sala") ? room : `Sala ${room}`;
}

/**
 * Formata o endereço exibido da localização.
 *
 * A tela exibe prédio e sala/andar em uma única coluna para manter alinhamento
 * com o layout definido no design.
 *
 * Prioriza a sala quando disponível. Caso contrário, utiliza o andar.
 *
 * @param location Dados detalhados da localização.
 * @returns Endereço formatado no padrão "Prédio • Sala/Andar" ou "Não informado".
 */
function formatLocationAddress(location: LocationDetails) {
  const addressParts = [
    location.building,
    formatRoomLabel(location.room) ?? location.floor,
  ].filter(Boolean);

  return addressParts.length > 0 ? addressParts.join(" • ") : "Não informado";
}

/**
 * Monta a configuração das colunas da tabela de localizações.
 *
 * Define como cada campo de `LocationDetails` será exibido na tabela,
 * incluindo identificação da localização, tipo, endereço formatado,
 * status, quantidade de equipamentos, data de atualização e menu de ações.
 *
 * As ações recebidas por parâmetro são disparadas a partir do menu de cada linha,
 * mantendo a tabela desacoplada das regras de navegação, edição, alteração de status
 * e exclusão.
 *
 * @param onChangeStatusLocation Função chamada ao selecionar a ação de mudar situação.
 * @param onEditLocation Função chamada ao selecionar a ação de edição.
 * @param onRemoveLocation Função chamada ao selecionar a ação de exclusão.
 * @param onViewLocation Função chamada ao selecionar a ação de visualizar detalhes.
 * @returns Lista de colunas usada pelo componente `Table` do Ant Design.
 */
function getLocationColumns({
  onChangeStatusLocation,
  onEditLocation,
  onRemoveLocation,
  onViewLocation,
}: LocationTableActions): TableProps<LocationDetails>["columns"] {
  return [
    {
      title: "Local",
      dataIndex: "name",
      key: "name",
      render: (_, location) => (
        <ResourceCell>
          <ResourceIcon>
            <PinDropOutlined fontSize="small" />
          </ResourceIcon>
          <span>
            <ResourceName>{location.name}</ResourceName>
            <ResourceCode>{location.code}</ResourceCode>
          </span>
        </ResourceCell>
      ),
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      render: (type: LocationDetails["type"]) => getLocationTypeLabel(type),
    },
    {
      title: "Endereço",
      dataIndex: "building",
      key: "address",
      render: (_, location) => formatLocationAddress(location),
    },
    {
      title: "Situação",
      dataIndex: "status",
      key: "status",
      render: (status: LocationDetails["status"]) => (
        <LocationStatusTag $status={status}>
          {getLocationStatusLabel(status)}
        </LocationStatusTag>
      ),
    },
    {
      title: "Equip.",
      dataIndex: "equipmentCount",
      key: "equipmentCount",
    },
    {
      title: "Atualizado",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: LocationDetails["updatedAt"]) =>
        formatLocationDate(updatedAt),
    },
    {
      title: "Ações",
      key: "actions",
      align: "right",
      render: (_, location) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            onClick: ({ key }) => {
              if (key === "view") {
                onViewLocation(location);
              }
              if (key === "edit") {
                onEditLocation(location);
              }
              if (key === "status") {
                onChangeStatusLocation(location);
              }
              if (key === "remove") {
                onRemoveLocation(location);
              }
            },
            items: [
              {
                key: "view",
                icon: <VisibilityOutlined fontSize="small" />,
                label: "Ver detalhes",
              },
              {
                key: "edit",
                icon: <EditOutlined fontSize="small" />,
                label: "Editar",
              },
              {
                key: "status",
                icon: <AutorenewOutlined fontSize="small" />,
                label: "Mudar situação",
              },
              {
                key: "remove",
                icon: <DeleteOutlineOutlined fontSize="small" />,
                label: "Excluir",
                danger: true,
              },
            ],
          }}
        >
          <ActionButton
            aria-label={`Abrir ações de ${location.name}`}
            icon={<MoreHorizOutlined fontSize="small" />}
            type="text"
          />
        </Dropdown>
      ),
    },
  ];
}

export function LocationsPage() {
  // APIs de UI e navegação
  const navigate = useNavigate();
  const { message: messageApi } = AntDesignApp.useApp();

  // Estados de filtros e paginação
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<LocationStatus>();
  const [selectedType, setSelectedType] = useState<LocationType>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Estados dos modais
  const [locationInForm, setLocationInForm] = useState<Location>();
  const [formMode, setFormMode] = useState<LocationFormMode>("create");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [locationInStatus, setLocationInStatus] = useState<Location>();
  const [locationToRemove, setLocationToRemove] = useState<Location>();

  // Effects
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  // Hooks de leitura
  const locationListQuery = useLocationList({
    search: debouncedSearchText,
    status: selectedStatus,
    type: selectedType,
    page: currentPage,
    pageSize,
  });

  const locationSummaryQuery = useLocationSummary();

  // Hooks de escrita
  const createLocation = useCreateLocation();
  const updateLocation = useUpdateLocation();
  const updateLocationStatus = useUpdateLocationStatus();
  const deleteLocation = useDeleteLocation();

  // Dados derivados
  const locations = locationListQuery.data?.data ?? [];
  const paginationInfo = locationListQuery.data?.meta;
  const summary = locationSummaryQuery.data ?? emptySummary;
  const summaryCards = buildLocationSummaryCards(summary);

  const isLoading =
    locationListQuery.isLoading || locationSummaryQuery.isLoading;

  const loadError =
    locationListQuery.errorMessage || locationSummaryQuery.errorMessage;

  const isSavingForm = createLocation.isLoading || updateLocation.isLoading;
  const isSavingStatus = updateLocationStatus.isLoading;

  const isRemovingLocation = deleteLocation.isLoading;

  // Handlers de filtros e paginação

  /** Restaura os filtros de busca e retorna à visualização página inicial */
  function handleClearFilters() {
    setSearchText("");
    setDebouncedSearchText("");
    setSelectedStatus(undefined);
    setSelectedType(undefined);
    setCurrentPage(1);
  }

  /** Atualiza o texto da busca. A consulta é executada posteriormente pelo debounce. */
  function handleSearchChange(value: string) {
    setSearchText(value);
  }

  /** Atualiza o filtro de status e retorna a paginação para a primeira página. */
  function handleStatusChange(value?: LocationStatus) {
    setSelectedStatus(value);
    setCurrentPage(1);
  }

  /** Atualiza o filtro de tipo e retorna a paginação para a primeira página. */
  function handleTypeChange(value?: LocationType) {
    setSelectedType(value);
    setCurrentPage(1);
  }

  /** Atualiza a página atual e a quantidade de registros exibidos por página. */
  function handlePageChange(nextPage: number, nextPageSize: number) {
    setCurrentPage(nextPage);
    setPageSize(nextPageSize);
  }

  // Handlers de navegação e modais

  /** Navega para visualização detalhada de localização. */
  function handleViewLocation(location: Location) {
    navigate(`/locations/${location.id}`);
  }

  /**
   * Abre o modal de cadastro de localização.
   *
   * Define o formulário no modo de criação, limpa qualquer localização
   * previamente selecionada e exibe o modal.
   */
  function handleCreateLocation() {
    setFormMode("create");
    setLocationInForm(undefined);
    setIsFormModalOpen(true);
  }

  /**
   * Abre o modal de edição de localização.
   *
   * Define o formulário no modo de edição, limpa qualquer localização
   * previamente selecionada e exibe o modal.
   */
  function handleEditLocation(location: Location) {
    setFormMode("edit");
    setLocationInForm(location);
    setIsFormModalOpen(true);
  }

  /**
   * Fecha o modal de criação/edição de localização.
   *
   * Também limpa a localização selecionada para evitar reaproveitamento
   * indevido dos dados em uma próxima abertura do formulário.
   */
  function handleCloseFormModal() {
    setIsFormModalOpen(false);
    setLocationInForm(undefined);
  }

  // Handlers de persistência

  /**
   * Salva os dados do formulário de localização.
   *
   * Quando o formulário está em modo de edição e existe uma localização
   * selecionada, atualiza o registro existente. Caso contrário, cria uma
   * nova localização.
   *
   * Após salvar, recarrega a listagem e os cards de resumo, fecha o modal
   * e exibe uma mensagem de sucesso. Em caso de erro, exibe a mensagem
   * tratada da requisição.
   *
   * @param values Valores preenchidos no formulário de localização.
   */
  async function handleSubmitLocationForm(values: LocationFormValues) {
    const payload = buildLocationPayload(values);

    try {
      if (formMode === "edit" && locationInForm) {
        await updateLocation.update({
          locationId: locationInForm.id,
          payload,
        });

        messageApi.success("Local atualizado com sucesso.");
      } else {
        await createLocation.create(payload);

        messageApi.success("Local cadastrado com sucesso.");
      }

      await Promise.all([
        locationListQuery.reload(),
        locationSummaryQuery.reload(),
      ]);

      handleCloseFormModal();
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error));
    }
  }

  /**
   * Confirma a exclusão da localização selecionada.
   *
   * Encerra o fluxo caso não exista localização marcada para remoção.
   * Após excluir com sucesso, exibe mensagem, limpa o estado do modal
   * e recarrega os dados da tela.
   *
   * Se o item excluído for o último da página atual e a página não for a primeira,
   * retorna uma página para evitar exibir uma listagem vazia.
   */
  async function handleConfirmRemoveLocation() {
    if (!locationToRemove) {
      return;
    }

    try {
      await deleteLocation.remove(locationToRemove.id);
      messageApi.success("Local excluído com sucesso.");
      setLocationToRemove(undefined);

      if (currentPage > 1 && locations.length === 1) {
        setCurrentPage((page) => Math.max(1, page - 1));
        await locationSummaryQuery.reload();
        return;
      }

      await Promise.all([
        locationListQuery.reload(),
        locationSummaryQuery.reload(),
      ]);
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error));
    }
  }

  /**
   * Salva a alteração de status da localização selecionada.
   *
   * Encerra o fluxo caso não exista localização em edição de status.
   * Envia o novo status e a observação opcional para o backend, recarrega
   * listagem e resumo, exibe mensagem de sucesso e fecha o modal.
   *
   * @param values Valores preenchidos no modal de alteração de status.
   */
  async function handleSubmitStatusModal(values: LocationStatusFormValues) {
    if (!locationInStatus) {
      return;
    }

    try {
      await updateLocationStatus.updateStatus({
        locationId: locationInStatus.id,
        payload: {
          status: values.status,
          note: values.note?.trim() || null,
        },
      });

      await Promise.all([
        locationListQuery.reload(),
        locationSummaryQuery.reload(),
      ]);
      messageApi.success("Status atualizado com sucesso.");
      setLocationInStatus(undefined);
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error));
    }
  }

  // Configurações da tabela.
  const locationColumns = getLocationColumns({
    onChangeStatusLocation: (location: Location) =>
      setLocationInStatus(location),
    onEditLocation: (location: Location) => handleEditLocation(location),
    onRemoveLocation: (location: Location) => setLocationToRemove(location),
    onViewLocation: (location: Location) => handleViewLocation(location),
  });

  return (
    <AppLayout currentPage="Localizações">
      <Container>
        {/* Cabeçalho da página com ação principal para cadastro de localizações. */}
        <PageHeader
          actionLabel="Novo local"
          description="Cadastre salas, laboratórios e áreas onde os equipamentos ficam."
          title="Locais"
          onAction={handleCreateLocation}
        />
        <SummaryCards
          ariaLabel="Resumo das localizações"
          summaries={summaryCards}
        />
        <ResourceFilters
          getStatusLabel={getLocationStatusLabel}
          getTypeLabel={getLocationTypeLabel}
          searchLabel="Buscar"
          searchPlaceholder="Nome, código, prédio ou sala..."
          searchText={searchText}
          selectedStatus={selectedStatus}
          selectedType={selectedType}
          statusLabel="Situação"
          statusOptions={locationStatusOptions}
          typeOptions={locationTypeOptions}
          typePlaceholder="Todos"
          onClear={handleClearFilters}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onTypeChange={handleTypeChange}
        />
        {loadError && (
          <Alert
            showIcon
            message="Erro ao carregar localizações"
            description={loadError}
            type="error"
          />
        )}
        <DataTable
          columns={locationColumns}
          dataSource={locations}
          emptyText="Nenhuma localização encontrada."
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize,
            total: paginationInfo?.total ?? 0,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20],
            showTotal: (total) => `${total} localizações no total`,
            onChange: handlePageChange,
          }}
          rowKey="id"
          onRowDoubleClick={(location: Location) =>
            handleViewLocation(location)
          }
        />

        {/* Modais responsáveis pelos fluxos de criação, edição, status e exclusão. */}

        {/* Criação e edição de localizações. */}
        <LocationFormModal
          confirmLoading={isSavingForm}
          location={locationInForm}
          mode={formMode}
          open={isFormModalOpen}
          statusOptions={locationStatusOptions}
          typeOptions={locationTypeOptions}
          onCancel={handleCloseFormModal}
          onSubmit={handleSubmitLocationForm}
        />
        {/* Alteração rápida de status. */}
        <LocationStatusModal
          confirmLoading={isSavingStatus}
          location={locationInStatus}
          open={Boolean(locationInStatus)}
          statusOptions={locationStatusOptions}
          onCancel={() => setLocationInStatus(undefined)}
          onSubmit={handleSubmitStatusModal}
        />
        {/* Confirmação de exclusão. */}
        <LocationRemoveModal
          confirmLoading={isRemovingLocation}
          location={locationToRemove}
          open={Boolean(locationToRemove)}
          onCancel={() => setLocationToRemove(undefined)}
          onConfirm={handleConfirmRemoveLocation}
        />
      </Container>
    </AppLayout>
  );
}
