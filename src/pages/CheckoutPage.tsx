import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [processing, setProcessing] = useState(false);
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const handleInputChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleInputFocus = (e) => {
    setCard({ ...card, focus: e.target.name });
  };

  const handlePayment = () => {
    if (!card.number || !card.name || !card.expiry || !card.cvc) {
      alert("Please fill out all card details.");
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      navigate("/confirmation", {
        state: {
          ...state,
          cardDetails: {
            number: card.number,
            name: card.name,
            expiry: card.expiry,
            cvc: card.cvc,
          },
        },
      });
    }, 3000);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout Summary</h2>

      <ul className="checkout-items">
        {state?.items?.map((item, idx) => (
          <li className="checkout-item" key={idx}>
            <span>{item.label || item.name}</span>
            <span>EGP {item.price}</span>
          </li>
        ))}
      </ul>

      <div className="total-price">
        <span>Total:</span>
        <span>EGP {parseInt(state?.price).toLocaleString()}</span>
      </div>

      <div className="payment-section">
        <div className="payment-card-preview">
          <Cards
            number={card.number}
            name={card.name}
            expiry={card.expiry}
            cvc={card.cvc}
            focused={card.focus}
          />
        </div>

        <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            value={card.number}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
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
            maxLength={30}
            required
          />

          <input
            type="tel"
            name="expiry"
            placeholder="MMYY"
            value={card.expiry}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
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
              const val = e.target.value.replace(/\D/g, "");
              if (val.length <= 4) setCard({ ...card, cvc: val });
            }}
            onFocus={handleInputFocus}
            maxLength={4}
            required
          />

          <button
            className="checkout-btn"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? "Processing..." : "Confirm & Pay"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
