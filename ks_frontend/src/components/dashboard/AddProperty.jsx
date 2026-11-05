
import { useState } from 'react'
import { useAddPropertyMutation } from '../../services/registerApi'
import './addproperty.css'

function AddProperty() {
  const [addProperty, { isLoading, isSuccess, error }] = useAddPropertyMutation()

  const [formData, setFormData] = useState({
    title: '',
    propertyType: '',
    description: '',
    listingType: '',
    price: '',
    street: '',
    locality: '',
    city: '',
    state: '',
    pincode: '',
    bedrooms: '0',
    bathrooms: '0',
    area: '',
    areaUnit: 'sqft',
    furnishing: 'Unfurnished',
    images: [],
    amenities: ''
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === 'images') {
      const selectedFiles = Array.from(files || [])

      if (selectedFiles.length > 10) {
        alert('You can select a maximum of 10 images.')
        e.target.value = ''
        setFormData({
          ...formData,
          images: []
        })
        return
      }

      setFormData({
        ...formData,
        images: selectedFiles
      })
      return
    }

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const propertyData = new FormData()

    propertyData.append('title', formData.title)
    propertyData.append('propertyType', formData.propertyType)
    propertyData.append('description', formData.description)
    propertyData.append('listingType', formData.listingType)
    propertyData.append('price', Number(formData.price))

    propertyData.append('street', formData.street)
    propertyData.append('locality', formData.locality)
    propertyData.append('city', formData.city)
    propertyData.append('state', formData.state)
    propertyData.append('pincode', formData.pincode)

    propertyData.append('bedrooms', Number(formData.bedrooms))
    propertyData.append('bathrooms', Number(formData.bathrooms))
    propertyData.append('area', Number(formData.area))
    propertyData.append('areaUnit', formData.areaUnit)
    propertyData.append('furnishing', formData.furnishing)

    formData.images.forEach((image) => {
      propertyData.append('images', image)
    })

    propertyData.append(
      'amenities',
      JSON.stringify(
        formData.amenities
          .split(',')
          .map(item => item.trim())
          .filter(Boolean)
      )
    )

    await addProperty(propertyData)
  }

  return (
    <div className="add-property-page">
      <div className="add-property-header">
        <h1 className="add-property-title">Add Property</h1>
        <p className="add-property-subtitle">
          Enter the details below to list a property on KeyEstate.
        </p>
      </div>

      <form className="add-property-card" onSubmit={handleSubmit}>
        <div className="add-property-section">
          <h2 className="add-property-section-title">Basic Information</h2>

          <div className="add-property-grid">
            <div className="add-property-field">
              <label className="add-property-label">Title</label>
              <input
                className="add-property-input"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter property title"
                required
              />
            </div>

            <div className="add-property-field">
              <label className="add-property-label">Property Type</label>
              <select
                className="add-property-input"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select property type</option>
                <option value="Apartment">Apartment</option>
                <option value="Independent House">Independent House</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="add-property-field add-property-full-width">
              <label className="add-property-label">Description</label>
              <textarea
                className="add-property-input"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the property"
                rows="4"
                required
              />
            </div>

            <div className="add-property-field">
              <label className="add-property-label">Listing Type</label>
              <select
                className="add-property-input"
                name="listingType"
                value={formData.listingType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select listing type</option>
                <option value="Sale">Sale</option>
                <option value="Rent">Rent</option>
              </select>
            </div>

            <div className="add-property-field">
              <label className="add-property-label">Price (₹)</label>
              <input
                className="add-property-input"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                placeholder="Enter price"
                required
              />
            </div>
          </div>
        </div>

        <div className="add-property-section">
          <h2 className="add-property-section-title">Address Details</h2>

          <div className="add-property-grid">
            <div className="add-property-field">
              <label className="add-property-label">Street</label>
              <input
                className="add-property-input"
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street address"
              />
            </div>

            <div className="add-property-field">
              <label className="add-property-label">Locality *</label>
              <input
                className="add-property-input"
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                placeholder="Enter locality"
                required
              />
            </div>

            <div className="add-property-field">
              <label className="add-property-label">City *</label>
              <input
                className="add-property-input"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
              />
            </div>

            <div className="add-property-field">
              <label className="add-property-label">State *</label>
              <input
                className="add-property-input"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                required
              />
            </div>

            <div className="add-property-field">
              <label className="add-property-label">Pincode</label>
              <input
                className="add-property-input"
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
              />
            </div>
          </div>
        </div>

        <div className="add-property-section">
          <h2 className="add-property-section-title">Property Features</h2>

          <div className="add-property-grid">
            <div className="add-property-field">
              <label className="add-property-label">Bedrooms</label>
              <input
                className="add-property-input"
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="add-property-field">
              <label className="add-property-label">Bathrooms</label>
              <input
                className="add-property-input"
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="add-property-field">
              <label className="add-property-label">Area *</label>
              <input
                className="add-property-input"
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                min="0"
                placeholder="Enter area"
                required
              />
            </div>

            <div className="add-property-field">
              <label className="add-property-label">Area Unit</label>
              <select
                className="add-property-input"
                name="areaUnit"
                value={formData.areaUnit}
                onChange={handleChange}
              >
                <option value="sqft">Square Feet (sqft)</option>
                <option value="sqyd">Square Yards (sqyd)</option>
                <option value="sqm">Square Meters (sqm)</option>
              </select>
            </div>

            <div className="add-property-field">
              <label className="add-property-label">Furnishing</label>
              <select
                className="add-property-input"
                name="furnishing"
                value={formData.furnishing}
                onChange={handleChange}
              >
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Fully-Furnished">Fully-Furnished</option>
              </select>
            </div>

            <div className="add-property-field">
              <label className="add-property-label">
                Property Images (Maximum 10)
              </label>
              <input
                className="add-property-input"
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleChange}
                required
              />

              <p>
                {formData.images.length} of 10 images selected
              </p>
            </div>

            <div className="add-property-field add-property-full-width">
              <label className="add-property-label">Amenities</label>
              <input
                className="add-property-input"
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="e.g. Parking, Swimming Pool, Gym"
              />
            </div>
          </div>
        </div>

        <div className="add-property-actions">
          <button
            className="add-property-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Adding Property...' : 'Add Property'}
          </button>
        </div>

        {isSuccess && <p>Property added successfully!</p>}

        {error && (
          <p>
            Failed to add property: {
              error.data?.error ||
              error.data?.message ||
              'Please try again.'
            }
          </p>
        )}
      </form>
    </div>
  )
}

export default AddProperty
