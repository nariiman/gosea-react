import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ss.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { menus, notes } = location.state || {};

  const handleConfirm = () => {
    alert('Your catering order has been confirmed!');
    navigate('/');
  };

  if (!menus || menus.length === 0) {
    return (
      <div className="checkout-container">
        <h2>No catering menus selected</h2>
        <button onClick={() => navigate('/catering')} className="checkout-btn">Back to Catering</button>
      </div>
    );
  }

  // ✅ Calculate total price
  const totalPrice = menus.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="checkout-container">
      <h2>🧾 Catering Checkout</h2>
      <p>Please review your selected menus:</p>

      <div className="summary-box">
        <h4>✅ You selected:</h4>
        <ul>
          {menus.map((menu, idx) => (
            <li key={idx}>{menu.name} — EGP {menu.price}</li>
          ))}
        </ul>
        <p className="total-price"><strong>Total:</strong> EGP {totalPrice}</p>
      </div>

      {/* {menus.map((menu, idx) => (
        <div className="checkout-summary" key={idx}>
          <img src={menu.img} alt={menu.name} />
          <h3>{menu.name}</h3>
          <p><strong>Price:</strong> EGP {menu.price} per person</p>
          <p><strong>Includes:</strong> {menu.description}</p>
        </div>
      ))} */}

      {notes && (
        <div className="checkout-notes">
          <strong>Special Notes:</strong>
          <p>{notes}</p>
        </div>
      )}

      <button className="checkout-btn" onClick={handleConfirm}>Confirm Catering</button>
    </div>
  );
};

export default Checkout;
