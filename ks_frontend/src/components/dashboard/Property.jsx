
import React from 'react'
import { useGetDataQuery } from '../../services/registerApi'

function Property() {
  const {
    data: properties,
    isLoading,
  } = useGetDataQuery()

  if (isLoading) {
    return <p>Loading property details...</p>
  }

  return (
    <div>
      <h2>Properties</h2>

      {properties.map((property) => (
        <div key={property._id}>
          <h3>{property.title}</h3>
          <p>{property.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Property
