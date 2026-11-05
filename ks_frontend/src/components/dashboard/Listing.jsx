
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    )

    if (!confirmDelete) return

    try {
      await deleteProperty(id).unwrap()
      await getData()
    } catch (error) {
      console.error("Delete property failed:", error)
      alert(error?.data?.msg || "Unable to delete property")
    }
  }

  if (isLoading) {
    return <div className="listing-page">Loading listings...</div>
  }

  if (isError) {
    return <div className="listing-page">Unable to load listings.</div>
  }

  const userProperties = properties.filter((property) => {
    const listedBy = property?.listedBy?._id || property?.listedBy

    return user && listedBy && String(listedBy) === String(user)
  })

  return (
    <div className="listing-page">

      <div className="listing-header">
        <h2 className="listing-title">Listings</h2>
      </div>

      <div className="listing-grid">

        {userProperties.length > 0 ? (
          userProperties.map((property) => (

            <div
              key={property._id}
              className="listing-card"
            >

              <div className="listing-image-wrapper">
                <img
                  className="listing-image"
                  src={
                    property.images?.[0]
                      ? property.images[0]
                      : '/default-property.jpg'
                  }
                  alt={property.title}
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
        ) : (
          <p className="listing-empty">
            You haven't listed any properties yet.
          </p>
        )}

      </div>
    </div>
  )
}

export default Listing
