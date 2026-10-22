
import { useDispatch } from 'react-redux'
import { useGetDataQuery } from '../../services/registerApi'
import './property.css'
import { viewproperty } from '../auth/userSlice'
import { useNavigate } from 'react-router-dom'

function Property() {
  const {
    data: properties,
    isLoading,
  } = useGetDataQuery()

  if (isLoading) {
    return <p>Loading property details...</p>
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div>
      <h2>Properties</h2>

      {properties.map((property) => (
        <div key={property._id} className="property-card">
          <img src={property.image} alt={property.title} style={{ width: '200px', height: '150px' }} />
          <h3>{property.title}</h3>
          <div>{property.description}</div>
          <div>Bedrooms: {property.bedrooms}</div>
          <div>Bathrooms: {property.bathrooms}</div>
          <div>Amenities: {property.amenities.map((amenity) => <span key={amenity}>{amenity}, </span>)}</div>
          <div>Price: ${property.price.toLocaleString()}</div>
          <button onClick={()=>{dispatch(viewproperty(property)) 
            navigate('/home/viewproperty')
          }} >View Details</button>
        </div>
      ))}
    </div>
  )
}

export default Property
