import UsersList from '../components/UsersList'
import { useEffect, useState } from 'react'

import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState([])

  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        )

        setLoadedUsers(response.data)
      } catch (error) {}
    }
    getUsers()
  }, [sendRequest])

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner></LoadingSpinner>
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers}></UsersList>}
    </>
  )
}
export default Users
