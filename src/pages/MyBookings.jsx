import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const fetchBookings = async (uid) => {
  const { data } = await axios.get(
    `http://localhost:3000/bookings/user/${uid}`
  );
  return data;
};

const MyBookings = () => {
  const { user } = useAuth();
  const uid = user?.uid;
  const navigate = useNavigate();

  const {
    data: bookings,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookings", uid],
    queryFn: () => fetchBookings(uid),
    enabled: !!uid,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (uid) refetch();
  }, [uid]);

  if (!uid) return <p>🚫 Please sign in to view your bookings.</p>;
  if (isLoading) return <p>Loading your bookings...</p>;
  if (error) return <p>❌ Error fetching bookings.</p>;
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div className="my-bookings-container">
      <h2>Your Bookings</h2>
      <div className="booking-cards-grid">
        {bookings.map((b) => (
          <div
            className="booking-card"
            key={b.id}
            role="button"
            onClick={() => navigate(`/bookings/${b.id}`)}
          >
            <h3>Booking #{b.id}</h3>
            <p>
              <strong>Reservation:</strong>{" "}
              {new Date(b.reservationDate).toLocaleDateString()} at{" "}
              {b.reservationTime}
            </p>
            <p>
              <strong>Guests:</strong> {b.numberOfPeople}
            </p>
            <p>
              <strong>Total Price:</strong> EGP{" "}
              {parseFloat(b.bookingPrice).toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`status-label ${b.bookingStatus}`}>
                {b.bookingStatus}
              </span>
            </p>

            {b.bookingActivities?.length > 0 && (
              <p>
                <strong>Activities:</strong> {b.bookingActivities.length}
              </p>
            )}

            {b.transportRequests?.length > 0 && (
              <p className="transport-info">
                <strong>Transport:</strong>{" "}
                {b.transportRequests[0]?.company?.name || "Requested"}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
