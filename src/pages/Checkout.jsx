import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ss.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  const [notes, setNotes] = useState('');

  if (!booking) {
    return (
      <div className="checkout-container empty">
        <h2>No booking found</h2>
        <button className="checkout-btn" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const totalActivityPrice = booking.activities?.reduce((sum, a) => sum + parseFloat(a.price), 0) || 0;
  const yachtPrice = parseFloat(booking.yachtPrice || 0);
  const cateringPrice = parseFloat(booking.catering?.pricePerPerson || 0) * (booking.guests || 1);
  const totalPrice = yachtPrice + totalActivityPrice + cateringPrice;

  const handleProceed = () => {
    navigate('/payment', {
      state: {
        booking,
        notes,
        totalPrice
      }
    });
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h2>🧾 Confirm Your Booking</h2>

        {/* Yacht Info */}
        <div className="checkout-section">
          <h4>🛥️ Yacht</h4>
          <p><strong>{booking.yachtName}</strong></p>
          <p>{booking.date} at {booking.time}</p>
          <p>Guests: {booking.guests}</p>
          <p>Price: EGP {yachtPrice}</p>
        </div>

        {/* Activities */}
        {booking.activities?.length > 0 && (
          <div className="checkout-section">
            <h4>🎯 Selected Activities</h4>
            <ul className="checkout-list">
              {booking.activities.map((act, idx) => (
                <li key={idx}>
                  <span>{act.name}</span>
                  <span>EGP {act.price}</span>
                </li>
              ))}
            </ul>
            <p><strong>Activities Total:</strong> EGP {totalActivityPrice}</p>
          </div>
        )}

        {/* Catering */}
        {booking.catering && (
          <div className="checkout-section">
            <h4>🍽️ Catering</h4>
            <p>{booking.catering.name}</p>
            <p>EGP {booking.catering.pricePerPerson} × {booking.guests} guests = EGP {cateringPrice}</p>
          </div>
        )}

        {/* Notes */}
        <div className="checkout-section">
          <h4>📝 Notes</h4>
          <textarea
            rows="3"
            placeholder="Add any special requests..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Total */}
        <div className="checkout-section total">
          <h3>Total: EGP {totalPrice.toFixed(2)}</h3>
        </div>

        <div className="checkout-actions">
          <button className="checkout-btn" onClick={handleProceed}>Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
