import { ResourceStatusModal } from '../../../../shared/components/ResourceStatusModal'
import type { ResourceStatusFormValues } from '../../../../shared/components/ResourceStatusModal'
import {
  getLocationStatusLabel,
  type LocationDetails,
  type LocationStatus,
} from '../../types/location'

export type LocationStatusFormValues = ResourceStatusFormValues<LocationStatus>

interface LocationStatusModalProps {
  location?: LocationDetails
  confirmLoading?: boolean
  open: boolean
  statusOptions: LocationStatus[]
  onCancel: () => void
  onSubmit: (values: LocationStatusFormValues) => void
}

export function LocationStatusModal({
  location,
  confirmLoading,
  open,
  statusOptions,
  onCancel,
  onSubmit,
}: LocationStatusModalProps) {
  return (
    <ResourceStatusModal
      confirmLoading={confirmLoading}
      currentStatus={location?.status}
      currentStatusPrefix="Situação atual"
      getStatusLabel={getLocationStatusLabel}
      notePlaceholder="Ex: local temporariamente indisponível para manutenção."
      open={open}
      statusLabel="Nova situação"
      statusOptions={statusOptions}
      title="Alterar situação"
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  )
}
