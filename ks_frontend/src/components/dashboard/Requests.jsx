
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

  const { data: details = [] } = useGetDetailsQuery();

  const users = details.users || [];

  console.log("User details:", details);
  console.log("Users array:", users);
  console.log("Seller bookings:", sellerbookings);

  const [updateStatus] = useUpdateBookingStatusMutation();

  async function rejectBooking(id) {
    await updateStatus({
      id: id,
      status: "Cancelled"
    });

    refetch();
  }

  const [confirmBooking] = useConfirmBookingMutation();

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
            const buyerId =
              booking.user?._id || booking.user;

            const buyer = users.find(
              (item) =>
                String(item._id) === String(buyerId)
            );

            return (
              <div className="request-card" key={booking._id}>
                <h3 className="request-property-title">
                  {booking.property?.title || "Property"}
                </h3>

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