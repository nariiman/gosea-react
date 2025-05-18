import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleInputFocus = (e) => {
    setCard({ ...card, focus: e.target.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const bookingPayload = {
        ...state,
        cardDetails: {
          number: card.number,
          name: card.name,
          expiry: card.expiry,
          cvc: card.cvc,
        }
      };

      const res = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) throw new Error('Failed to confirm booking.');

      navigate('/confirmation');
    } catch (err) {
      alert(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card-preview">
        <Cards
          number={card.number}
          name={card.name}
          expiry={card.expiry}
          cvc={card.cvc}
          focused={card.focus}
        />
      </div>
  
      <form className="payment-form" onSubmit={handleSubmit}>
      <input
  type="tel"
  name="number"
  placeholder="Card Number"
  value={card.number}
  onChange={(e) => {
    const val = e.target.value.replace(/\D/g, ''); // Only digits
    if (val.length <= 16) setCard({ ...card, number: val });
  }}
  onFocus={handleInputFocus}
  maxLength={16}
  required
/>

<input
  type="text"
  name="name"
  placeholder="Cardholder Name"
  value={card.name}
  onChange={handleInputChange}
  onFocus={handleInputFocus}
  maxLength={15}
  required
/>

<input
  type="tel"
  name="expiry"
  placeholder="MMYY"
  value={card.expiry}
  onChange={(e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 4) setCard({ ...card, expiry: val });
  }}
  onFocus={handleInputFocus}
  maxLength={4}
  required
/>

<input
  type="tel"
  name="cvc"
  placeholder="CVC"
  value={card.cvc}
  onChange={(e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 4) setCard({ ...card, cvc: val });
  }}
  onFocus={handleInputFocus}
  maxLength={4}
  required
/>

  
        <button type="submit" className="checkout-btn" disabled={submitting}>
          {submitting ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}  

export default Payment;
