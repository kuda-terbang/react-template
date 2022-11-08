import { useEffect } from 'react'
import type { DependencyList } from 'react'

const useDebounce = <TInput, TResponse>({
  debounceTime = 1000,
  fetchFunction,
  inputFetchFunction,
  keyChanges,
  isRun,
  onSuccessFetch,
}: {
  debounceTime?: number
  fetchFunction: (input: TInput) => Promise<TResponse>
  keyChanges: DependencyList
  inputFetchFunction: TInput
  isRun: boolean
  onSuccessFetch: (data: TResponse) => void
}) => {
  useEffect(() => {
    let timeoutFunc: NodeJS.Timeout
    if (isRun) {
      const fetchData = async () => {
        const data = await fetchFunction(inputFetchFunction)
        onSuccessFetch(data)
      }
      timeoutFunc = setTimeout(() => {
        fetchData()
      }, debounceTime)
    }
    return () => {
      if (timeoutFunc) {
        clearTimeout(timeoutFunc)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyChanges, isRun])
}

export default useDebounce
