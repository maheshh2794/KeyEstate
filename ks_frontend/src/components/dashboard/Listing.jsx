
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
        data: sellerData = [],
        refetch
    } = useGetBookingsbySellerQuery(user);

    // Get all properties
    const {
        data: propertyData = [],
        isLoading: propertiesLoading,
        error: propertiesError
    } = useGetDataQuery();

    // Get user details
    const {
        data: details = {}
    } = useGetDetailsQuery();

    // Handle API response formats
    const sellerbookings = Array.isArray(sellerData)
        ? sellerData
        : sellerData?.bookings || [];

    const properties = Array.isArray(propertyData)
        ? propertyData
        : propertyData?.properties ||
          propertyData?.data ||
          [];

    const users = details?.users || [];

    const [updateStatus] = useUpdateBookingStatusMutation();
    const [confirmBooking] = useConfirmBookingMutation();

    // Debug API data
    console.log("Property API response:", propertyData);
    console.log("Properties array:", properties);
    console.log("Seller bookings:", sellerbookings);
    console.log("User details:", users);

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

            {propertiesLoading && (
                <p>Loading property details...</p>
            )}

            {propertiesError && (
                <p>Unable to load property details.</p>
            )}

            {sellerbookings.length === 0 ? (
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

                        // Match property using ID
                        const property = properties.find(
                            (item) =>
                                String(item._id) === String(propertyId)
                        );

                        // Get buyer ID
                        const buyerId =
                            booking.user?._id ||
                            booking.user;

                        // Find buyer details
                        const buyer = users.find(
                            (item) =>
                                String(item._id) === String(buyerId)
                        );

                        console.log("Booking property ID:", propertyId);
                        console.log("Matched property:", property);

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
                                        <strong>Visit Date:</strong>{" "}
                                        {booking.visitDate
                                            ? new Date(
                                                booking.visitDate
                                            ).toLocaleDateString()
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
                                        <span
                                            className={`request-status ${
                                                booking.status?.toLowerCase()
                                            }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </p>

                                    {/* Action Buttons */}
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
