
import { useSelector } from "react-redux"
import './viewproperty.css'
import { useGetDataQuery } from "../../services/registerApi"


function ViewProperty() {
    const propertyid = useSelector((state)=>state.Ruser.property)
    const {data: prop} = useGetDataQuery()
    const property = prop?.find((prop) => prop._id === propertyid)

    return (
        <div className="view-property-page">
            <div className="view-property-header">
                <h1 className="view-property-heading">Property Details</h1>
                <p className="view-property-subtitle">
                    Explore the details of your selected property.
                </p>
            </div>

            <div className="view-property-card">
                <div className="view-property-image-wrapper">
                    <img
                        className="view-property-image"
                        src={property?.images}
                        alt={property?.title}
                    />
                </div>

                <div className="view-property-content">
                    <h2 className="view-property-title">{property?.title}</h2>

                    <p className="view-property-description">
                        {property?.description}
                    </p>

                    <div className="view-property-price">
                        ${property?.price.toLocaleString()}
                    </div>

                    <div className="view-property-details-grid">
                        <div className="view-property-detail">
                            <span className="view-property-label">Bedrooms</span>
                            <span className="view-property-value">{property?.bedrooms}</span>
                        </div>

                        <div className="view-property-detail">
                            <span className="view-property-label">Bathrooms</span>
                            <span className="view-property-value">{property?.bathrooms}</span>
                        </div>

                        <div className="view-property-detail">
                            <span className="view-property-label">Property Type</span>
                            <span className="view-property-value">{property?.prototype}</span>
                        </div>

                        <div className="view-property-detail">
                            <span className="view-property-label">Furnishing</span>
                            <span className="view-property-value">{property?.furnishing}</span>
                        </div>

                        <div className="view-property-detail">
                            <span className="view-property-label">Area</span>
                            <span className="view-property-value">
                                {property?.area} {property?.areau}
                            </span>
                        </div>

                        <div className="view-property-detail">
                            <span className="view-property-label">Status</span>
                            <span className="view-property-value">{property?.status}</span>
                        </div>
                    </div>

                    <div className="view-property-section">
                        <h3 className="view-property-section-title">Amenities</h3>

                        <div className="view-property-amenities">
                            {property?.amenities?.map((amenity) => (
                                <span className="view-property-amenity" key={amenity}>
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="view-property-section">
                        <h3 className="view-property-section-title">Address</h3>

                        <div className="view-property-address">
                            <p>{property?.address?.street}</p>
                            <p>{property?.address?.locality}</p>
                            <p>
                                {property?.address?.city}, {property?.address?.state}
                            </p>
                            <p>{property?.address?.pincode}</p>
                        </div>
                    </div>
                </div>
                <button>Add to Bokkings</button>
            </div>
        </div>
    )
}

export default ViewProperty
