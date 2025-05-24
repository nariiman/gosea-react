import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ss.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  const [notes, setNotes] = useState("");

  if (!booking) {
    return (
      <div className="checkout-container">
        <h2>No booking found</h2>
        <button className="checkout-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const totalPrice = booking.items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleProceed = () => {
    navigate("/payment", {
      state: {
        booking,
        notes,
        totalPrice,
      },
    });
  };

  return (
    <div className="checkout-container">
      <h2>🧾 Checkout</h2>

      <h4>Booking Summary</h4>
      <ul>
        {booking.items.map((item, idx) => (
          <li key={idx}>
            <strong>{item.name}</strong> — EGP {item.price} ×{" "}
            {item.quantity || 1} = EGP {item.price * (item.quantity || 1)}
          </li>
        ))}
      </ul>

      <p className="total-price">
        <strong>Total:</strong> EGP {totalPrice}
      </p>

      <h4>Special Notes</h4>
      <textarea
        rows="3"
        placeholder="Add any notes here"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button className="checkout-btn" onClick={handleProceed}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
