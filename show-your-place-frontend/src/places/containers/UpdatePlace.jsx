import { useParams } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators'
import './PlaceForm.css'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import { useForm } from '../../shared/hooks/form-hook'
import { useContext, useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { AuthContext } from '../../shared/context/auth-context'
const UpdatePlace = () => {
  const placeId = useParams().placeId
  const [loadedPlace, setLoadedPlace] = useState(null)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const history = useHistory()
  const auth = useContext(AuthContext)

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  )
  useEffect(() => {
    const getPlace = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        )
        setLoadedPlace(response.data.place)
        setFormData(
          {
            title: {
              value: response.data.place.title,
              isValid: true,
            },
            description: {
              value: response.data.place.description,
              isValid: true,
            },
          },
          true
        )
      } catch (error) {
        console.log(error)
      }
    }
    getPlace()
  }, [sendRequest, placeId, setFormData])

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        'PATCH',
        {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        },
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      )
      history.push(`/${auth.userId}/places`)
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return (
      <div className="center">
        <Card>
          <LoadingSpinner asOverlay />
        </Card>
      </div>
    )
  }

  if (!loadedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    )
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Title can not be empty."
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={formState.inputs.title.isValid}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min 5 characters)"
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={formState.inputs.description.isValid}
          />
          {/* <Input
            id="address"
            element="input"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Address can not be empty."
            onInput={inputHandler}
            initialValue={loadedPlace.address}
            initialValid={formState.inputs.address.isValid}
          /> */}
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  )
}
export default UpdatePlace
