
import {
    useConfirmBookingMutation,
    useGetBookingsbySellerQuery,
    useLazyGetBookingsbySellerQuery,
    useGetDetailsQuery,
    useUpdateBookingStatusMutation,
    useGetDataQuery
} from "../../services/registerApi";

import { useSelector } from "react-redux";
import "./requests.css";

function Requests() {
    const user = useSelector((state) => state.Ruser.id);

    const {
        data: sellerbookings = []
    } = useGetBookingsbySellerQuery(user, {
        skip: !user
    });

    const {
        data: properties = [],
        isLoading: propertiesLoading
    } = useGetDataQuery();

    const {
        data: details = {}
    } = useGetDetailsQuery();

    const users = details?.users || [];

    const [updateStatus] = useUpdateBookingStatusMutation();
    const [confirmBooking] = useConfirmBookingMutation();

    // Lazy query for manually fetching seller bookings
    const [getSellerBookings] =
        useLazyGetBookingsbySellerQuery();

    // Reject booking
    async function rejectBooking(id) {
        try {
            await updateStatus({
                id,
                status: "Cancelled"
            }).unwrap();

            await getSellerBookings(user).unwrap();

        } catch (error) {
            console.log("Reject booking error:", error);
        }
    }

    // Confirm booking
    async function confirmBookingfn(id) {
        try {
            await confirmBooking(id).unwrap();

            await getSellerBookings(user).unwrap();

        } catch (error) {
            console.log("Confirm booking error:", error);
        }
    }

    return (
        <div className="requests-container">

            <h2>Booking Requests</h2>

            {propertiesLoading && (
                <p>Loading properties...</p>
            )}

            {sellerbookings.length === 0 ? (

                <p className="no-requests">
                    No booking requests found.
                </p>

            ) : (

                <div className="requests-list">

                    {sellerbookings.map((booking) => {

                        const propertyId =
                            booking.property?._id ||
                            booking.property;

                        const property = properties.find(
                            (item) =>
                                String(item._id) === String(propertyId)
                        );

                        const buyerId =
                            booking.user?._id ||
                            booking.user;

                        const buyer = users.find(
                            (item) =>
                                String(item._id) === String(buyerId)
                        );

                        return (
                            <div
                                className="request-card"
                                key={booking._id}
                            >

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

                                <div className="request-details">

                                    <h3>
                                        {property?.title ||
                                            "Property details unavailable"}
                                    </h3>

                                    <p>
                                        <strong>Description:</strong>{" "}
                                        {property?.description || "Not available"}
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
                                        <strong>Buyer Number:</strong>{" "}
                                        {buyer?.number ||
                                            booking.user?.number ||
                                            "Not available"}
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
