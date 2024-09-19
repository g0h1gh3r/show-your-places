import UserItem from './UsersItem'

/**Card */
import Card from '../../shared/components/UIElements/Card'
import '../../shared/components/UIElements/Card.css'
/**UserList */
import './UsersList.css'

const UsersList = (props) => {
  // If there is no user, show this below.
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    )
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => {
        const { id, image, name, places } = user
        return (
          <UserItem
            key={id}
            id={id}
            image={image}
            name={name}
            placeCount={places.length}
          ></UserItem>
        )
      })}
    </ul>
  )
}
export default UsersList
