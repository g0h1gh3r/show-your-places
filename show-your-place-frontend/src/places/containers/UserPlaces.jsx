import { useEffect, useState } from 'react'
import PlaceList from '../components/PlaceList'
import { useParams } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

export const PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    image:
      'https://images.unsplash.com/photo-1569521862953-e999a7f8b1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDg3OTJ8MHwxfHNlYXJjaHwzfHxlbXBpcmVzdGF0ZWJ1aWxkaW5nfGVufDB8fHx8MTcyNTkyOTYxNnww&ixlib=rb-4.0.3&q=80&w=1080',
    address: '350 5th Ave, New York, NY 10001',
    creatorId: '2',
    location: {
      lat: 40.7484405,
      lng: -73.9882393,
    },
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    image:
      'https://images.unsplash.com/photo-1569521862953-e999a7f8b1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDg3OTJ8MHwxfHNlYXJjaHwzfHxlbXBpcmVzdGF0ZWJ1aWxkaW5nfGVufDB8fHx8MTcyNTkyOTYxNnww&ixlib=rb-4.0.3&q=80&w=1080',
    address: '350 5th Ave, New York, NY 10001',
    creatorId: '2',
    location: {
      lat: 40.7484405,
      lng: -73.9882393,
    },
  },
  {
    id: 'p3',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    image:
      'https://www.tripsavvy.com/thmb/sBI2W7YNV4vRSVdbRVfASLH3F6I=/2617x3874/filters:fill(auto,1)/5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg',
    address: '350 5th Ave, New York, NY 10001',
    creatorId: '3',
    location: {
      lat: 40.7484405,
      lng: -73.9882393,
    },
  },
  {
    id: 'p4',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    image:
      'https://www.tripsavvy.com/thmb/sBI2W7YNV4vRSVdbRVfASLH3F6I=/2617x3874/filters:fill(auto,1)/5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg',
    address: '350 5th Ave, New York, NY 10001',
    creatorId: '2',
    location: {
      lat: 40.7484405,
      lng: -73.9882393,
    },
  },
  {
    id: 'p5',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    image:
      'https://www.tripsavvy.com/thmb/sBI2W7YNV4vRSVdbRVfASLH3F6I=/2617x3874/filters:fill(auto,1)/5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg',
    address: '350 5th Ave, New York, NY 10001',
    creatorId: '2',
    location: {
      lat: 40.7484405,
      lng: -73.9882393,
    },
  },
  {
    id: 'p6',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    image:
      'https://www.tripsavvy.com/thmb/sBI2W7YNV4vRSVdbRVfASLH3F6I=/2617x3874/filters:fill(auto,1)/5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg',
    address: '350 5th Ave, New York, NY 10001',
    creatorId: '1',
    location: {
      lat: 40.7484405,
      lng: -73.9882393,
    },
  },
  {
    id: 'p7',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    image:
      'https://www.tripsavvy.com/thmb/sBI2W7YNV4vRSVdbRVfASLH3F6I=/2617x3874/filters:fill(auto,1)/5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg',
    address: '350 5th Ave, New York, NY 10001',
    creatorId: '1',
    location: {
      lat: 40.7484405,
      lng: -73.9882393,
    },
  },
  {
    id: 'p8',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    image:
      'https://www.tripsavvy.com/thmb/sBI2W7YNV4vRSVdbRVfASLH3F6I=/2617x3874/filters:fill(auto,1)/5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg',
    address: '350 5th Ave, New York, NY 10001',
    creatorId: '2',
    location: {
      lat: 40.7484405,
      lng: -73.9882393,
    },
  },
  {
    id: 'p9',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    image:
      'https://www.tripsavvy.com/thmb/sBI2W7YNV4vRSVdbRVfASLH3F6I=/2617x3874/filters:fill(auto,1)/5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg',
    address: '350 5th Ave, New York, NY 10001',
    creatorId: '1',
    location: {
      lat: 40.7484405,
      lng: -73.9882393,
    },
  },
]
const UserPlaces = () => {
  const userId = useParams().userId
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const respond = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        )

        setLoadedPlaces(respond.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPlaces()
  }, [sendRequest, userId])

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    )
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </>
  )
}
export default UserPlaces
