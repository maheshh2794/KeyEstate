import {
    useConfirmBookingMutation,
    useGetBookingsbySellerQuery,
    useGetDetailsQuery,
    useUpdateBookingStatusMutation,
    useGetDataQuery
} from "../../services/registerApi";

import { useSelector } from "react-redux";
import "./requests.css";

function Requests() {
    const user = useSelector((state) => state.Ruser.id);

    // Fetch seller bookings
    const {
        data: sellerbookings = [],
        refetch
    } = useGetBookingsbySellerQuery(user, {
        skip: !user
    });

    // Fetch all properties using getData API
    const {
        data: properties = [],
        isLoading: propertiesLoading
    } = useGetDataQuery();

    // Fetch user details
    const {
        data: details = {}
    } = useGetDetailsQuery();

    const users = details?.users || [];

    const [updateStatus] = useUpdateBookingStatusMutation();
    const [confirmBooking] = useConfirmBookingMutation();

    // Reject booking
    async function rejectBooking(id) {
        try {
            await updateStatus({
                id,
                status: "Cancelled"
            }).unwrap();

            refetch();
        } catch (error) {
            console.log("Reject booking error:", error);
        }
    }

    // Confirm booking
    async function confirmBookingfn(id) {
        try {
            await confirmBooking(id).unwrap();

            refetch();
        } catch (error) {
            console.log("Confirm booking error:", error);
        }
    }

    // Debug API responses
    console.log("Properties:", properties);
    console.log("Seller Bookings:", sellerbookings);

    return (
        <div className="requests-container">

            <h2>Booking Requests</h2>

            {propertiesLoading && (
                <p>Loading properties...</p>
            )}

            {!Array.isArray(sellerbookings) ||
            sellerbookings.length === 0 ? (

                <p className="no-requests">
                    No booking requests found.
                </p>

            ) : (

                <div className="requests-list">

                    {sellerbookings.map((booking) => {

                        // Get property ID from booking
                        const propertyId =
                            booking.property?._id ||
                            booking.property;

                        // Match booking property with getData properties
                        const property = Array.isArray(properties)
                            ? properties.find(
                                (item) =>
                                    String(item._id) === String(propertyId)
                            )
                            : null;

                        // Get buyer ID
                        const buyerId =
                            booking.user?._id ||
                            booking.user;

                        // Find buyer
                        const buyer = users.find(
                            (item) =>
                                String(item._id) === String(buyerId)
                        );

                        return (
                            <div
                                className="request-card"
                                key={booking._id}
                            >

                                {/* Property Image */}
                                <div className="request-image-wrapper">

                                    <img
                                        className="request-image"
                                        src={
                                            property?.images?.[0] ||
                                            "/default-property.jpg"
                                        }
                                        alt={property?.title || "Property"}
                                    />

                                </div>

                                {/* Property and Booking Details */}
                                <div className="request-details">

                                    <h3>
                                        {property?.title ||
                                            "Property details unavailable"}
                                    </h3>

                                    <p>
                                        <strong>Description:</strong>{" "}
                                        {property?.description ||
                                            "Not available"}
                                    </p>

                                    <p>
                                        <strong>Price:</strong>{" "}
                                        {property?.price != null
                                            ? `₹${property.price}`
                                            : "Not available"}
                                    </p>

                                    <p>
                                        <strong>Buyer Name:</strong>{" "}
                                        {buyer?.name ||
                                            booking.user?.name ||
                                            "Not available"}
                                    </p>

                                    <p>
                                        <strong>Buyer Email:</strong>{" "}
                                        {buyer?.email ||
                                            booking.user?.email ||
                                            "Not available"}
                                    </p>

                                    <p>
                                        <strong>Visit Date:</strong>{" "}
                                        {booking.visitDate
                                            ? new Date(
                                                booking.visitDate
                                            ).toLocaleDateString()
                                            : "Not available"}
                                    </p>

                                    <p>
                                        <strong>Visit Time:</strong>{" "}
                                        {booking.visitTime ||
                                            "Not available"}
                                    </p>

                                    <p>
                                        <strong>Message:</strong>{" "}
                                        {booking.message ||
                                            "No message"}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`request-status ${
                                                booking.status?.toLowerCase()
                                            }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </p>

                                    {/* Confirm and Reject */}
                                    {booking.status === "Pending" && (

                                        <div className="request-actions">

                                            <button
                                                className="confirm-btn"
                                                onClick={() =>
                                                    confirmBookingfn(
                                                        booking._id
                                                    )
                                                }
                                            >
                                                Confirm
                                            </button>

                                            <button
                                                className="reject-btn"
                                                onClick={() =>
                                                    rejectBooking(
                                                        booking._id
                                                    )
                                                }
                                            >
                                                Reject
                                            </button>

                                        </div>

                                    )}

                                </div>

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}

export default Requests;
