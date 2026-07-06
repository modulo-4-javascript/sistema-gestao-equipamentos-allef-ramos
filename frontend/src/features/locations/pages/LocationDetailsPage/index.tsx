import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { App as AntDesignApp, Spin } from "antd";

import { AppLayout } from "../../../../app/layout/AppLayout";
import { ResourceDetailSummaryCards } from "../../../../shared/components/ResourceDetailsSummaryCards";
import { ResourceDetailsHeader } from "../../../../shared/components/ResourceDetailsHeader";
import { getRequestErrorMessage } from "../../../../shared/http/getRequestErrorMessage";
import {
  LocationFormModal,
  type LocationFormValues,
} from "../../components/LocationFormModal";
import { LocationRemoveModal } from "../../components/LocationRemoveModal";
import {
  LocationStatusModal,
  type LocationStatusFormValues,
} from "../../components/LocationStatusModal";
import { useDeleteLocation } from "../../hooks/useDeleteLocation";
import { useLocationDetails } from "../../hooks/useLocationDetails";
import { useUpdateLocation } from "../../hooks/useUpdateLocation";
import { useUpdateLocationStatus } from "../../hooks/useUpdateLocationStatus";
import { buildLocationPayload } from "../../utils/buildLocationPayload";
import {
  getLocationStatusLabel,
  locationStatusOptions,
  locationTypeOptions,
  type LocationDetails,
} from "../../types/location";
import { LocationStatusTag } from "../LocationsPage/styles";
import {
  Container,
  ContentGrid,
  MainColumn,
  SideColumn,
  StarterBox,
} from "./styles";
import { buildDetailSummary } from "../../utils/buildLocationDetailSummary";
import { LocationHistoryCard } from "../../components/LocationHistoryCard";
import { useLocationHistory } from "../../hooks/useLocationHistory";
import { buildLocationHistoryPreview } from "../../utils/buildLocationHistoryPreview";
import { LocationInfoCard } from "../../components/LocationInfoCard";
import { LocationNotesCard } from "../../components/LocationNotesCard";

export function LocationDetailPage() {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const { message: messageApi } = AntDesignApp.useApp();

  // Estados dos modais.
  const [locationInForm, setLocationInForm] = useState<LocationDetails>();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [locationInStatus, setLocationInStatus] = useState<LocationDetails>();
  const [locationToRemove, setLocationToRemove] = useState<LocationDetails>();

  // Hooks de leitura.
  const locationQuery = useLocationDetails(locationId);
  const locationHistoryQuery = useLocationHistory(locationId);

  const historyItems = locationHistoryQuery.data?.data ?? [];

  const historyPreview = buildLocationHistoryPreview(historyItems, 3);

  const hasMoreHistory =
    (locationHistoryQuery.data?.meta?.total ?? historyItems.length) > 3;

  // Hooks de escrita.
  const updateLocation = useUpdateLocation();
  const updateLocationStatus = useUpdateLocationStatus();
  const deleteLocation = useDeleteLocation();

  // Dados derivados da consulta.
  const location = locationQuery.data;

  const summaries = useMemo(
    () => (location ? buildDetailSummary(location) : []),
    [location],
  );

  const isSavingForm = updateLocation.isLoading;
  const isSavingStatus = updateLocationStatus.isLoading;
  const isRemovingLocation = deleteLocation.isLoading;

  /**
   * Retorna para a listagem de localizações.
   */
  function handleBackToLocations() {
    navigate("/locations");
  }

  /**
   * Abre o modal de edição da localização carregada.
   *
   * Define a localização atual como registro em edição e exibe o modal.
   */
  function handleEditLocation() {
    if (!location) {
      return;
    }

    setLocationInForm(location);
    setIsFormModalOpen(true);
  }

  /**
   * Fecha o modal de edição de localização.
   *
   * Também limpa a localização selecionada para evitar reaproveitamento
   * indevido dos dados em uma próxima abertura do formulário.
   */
  function handleCloseFormModal() {
    setIsFormModalOpen(false);
    setLocationInForm(undefined);
  }

  /**
   * Abre o modal de alteração de status da localização carregada.
   */
  function handleOpenStatusModal() {
    if (!location) {
      return;
    }

    setLocationInStatus(location);
  }

  /**
   * Abre o modal de confirmação de exclusão da localização carregada.
   */
  function handleOpenRemoveModal() {
    if (!location) {
      return;
    }

    setLocationToRemove(location);
  }

  /**
   * Salva os dados do formulário de edição da localização.
   *
   * Após atualizar, recarrega os dados do detalhe, fecha o modal
   * e exibe uma mensagem de sucesso. Em caso de erro, exibe a mensagem
   * tratada da requisição.
   *
   * @param values Valores preenchidos no formulário de localização.
   */
  async function handleSubmitLocationForm(values: LocationFormValues) {
    if (!locationInForm) {
      return;
    }

    const payload = buildLocationPayload(values);

    try {
      await updateLocation.update({
        locationId: locationInForm.id,
        payload,
      });

      await Promise.all([
        locationQuery.reload(),
        locationHistoryQuery.reload(),
      ]);

      messageApi.success("Local atualizado com sucesso.");
      handleCloseFormModal();
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error));
    }
  }

  /**
   * Confirma a exclusão da localização selecionada.
   *
   * Após excluir com sucesso, exibe mensagem, limpa o estado do modal
   * e retorna para a listagem de localizações.
   */
  async function handleConfirmRemoveLocation() {
    if (!locationToRemove) {
      return;
    }

    try {
      await deleteLocation.remove(locationToRemove.id);

      messageApi.success("Local excluído com sucesso.");
      setLocationToRemove(undefined);
      navigate("/locations");
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error));
    }
  }

  /**
   * Salva a alteração de status da localização selecionada.
   *
   * Envia o novo status e a observação opcional para o backend,
   * recarrega os dados do detalhe, exibe mensagem de sucesso e fecha o modal.
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
        locationQuery.reload(),
        locationHistoryQuery.reload(),
      ]);

      messageApi.success("Status atualizado com sucesso.");
      setLocationInStatus(undefined);
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error));
    }
  }

  if (locationQuery.isLoading) {
    return (
      <AppLayout currentPage="Detalhes">
        <Container>
          <StarterBox>
            <Spin /> Carregando localização...
          </StarterBox>
        </Container>
      </AppLayout>
    );
  }

  if (locationQuery.errorMessage) {
    return (
      <AppLayout currentPage="Detalhes">
        <Container>
          <StarterBox>{locationQuery.errorMessage}</StarterBox>
        </Container>
      </AppLayout>
    );
  }

  if (!location) {
    return (
      <AppLayout currentPage="Detalhes">
        <Container>
          <StarterBox>Localização não encontrada.</StarterBox>
        </Container>
      </AppLayout>
    );
  }

  return (
    <AppLayout currentPage="Detalhes">
      <Container>
        {/* Cabeçalho com ações principais: voltar, editar, status e excluir. */}
        <ResourceDetailsHeader
          title={location.name}
          code={location.code}
          backLabel="Voltar para localizações"
          status={
            <LocationStatusTag $status={location.status}>
              {getLocationStatusLabel(location.status)}
            </LocationStatusTag>
          }
          onBack={handleBackToLocations}
          onEdit={handleEditLocation}
          onChangeStatus={handleOpenStatusModal}
          onRemove={handleOpenRemoveModal}
        />

        {/* Cards calculados a partir da localização carregada pela API. */}
        <ResourceDetailSummaryCards
          ariaLabel="Resumo da localização"
          summaries={summaries}
        />

        <ContentGrid>
          <MainColumn>
            <LocationInfoCard location={location}></LocationInfoCard>
            <LocationNotesCard notes={location.description}></LocationNotesCard>
          </MainColumn>

          <SideColumn>
            <LocationHistoryCard
              history={historyPreview}
              hasMore={hasMoreHistory}
              onViewMore={() =>
                messageApi.info(
                  "A visualização do histórico completo será implementada em uma próxima etapa.",
                )
              }
            />
          </SideColumn>
        </ContentGrid>

        {/* Edição da localização. */}
        <LocationFormModal
          confirmLoading={isSavingForm}
          location={locationInForm}
          mode="edit"
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
