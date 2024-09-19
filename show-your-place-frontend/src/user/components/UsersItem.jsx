import { Link } from 'react-router-dom'
/**Avatar */
import Avatar from '../../shared/components/UIElements/Avatar'
import '../../shared/components/UIElements/Avatar.css'
/**Card */
import Card from '../../shared/components/UIElements/Card'
import '../../shared/components/UIElements/Card.css'
/**UserItem */
import './UsersItem.css'
const UserItem = (props) => {
  const { image, name, placeCount, id } = props
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={name}></Avatar>
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount}
              {placeCount === 1 ? ' Place' : ' Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  )
}
export default UserItem
