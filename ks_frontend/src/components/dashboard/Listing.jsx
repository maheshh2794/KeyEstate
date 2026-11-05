import { useSelector } from 'react-redux'
import {
  useGetDataQuery,
  useLazyGetDataQuery,
  useDeletePropertyMutation
} from '../../services/registerApi'
import './listing.css'

function Listing() {
  const user = useSelector((state) => state.Ruser.id)

  const {
    data: properties = [],
    isLoading,
    isError
  } = useGetDataQuery()

  const [deleteProperty] = useDeletePropertyMutation()
  const [getData] = useLazyGetDataQuery()

  async function deletefn(id) {
    try {
      await deleteProperty(id).unwrap()
      await getData()
    } catch (error) {
      console.log("Delete Property Error:", error)
    }
  }

  // Filter only the logged-in seller's properties
  const myListings = Array.isArray(properties)
    ? properties.filter((property) => {
        const listedBy =
          property?.listedBy?._id || property?.listedBy

        return (
          user &&
          listedBy &&
          String(listedBy) === String(user)
        )
      })
    : []

  if (isLoading) {
    return <p>Loading your listings...</p>
  }

  if (isError) {
    return <p>Unable to load listings.</p>
  }

  return (
    <div className="listing-page">

      <div className="listing-header">
        <h2 className="listing-title">My Listings</h2>
      </div>

      <div className="listing-grid">

        {myListings.length === 0 ? (

          <p className="no-listings">
            You haven't added any properties yet.
          </p>

        ) : (

          myListings.map((property) => (

            <div
              key={property._id}
              className="listing-card"
            >

              <div className="listing-image-wrapper">
                <img
                  className="listing-image"
                  src={
                    property.images?.[0] ||
                    '/default-property.jpg'
                  }
                  alt={property.title || "Property"}
                />
              </div>

              <div className="listing-card-content">

                <h3 className="listing-property-title">
                  {property.title}
                </h3>

                <div className="listing-card-footer">

                  <div className="listing-price">
                    <span className="listing-price-label">
                      Price
                    </span>

                    <span className="listing-price-value">
                      ₹{property.price?.toLocaleString('en-IN')}
                    </span>
                  </div>

                </div>

              </div>

              <div className="listing-delete-container">

                <button
                  className="listing-delete-button"
                  onClick={() => deletefn(property._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>
    </div>
  )
}

export default Listing
