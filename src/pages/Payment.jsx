import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ss.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, notes, totalPrice } = location.state || {};

  const [method, setMethod] = useState('cash');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const handleConfirm = () => {
    navigate('/confirmation', {
      state: {
        booking,
        notes,
        totalPrice,
        paymentMethod: method,
        card: method === 'credit' ? card : null
      }
    });
  };

  if (!booking) return <p>No booking info found.</p>;

  return (
    <div className="checkout-container">
      <h2>💳 Payment</h2>

      <h4>Select Payment Method</h4>
      <div className="payment-options">
        <button className={method === 'cash' ? 'active' : ''} onClick={() => setMethod('cash')}>Cash</button>
        <button className={method === 'credit' ? 'active' : ''} onClick={() => setMethod('credit')}>Credit Card</button>
      </div>

      {method === 'credit' && (
        <div className="credit-form">
          <input placeholder="Card Number" value={card.number} onChange={(e) => setCard({...card, number: e.target.value})} />
          <input placeholder="Name on Card" value={card.name} onChange={(e) => setCard({...card, name: e.target.value})} />
          <input placeholder="Expiry Date (MM/YY)" value={card.expiry} onChange={(e) => setCard({...card, expiry: e.target.value})} />
          <input placeholder="CVV" value={card.cvv} onChange={(e) => setCard({...card, cvv: e.target.value})} />
        </div>
      )}

      <p className="total-price"><strong>Total to Pay:</strong> EGP {totalPrice}</p>

      <button className="checkout-btn" onClick={handleConfirm}>Confirm Booking</button>
    </div>
  );
};

export default Payment;
