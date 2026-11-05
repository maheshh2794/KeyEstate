
import { useSelector } from 'react-redux'
import {
  useGetDataQuery,
  useLazyGetDataQuery,
  useDeletePropertyMutation
} from '../../services/registerApi'
import './listing.css'

function Listing() {
  const user = useSelector((state) => state.Ruser.id)

  const { data: properties = [] } = useGetDataQuery()

  const [deleteProperty] = useDeletePropertyMutation()
  const [getData] = useLazyGetDataQuery()

  async function deletefn(id) {
    await deleteProperty(id)
    getData()
  }

  return (
    <div className="listing-page">

      <div className="listing-header">
        <h2 className="listing-title">Listings</h2>
      </div>

      <div className="listing-grid">

        {properties.map((property) => {
          const listedBy =
            property?.listedBy?._id || property?.listedBy

          if (
            user &&
            listedBy &&
            String(listedBy) === String(user)
          ) {

            return (
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
            )
          }

          return null
        })}

      </div>
    </div>
  )
}

export default Listing
