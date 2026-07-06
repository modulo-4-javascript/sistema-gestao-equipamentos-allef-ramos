import { useCallback, useEffect, useState } from 'react'
import type { RequestState } from '../../../shared/hooks/requestState'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'
import { locationService } from '../services/locationService'
import type {
  GetLocationListParams,
  LocationDetails,
  PaginatedResult,
} from '../types/location'

// Hook da listagem: guarda dados, loading e erro, e recarrega quando os filtros mudam.
export function useLocationList(
  params: GetLocationListParams,
): RequestState<PaginatedResult<LocationDetails>> {
  const { page, pageSize, search, status, type } = params
  const [data, setData] = useState<PaginatedResult<LocationDetails>>()
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const loadLocationList = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = await locationService.getLocationList({
        page,
        pageSize,
        search,
        status,
        type,
      })
      setData(result)
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [page, pageSize, search, status, type])

  useEffect(() => {
    void Promise.resolve().then(loadLocationList)
  }, [loadLocationList])

  return {
    data,
    isLoading,
    errorMessage,
    reload: loadLocationList,
  }
}
