import { useCallback, useEffect, useState } from 'react'
import type { RequestState } from '../../../shared/hooks/requestState'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'
import { locationService } from '../services/locationService'
import type { LocationSummaryResponse } from '../types/location'

// Hook do resumo: busca os números usados nos cards do topo.
export function useLocationSummary(): RequestState<LocationSummaryResponse> {
  const [data, setData] = useState<LocationSummaryResponse>()
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const loadLocationSummary = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = await locationService.getLocationSummary()
      setData(result)
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void Promise.resolve().then(loadLocationSummary)
  }, [loadLocationSummary])

  return {
    data,
    isLoading,
    errorMessage,
    reload: loadLocationSummary,
  }
}
