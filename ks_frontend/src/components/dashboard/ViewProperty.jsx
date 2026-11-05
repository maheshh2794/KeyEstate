
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './viewproperty.css'

import {
    useAddBookingMutation,
    useGetBookingsbyUserQuery,
    useGetDataQuery,
    useLazyGetBookingsbyUserQuery
} from "../../services/registerApi"

function ViewProperty() {
    const user = useSelector((state) => state.Ruser.id)
    const propertyid = useSelector((state) => state.Ruser.property)

    const [message, setMessage] = useState('')
    const [activeImage, setActiveImage] = useState(0)

    const navigate = useNavigate()

    const {
        data: prop,
        isLoading,
        isError
    } = useGetDataQuery()

    const property = prop?.find((prop) => prop._id === propertyid)

    const [addBookfn, { isLoading: bookingLoading }] =
        useAddBookingMutation()

    const [getBookfn] = useLazyGetBookingsbyUserQuery()

    const { data: userbookings } = useGetBookingsbyUserQuery(user)

    useEffect(() => {
        setActiveImage(0)
    }, [propertyid])

    async function addfn(propertyid, sellerid) {
        await addBookfn({
            property: propertyid,
            user: user,
            owner: sellerid,
            message: message
        })

        setMessage("")
        getBookfn(user)
    }

    if (isLoading) {
        return <p className="view-property-message">Loading property details...</p>
    }

    if (isError) {
        return <p className="view-property-message">Failed to load property details.</p>
    }

    if (!property) {
        return <p className="view-property-message">Property not found.</p>
    }

    const images = property.images || []

    const alreadyBooked = userbookings?.some(
        (booking) => booking.property === property._id
    )

    const previousImage = () => {
        setActiveImage((current) =>
            current === 0 ? images.length - 1 : current - 1
        )
    }

    const nextImage = () => {
        setActiveImage((current) =>
            current === images.length - 1 ? 0 : current + 1
        )
    }

    return (
        <div className="view-property-page">

            <div className="view-property-header">
                <h1 className="view-property-heading">
                    Property Details
                </h1>

                <p className="view-property-subtitle">
                    Explore the details of your selected property.
                </p>
            </div>

            <div className="view-property-card">

                {/* Property Image Gallery */}
                <div className="property-gallery">

                    <div className="property-main-image">

                        <img
                            src={
                                images.length > 0
                                    ? images[activeImage]
                                    : '/default-property.jpg'
                            }
                            alt={property.title}
                        />

                        {images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className="gallery-arrow gallery-prev"
                                    onClick={previousImage}
                                >
                                    ❮
                                </button>

                                <button
                                    type="button"
                                    className="gallery-arrow gallery-next"
                                    onClick={nextImage}
                                >
                                    ❯
                                </button>

                                <span className="gallery-counter">
                                    {activeImage + 1} / {images.length}
                                </span>
                            </>
                        )}

                    </div>

                    {images.length > 1 && (
                        <div className="property-thumbnails">

                            {images.map((image, index) => (

                                <button
                                    type="button"
                                    key={index}
                                    className={`property-thumbnail ${
                                        activeImage === index ? 'active' : ''
                                    }`}
                                    onClick={() => setActiveImage(index)}
                                >
                                    <img
                                        src={image}
                                        alt={`Property ${index + 1}`}
                                    />
                                </button>

                            ))}

                        </div>
                    )}

                </div>

                <div className="view-property-content">

                    <h2 className="view-property-title">
                        {property.title}
                    </h2>

                    <p className="view-property-description">
                        {property.description}
                    </p>

                    <div className="view-property-price">
                        ₹{property.price?.toLocaleString('en-IN')}
                    </div>

                    <div className="view-property-details-grid">

                        <div className="view-property-detail">
                            <span className="view-property-label">Bedrooms</span>
                            <span className="view-property-value">{property.bedrooms}</span>
                        </div>

                        <div className="view-property-detail">
                            <span className="view-property-label">Bathrooms</span>
                            <span className="view-property-value">{property.bathrooms}</span>
                        </div>

                        <div className="view-property-detail">
                            <span className="view-property-label">Property Type</span>
                            <span className="view-property-value">{property.propertyType}</span>
                        </div>

                        <div className="view-property-detail">
                            <span className="view-property-label">Listing Type</span>
                            <span className="view-property-value">{property.listingType}</span>
                        </div>

                        <div className="view-property-detail">
                            <span className="view-property-label">Furnishing</span>
                            <span className="view-property-value">{property.furnishing}</span>
                        </div>

                        <div className="view-property-detail">
                            <span className="view-property-label">Area</span>
                            <span className="view-property-value">
                                {property.area} {property.areaUnit}
                            </span>
                        </div>

                        <div className="view-property-detail">
                            <span className="view-property-label">Status</span>
                            <span className="view-property-value">{property.status}</span>
                        </div>

                    </div>

                    <div className="view-property-section">
                        <h3 className="view-property-section-title">Amenities</h3>

                        <div className="view-property-amenities">
                            {property.amenities?.map((amenity) => (
                                <span
                                    className="view-property-amenity"
                                    key={amenity}
                                >
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="view-property-section">
                        <h3 className="view-property-section-title">Address</h3>

                        <div className="view-property-address">
                            <p>{property.address?.street}</p>
                            <p>{property.address?.locality}</p>
                            <p>
                                {property.address?.city}, {property.address?.state}
                            </p>
                            <p>{property.address?.pincode}</p>
                        </div>
                    </div>

                </div>

                {user !== property.listedBy ? (

                    <div>

                        {!alreadyBooked && (
                            <div className="view-property-booking-controls">
                                <h3>Interested in this property?</h3>

                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter a message for the owner"
                                />

                                <button
                                    type="button"
                                    disabled={bookingLoading}
                                    onClick={() => addfn(property._id, property.listedBy)}
                                >
                                    {bookingLoading
                                        ? 'Adding Booking...'
                                        : 'Add Booking'}
                                </button>
                            </div>
                        )}

                        {alreadyBooked && (
                            <div className="view-property-booking-controls">
                                <h2>You already Booked this property</h2>
                                <button onClick={() => navigate('/home/property')}>
                                    Go Back
                                </button>
                            </div>
                        )}

                    </div>

                ) : (

                    <div className="view-property-section">
                        <p>You are the owner of this property.</p>

                        <button
                            type="button"
                            onClick={() => navigate('/home/property')}
                        >
                            Back to Properties
                        </button>
                    </div>

                )}

            </div>

        </div>
    )
}

export default ViewProperty
