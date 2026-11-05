
import { useSelector } from "react-redux";
import {
    useDeleteBookingsMutation,
    useGetBookingsbyUserQuery,
    useGetDataQuery,
    useLazyGetBookingsbyUserQuery,
} from "../../services/registerApi";
import "./booking.css";

function Booking() {
    const user = useSelector((state) => state.Ruser.id);

    const { data: userbookings, isLoading: bookingsLoading } =
        useGetBookingsbyUserQuery(user);

    const { data: properties, isLoading: propertiesLoading } =
        useGetDataQuery();

    const [deletefn] = useDeleteBookingsMutation();
    const [updatefn] = useLazyGetBookingsbyUserQuery();

    async function deleteBookingfn(id) {
        await deletefn(id);
        updatefn(user);
    }

    if (bookingsLoading || propertiesLoading) {
        return <p className="bookings-message">Loading bookings...</p>;
    }

    const bookedProperties = (userbookings || []).map((booking) => {
        const propertyId =
            typeof booking.property === "object"
                ? booking.property?._id
                : booking.property;

        const property = (properties || []).find(
            (p) => p._id === propertyId
        );

        return {
            ...booking,
            propertyDetails: property
        };
    });

    return (
        <div className="bookings-page">

            <h1 className="bookings-title">Bookings</h1>

            {bookedProperties.length === 0 && (
                <p className="bookings-empty">No bookings found.</p>
            )}

            {bookedProperties.map((booking) => (
                <div key={booking._id} className="booking-card">

                    <div className="booking-image-wrapper">
                        <img
                            className="booking-image"
                            src={
                                booking.propertyDetails?.images?.[0]
                                    ? booking.propertyDetails.images[0]
                                    : '/default-property.jpg'
                            }
                            alt={booking.propertyDetails?.title || "Property"}
                        />
                    </div>

                    <p className="booking-property">
                        Property: {booking.propertyDetails?.title || "Property not found"}
                    </p>

                    <p className="booking-description">
                        Description: {booking.propertyDetails?.description}
                    </p>

                    <p className="booking-price">
                        Price: ₹{booking.propertyDetails?.price?.toLocaleString("en-IN")}
                    </p>

                    <p className="booking-status">
                        Status: {booking.status}
                    </p>

                    <button
                        className="booking-delete-button"
                        onClick={() => deleteBookingfn(booking._id)}
                    >
                        Remove Booking
                    </button>

                </div>
            ))}
        </div>
    );
}

export default Booking;
