
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

    // Get seller bookings
    const {
        data: sellerbookings = [],
        refetch
    } = useGetBookingsbySellerQuery(user);

    // Get all properties
    const {
        data: properties = []
    } = useGetDataQuery();

    // Get user details
    const {
        data: details = {}
    } = useGetDetailsQuery();

    const users = details.users || [];

    const [updateStatus] = useUpdateBookingStatusMutation();
    const [confirmBooking] = useConfirmBookingMutation();

    // Reject booking
    async function rejectBooking(id) {
        await updateStatus({
            id,
            status: "Cancelled"
        });

        refetch();
    }

    // Confirm booking
    async function confirmBookingfn(id) {
        await confirmBooking(id);
        refetch();
    }

    return (
        <div className="requests-container">

            <h2>Booking Requests</h2>

            {sellerbookings.length === 0 ? (
                <p className="no-requests">
                    No booking requests found.
                </p>
            ) : (

                <div className="requests-list">

                    {sellerbookings.map((booking) => {

                        // Get property ID from booking
                        const propertyId =
                            booking.property?._id || booking.property;

                        // Find matching property
                        const property = properties.find(
                            (item) => item._id === propertyId
                        );

                        // Get buyer ID
                        const buyerId =
                            booking.user?._id || booking.user;

                        // Find buyer details
                        const buyer = users.find(
                            (item) => item._id === buyerId
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

                                {/* Request Details */}
                                <div className="request-details">

                                    <h3>
                                        {property?.title || "Property details unavailable"}
                                    </h3>

                                    <p>
                                        <strong>Description:</strong>{" "}
                                        {property?.description || "Not available"}
                                    </p>

                                    <p>
                                        <strong>Price:</strong>{" "}
                                        {property?.price
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
                                            ? new Date(booking.visitDate).toLocaleDateString()
                                            : "Not available"}
                                    </p>

                                    <p>
                                        <strong>Visit Time:</strong>{" "}
                                        {booking.visitTime || "Not available"}
                                    </p>

                                    <p>
                                        <strong>Message:</strong>{" "}
                                        {booking.message || "No message"}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>{" "}
                                        <span className={`request-status ${booking.status?.toLowerCase()}`}>
                                            {booking.status}
                                        </span>
                                    </p>

                                    {/* Action Buttons */}
                                    {booking.status === "Pending" && (
                                        <div className="request-actions">

                                            <button
                                                className="confirm-btn"
                                                onClick={() =>
                                                    confirmBookingfn(booking._id)
                                                }
                                            >
                                                Confirm
                                            </button>

                                            <button
                                                className="reject-btn"
                                                onClick={() =>
                                                    rejectBooking(booking._id)
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
