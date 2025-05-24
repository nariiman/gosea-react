import React, { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/bookings/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div className="checkout-container">
      <h2>📋 My Bookings</h2>
      {bookings.map((b) => (
        <div key={b.id}>
          <p>
            <strong>Type:</strong> {b.yacht ? "Yacht" : "Activity"}
          </p>
          <p>
            <strong>Date:</strong> {b.reservationDate}
          </p>
          <p>
            <strong>Total:</strong> EGP {b.bookingPrice}
          </p>
          <p>
            <strong>Status:</strong> {b.bookingStatus}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
