import { useEffect } from "react"
import {
  useGetDataQuery,
  useLazyGetFavoritesQuery,
} from "../../services/registerApi"
import { useSelector } from "react-redux"

function Favorites() {
  const id = useSelector((state) => state.Ruser.id)

  const [getFavorites, { data: favorites, isLoading, isError }] =
    useLazyGetFavoritesQuery()

  const { data: properties } = useGetDataQuery()

  useEffect(() => {
    if (id) {
      getFavorites(id)
    }
  }, [id, getFavorites])

  if (isLoading) {
    return <p>Loading favorites...</p>
  }

  if (isError) {
    return <p>Error fetching favorites.</p>
  }

  const favoriteProperties = favorites?.favorites || []

  return (
    <div>
      <h1>Favorites</h1>

      <div>
        {properties?.map((property) => {
          if (favoriteProperties.includes(property._id)) {
            return (
              <div key={property._id}>
                <h2>{property.name || property.title}</h2>
                <p>{property.description}</p>
                <p>Price: {property.price}</p>
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}

export default Favorites