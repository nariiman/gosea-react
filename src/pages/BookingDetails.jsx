import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBooking = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/bookings/${id}`);
  return data;
};

const BookingDetail = () => {
  const { id } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => fetchBooking(id),
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading booking details...</p>;
  if (error) return <p>❌ Error fetching booking.</p>;
  if (!booking) return <p>🚫 Booking not found.</p>;

  const {
    bookingDate,
    reservationDate,
    reservationTime,
    numberOfPeople,
    bookingPrice,
    bookingStatus,
    yacht,
    catering,
    bookingActivities,
    transportRequests,
  } = booking;

  return (
    <div className="booking-detail-container">
      <h2>Booking #{id}</h2>
      <p>
        <strong>Status:</strong> {bookingStatus}
      </p>
      <p>
        <strong>Booking Date:</strong> {new Date(bookingDate).toLocaleString()}
      </p>
      <p>
        <strong>Reservation:</strong>{" "}
        {new Date(reservationDate).toLocaleDateString()} at {reservationTime}
      </p>
      <p>
        <strong>Guests:</strong> {numberOfPeople}
      </p>
      <p>
        <strong>Total Price:</strong> EGP {parseFloat(bookingPrice).toFixed(2)}
      </p>

      {yacht && (
        <div className="section">
          <h3>🛥️ Yacht</h3>
          <p>
            <strong>Name:</strong> {yacht.name}
          </p>
          <p>
            <strong>Hourly:</strong> EGP {yacht.hourlyRate}
          </p>
          <p>
            <strong>Daily:</strong> EGP {yacht.dailyRate}
          </p>
        </div>
      )}

      {catering && (
        <div className="section">
          <h3>🍽️ Catering</h3>
          <p>
            <strong>Name:</strong> {catering.name}
          </p>
        </div>
      )}

      {bookingActivities?.length > 0 && (
        <div className="section">
          <h3>🎯 Activities</h3>
          <ul>
            {bookingActivities.map((a) => (
              <li key={a.id}>
                From {a.startTime} to {a.endTime}
              </li>
            ))}
          </ul>
        </div>
      )}

      {transportRequests?.length > 0 && (
        <div className="section">
          <h3>🚗 Transportation</h3>
          {transportRequests.map((tr) => (
            <div key={tr.id}>
              <p>
                <strong>Status:</strong> {tr.status}
              </p>
              <p>
                <strong>Company:</strong> {tr.company?.name || "Not Assigned"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingDetail;
