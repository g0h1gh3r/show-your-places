import PlaceItem from './PlaceItem'
import Card from '../../shared/components/UIElements/Card'
import './PlaceList.css'
import Button from '../../shared/components/FormElements/Button'

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places Found. Maybe Create One?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    )
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => {
        const { id, title, image, description, address, creatorId, location } =
          place
        return (
          <PlaceItem
            key={id}
            id={id}
            image={image}
            title={title}
            description={description}
            address={address}
            creatorId={creatorId}
            coordinates={location}
            onDelete={props.onDeletePlace}
          ></PlaceItem>
        )
      })}
    </ul>
  )
}
export default PlaceList
