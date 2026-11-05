
import {
  useConfirmBookingMutation,
  useGetBookingsbySellerQuery,
  useGetDetailsQuery,
  useUpdateBookingStatusMutation
} from "../../services/registerApi";
import { useSelector } from "react-redux";
import "./requests.css";

function Requests() {
  const user = useSelector((state) => state.Ruser.id);

  const { data: sellerbookings = [], refetch } =
    useGetBookingsbySellerQuery(user);

  const { data: details = {} } = useGetDetailsQuery();

  const users = details.users || [];

  const [updateStatus] = useUpdateBookingStatusMutation();
  const [confirmBooking] = useConfirmBookingMutation();

  async function rejectBooking(id) {
    await updateStatus({
      id: id,
      status: "Cancelled"
    });

    refetch();
  }

  async function confirmBookingfn(id) {
    await confirmBooking(id);
    refetch();
  }

  return (
    <div className="requests-page">

      <h1 className="requests-title">Requests</h1>

      {sellerbookings.length === 0 ? (
        <p className="no-requests">No booking requests found.</p>
      ) : (

        <div className="requests-list">

          {sellerbookings.map((booking) => {

            const buyerId = booking.user?._id || booking.user;

            const buyer = users.find(
              (item) => String(item._id) === String(buyerId)
            );

            const property =
              typeof booking.property === "object"
                ? booking.property
                : null;

            return (
              <div className="request-card" key={booking._id}>

                {/* Property Image */}
                <div className="request-image-wrapper">
                  <img
                    className="request-image"
                    src={
                      property?.images?.[0]
                        ? property.images[0]
                        : '/default-property.jpg'
                    }
                    alt={property?.title || "Property"}
                  />
                </div>

                {/* Property Details */}
                <div className="request-property-info">

                  <h3 className="request-property-title">
                    {property?.title || "Property"}
                  </h3>

                  <p className="request-property-description">
                    {property?.description || "No description available"}
                  </p>

                  <p className="request-property-price">
                    Price: ₹{property?.price?.toLocaleString('en-IN') || "Not available"}
                  </p>

                </div>

                {/* Buyer Details */}
                <div className="request-details">

                  <p className="request-detail">
                    <strong>Buyer:</strong>{" "}
                    {buyer?.name || booking.user?.name || "Unknown"}
                  </p>

                  <p className="request-detail">
                    <strong>Email:</strong>{" "}
                    {buyer?.email || booking.user?.email || "Not available"}
                  </p>

                  <p className="request-detail">
                    <strong>Status:</strong>{" "}
                    <span className="request-status">
                      {booking.status || "Pending"}
                    </span>
                  </p>

                </div>

                {/* Booking Actions */}
                <div className="request-actions">

                  <button
                    className="request-btn reject-btn"
                    onClick={() => rejectBooking(booking._id)}
                  >
                    Reject
                  </button>

                  <button
                    className="request-btn confirm-btn"
                    onClick={() => confirmBookingfn(booking._id)}
                  >
                    Confirm
                  </button>

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
