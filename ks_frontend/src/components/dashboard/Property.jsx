
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAddFavoriteMutation, useGetDataQuery, useLazyGetFavoritesQuery } from '../../services/registerApi'
import './property.css'
import { viewproperty } from '../auth/userSlice'
import { useNavigate } from 'react-router-dom'

function Property() {
  const user = useSelector((state)=>state.Ruser.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [addfav]= useAddFavoriteMutation()
  
  async function addfavhandler(a,b){
    addfav({userid:a,propertyid:b})
  }

  

  const {
    data: properties,
    isLoading,
    isError,
    error
  } = useGetDataQuery()

  if (isLoading) {
    return <p className="property-message">Loading property details...</p>
  }

  if (isError) {
    return (
      <p className="property-message property-error">
        Error fetching property details
      </p>
    )
  }

  return (
    <div className="properties-page">
      <div className="properties-header">
        <h2 className="properties-title">Properties</h2>
        <p className="properties-subtitle">
          Explore properties and find your perfect place.
        </p>
      </div>

      <div className="properties-grid">
        {(properties || []).map((property) => (
          <div key={property._id} className="property-card">

            {/* Favorite Button */}
            <button className='property-favorite-button' onClick={()=>{addfavhandler(user,property._id)}}>
              {/* {favorites.includes(property._id) ? '♥' : '♡'} */}
              ♥

            </button>

            <div className="property-image-wrapper">
              <img
                className="property-image"
                src={property.images?.[0]}
                alt={property.title}
              />
            </div>

            <div className="property-card-content">
              <h3 className="property-title">{property.title}</h3>

              <div className="property-description">
                {property.description}
              </div>

              <div className="property-features">
                <div className="property-feature">
                  <span className="property-feature-label">Bedrooms</span>
                  <span className="property-feature-value">
                    {property.bedrooms}
                  </span>
                </div>

                <div className="property-feature">
                  <span className="property-feature-label">Bathrooms</span>
                  <span className="property-feature-value">
                    {property.bathrooms}
                  </span>
                </div>
              </div>

              <div className="property-amenities">
                <span className="property-feature-label">Amenities</span>

                <div className="property-amenity-list">
                  {property.amenities?.map((amenity) => (
                    <span className="property-amenity" key={amenity}>
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="property-card-footer">
                <div className="property-price">
                  <span className="property-price-label">Price</span>

                  <span className="property-price-value">
                    ₹{property.price?.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  className="property-view-button"
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
    </div>
  )
}

export default Property