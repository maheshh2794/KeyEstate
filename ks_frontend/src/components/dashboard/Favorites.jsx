
import { useEffect } from 'react'
import {
  useGetDataQuery,
  useLazyGetFavoritesQuery,
  useAddFavoriteMutation
} from '../../services/registerApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { viewproperty } from '../auth/userSlice'
import './favorites.css'

function Favorites() {
  const user = useSelector((state) => state.Ruser.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [
    getFavorites,
    { data: favorites, isLoading, isError }
  ] = useLazyGetFavoritesQuery()

  const [addfav] = useAddFavoriteMutation()

  const {
    data: properties,
    isLoading: propertiesLoading,
    isError: propertiesError
  } = useGetDataQuery()

  useEffect(() => {
    if (user) {
      getFavorites(user)
    }
  }, [user, getFavorites])

  if (isLoading || propertiesLoading) {
    return (
      <p className="favorites-message">
        Loading favorites...
      </p>
    )
  }

  if (isError || propertiesError) {
    return (
      <p className="favorites-message favorites-error">
        Error fetching favorites.
      </p>
    )
  }

  const favoriteProperties = favorites?.favorites || []

  const favoritePropertyList = (properties || []).filter(
    (property) => favoriteProperties.includes(property._id)
  )

  async function addfavhandler(a, b) {
    await addfav({
      userid: a,
      propertyid: b
    })

    getFavorites(a)
  }

  return (
    <div className="favorites-page">

      <div className="favorites-header">
        <h1 className="favorites-title">My Favorites</h1>

        <p className="favorites-subtitle">
          Your saved properties in one place.
        </p>
      </div>

      {favoritePropertyList.length === 0 ? (

        <div className="favorites-empty">
          <div className="favorites-empty-icon">♡</div>

          <h2>No Favorites Yet</h2>

          <p>
            You haven't added any favorite properties yet.
            Explore properties and save your favorites here.
          </p>
        </div>

      ) : (

        <div className="favorites-grid">

          {favoritePropertyList.map((property) => (

            <div key={property._id} className="favorites-card">

              <button
                className="property-favorite-button is-favorite"
                onClick={() =>
                  addfavhandler(user, property._id)
                }
                aria-label="Remove from favorites"
              >
                ♥
              </button>

              <div className="property-image-wrapper">
                <img
                  className="property-image"
                  src={
                    property.images?.[0]
                      ? `http://localhost:4000${property.images[0]}`
                      : '/default-property.jpg'
                  }
                  alt={property.title}
                />
              </div>

              <div className="favorites-card-content">

                <h2 className="favorites-property-title">
                  {property.title}
                </h2>

                <p className="favorites-description">
                  {property.description}
                </p>

                <div className="favorites-card-footer">

                  <div className="favorites-price">
                    <span className="favorites-price-label">
                      Price
                    </span>

                    <span className="favorites-price-value">
                      ₹{property.price?.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    className="favorites-view-button"
                    onClick={() => {
                      window.localStorage.setItem(
                        'propertyid',
                        property._id
                      )

                      dispatch(viewproperty(property._id))
                      navigate('/home/viewproperty')
                    }}
                  >
                    View Details
                  </button>

                </div>
              </div>
            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default Favorites
