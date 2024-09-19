import axios from 'axios'
import { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const activeHttpRequest = useRef([])

  const sendRequest = useCallback(
    async (url, method = 'GET', data = null, header = {}) => {
      setIsLoading(true)

      const httpAbortController = new AbortController()
      activeHttpRequest.current.push(httpAbortController)
      try {
        const response = await axios({
          url: url,
          method: method,
          data: data,
          headers: header,
          signal: httpAbortController.signal,
        })
        setIsLoading(false)

        return response
      } catch (err) {
        setIsLoading(false)
        console.log(err)
        setError(err.message || 'Something went wrong, please try again.')
      }
    },
    []
  )
  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort())
    }
  }, [])
  return { isLoading, error, sendRequest, clearError }
}
