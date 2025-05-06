import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ss.css';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, notes, totalPrice, paymentMethod, card } = location.state || {};

  return (
    <div className="checkout-container">
      <h2>✅ Booking Confirmed</h2>
      <p>Thank you for your booking! Here are your details:</p>

      <h4>Booking Summary:</h4>
      <ul>
        {booking.items.map((item, idx) => (
          <li key={idx}>
            <strong>{item.name}</strong> — EGP {item.price} × {item.quantity || 1} = EGP {item.price * (item.quantity || 1)}
          </li>
        ))}
      </ul>

      <p><strong>Total Paid:</strong> EGP {totalPrice}</p>
      <p><strong>Payment Method:</strong> {paymentMethod === 'cash' ? 'Cash' : 'Credit Card'}</p>

      {paymentMethod === 'credit' && card && (
        <p><strong>Card:</strong> Ending with {card.number.slice(-4)}</p>
      )}

      {notes && (
        <>
          <h4>Special Notes:</h4>
          <p>{notes}</p>
        </>
      )}

      <button className="checkout-btn" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Confirmation;
