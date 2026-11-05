
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useAddFavoriteMutation,
  useGetDataQuery,
  useGetFavoritesQuery,
  useLazyGetFavoritesQuery
} from '../../services/registerApi'
import './property.css'
import { viewproperty } from '../auth/userSlice'
import { useNavigate } from 'react-router-dom'

const initialFilters = {
  city: '',
  price: '',
  status: '',
  listingType: '',
  propertyType: '',
  furnishing: ''
}

function Property() {
  const user = useSelector((state) => state.Ruser.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Filter States
  const [filters, setFilters] = useState(initialFilters)
  const [appliedFilters, setAppliedFilters] = useState(initialFilters)

  // Favorite Mutation
  const [addfav] = useAddFavoriteMutation()

  const [getFavorites, { data: updatedFavorites }] =
    useLazyGetFavoritesQuery()

  // Get Properties
  const {
    data: properties,
    isLoading,
    isError
  } = useGetDataQuery()

  // Get Favorites
  const { data: favorites } = useGetFavoritesQuery(user, {
    skip: !user
  })

  // Favorite Data
  const favoritesdata =
    updatedFavorites?.favorites || favorites?.favorites || []

  // Handle Filter Changes
  function handleFilterChange(e) {
    const { name, value } = e.target

    setFilters((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Apply Filters
  function applyFilters() {
    setAppliedFilters({ ...filters })
  }

  // Clear Filters
  function clearFilters() {
    setFilters({ ...initialFilters })
    setAppliedFilters({ ...initialFilters })
  }

  // Add Favorite
  async function addfavhandler(a, b) {
    await addfav({ userid: a, propertyid: b })
    getFavorites(user)
  }

  // Filter Properties
  const filteredProperties = (properties || []).filter((property) => {
    const city = property.city || property.location || ''

    return (
      (!appliedFilters.city ||
        city.toLowerCase() === appliedFilters.city.toLowerCase()) &&

      (!appliedFilters.price ||
        Number(property.price) <= Number(appliedFilters.price)) &&

      (!appliedFilters.status ||
        property.status === appliedFilters.status) &&

      (!appliedFilters.listingType ||
        property.listingType === appliedFilters.listingType) &&

      (!appliedFilters.propertyType ||
        property.propertyType === appliedFilters.propertyType) &&

      (!appliedFilters.furnishing ||
        property.furnishing === appliedFilters.furnishing)
    )
  })

  // Loading
  if (isLoading) {
    return (
      <p className="property-message">
        Loading property details...
      </p>
    )
  }

  // Error
  if (isError) {
    return (
      <p className="property-message property-error">
        Error fetching property details
      </p>
    )
  }

  return (
    <div className="properties-page">

      {/* Header */}
      <div className="properties-header">
        <h2 className="properties-title">
          Properties
        </h2>

        <p className="properties-subtitle">
          Explore properties and find your perfect place.
        </p>
      </div>

      {/* Featured Filters */}
      <div className="filter-section">

        <h3>Filter</h3>

        <div className="property-filters">

          {/* City */}
          <select
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
          >
            <option value="">Select City</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bhimavaram">Bhimavaram</option>
            <option value="Vijayawada">Vijayawada</option>
            <option value="Vizag">Vizag</option>
          </select>

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price upto"
            value={filters.price}
            onChange={handleFilterChange}
            min="0"
          />

          {/* Status */}
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>

          {/* Listing Type */}
          <select
            name="listingType"
            value={filters.listingType}
            onChange={handleFilterChange}
          >
            <option value="">Listing Type</option>
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>

          {/* Property Type */}
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
          >
            <option value="">Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Plot">Plot</option>
          </select>

          {/* Furnishing */}
          <select
            name="furnishing"
            value={filters.furnishing}
            onChange={handleFilterChange}
          >
            <option value="">Select Furnishing</option>
            <option value="Furnished">Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>

          {/* Apply Button */}
          <button
            type="button"
            className="apply-filter-button"
            onClick={applyFilters}
          >
            Apply Filters
          </button>

          {/* Clear Button */}
          <button
            type="button"
            className="clear-filter-button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>
      </div>

      {/* Property Count */}
      <p className="property-count">
        Showing {filteredProperties.length} properties
      </p>

      {/* Properties Grid */}
      <div className="properties-grid">

        {filteredProperties.map((property) => {

          return (
            <div
              key={property._id}
              className="property-card"
            >

              {/* Favorite Button */}
              <button
                className={`property-favorite-button ${
                  favoritesdata.includes(property._id)
                    ? 'is-favorite'
                    : ''
                }`}
                onClick={() => addfavhandler(user, property._id)}
                aria-label={
                  favoritesdata.includes(property._id)
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
              >
                {favoritesdata.includes(property._id) ? '♥' : '♡'}
              </button>

              {/* Property Image */}
              <div className="property-image-wrapper">
                <img
                  className="property-image"
                  src={
                    property.images?.[0]
                      ? property.images[0]
                      : '/default-property.jpg'
                  }
                  alt={property.title}
                />
              </div>

              {/* Property Content */}
              <div className="property-card-content">

                <h3 className="property-title">
                  {property.title}
                </h3>

                <div className="property-description">
                  {property.description}
                </div>

                {/* Features */}
                <div className="property-features">

                  <div className="property-feature">
                    <span className="property-feature-label">
                      Bedrooms
                    </span>

                    <span className="property-feature-value">
                      {property.bedrooms}
                    </span>
                  </div>

                  <div className="property-feature">
                    <span className="property-feature-label">
                      Bathrooms
                    </span>

                    <span className="property-feature-value">
                      {property.bathrooms}
                    </span>
                  </div>

                </div>

                {/* Amenities */}
                <div className="property-amenities">

                  <span className="property-feature-label">
                    Amenities
                  </span>

                  <div className="property-amenity-list">
                    {property.amenities?.map((amenity) => (
                      <span
                        className="property-amenity"
                        key={amenity}
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Footer */}
                <div className="property-card-footer">

                  <div className="property-price">

                    <span className="property-price-label">
                      Price
                    </span>

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
          )
        })}

      </div>

      {/* No Properties Found */}
      {filteredProperties.length === 0 && (
        <p className="property-message">
          No properties found matching your filters.
        </p>
      )}

    </div>
  )
}

export default Property
