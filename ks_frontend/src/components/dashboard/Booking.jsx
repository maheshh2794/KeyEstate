
import { useGetBookingsQuery } from "../../services/registerApi";

function Booking() {
    const { data: bookings, isLoading, error } = useGetBookingsQuery();

    if (isLoading) {
        return <p>Loading bookings...</p>;
    }

    if (error) {
        return <p>Failed to load bookings.</p>;
    }

    return (
        <div>
            <h1>My Bookings</h1>

            {!bookings?.length && <p>You have no bookings yet.</p>}

            {bookings?.map((booking) => (
                <div key={booking._id}>
                    <h2>{booking.property?.title}</h2>

                    <p>
                        Location: {booking.property?.address?.city}
                    </p>

                    <p>
                        Visit Date:{" "}
                        {new Date(booking.visitDate).toLocaleDateString()}
                    </p>

                    <p>Visit Time: {booking.visitTime}</p>
                    <p>Status: {booking.status}</p>
                    <p>Message: {booking.message || "No message"}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Booking;