import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state)
    return <p>Missing booking info. Please go back and select a yacht.</p>;

  const {
    yachtName,
    mainImage,
    guestCapacity,
    beds,
    bookingType,
    hourlyDate,
    startDate,
    endDate,
    startTime,
    hours,
    guests,
    price,
    selectedActivities,
  } = state;

  return (
    <div className="checkout-wrapper">
      <h2>Checkout</h2>
      <img src={mainImage} alt={yachtName} className="checkout-img" />
      <p>
        <strong>Yacht:</strong> {yachtName}
      </p>
      <p>
        <strong>Guests:</strong> {guests}
      </p>
      <p>
        <strong>Beds:</strong> {beds}
      </p>
      <p>
        <strong>Booking Type:</strong> {bookingType}
      </p>
      {bookingType === "hourly" ? (
        <>
          <p>
            <strong>Date:</strong> {hourlyDate}
          </p>
          <p>
            <strong>Start Time:</strong> {startTime}
          </p>
          <p>
            <strong>Duration:</strong> {hours} hours
          </p>
        </>
      ) : (
        <>
          <p>
            <strong>From:</strong> {startDate}
          </p>
          <p>
            <strong>To:</strong> {endDate}
          </p>
        </>
      )}

      {selectedActivities?.length > 0 && (
        <>
          <p>
            <strong>Activities:</strong>
          </p>
          <ul>
            {selectedActivities.map((a, i) => (
              <li key={i}>
                {a.name} — EGP {a.price}
              </li>
            ))}
          </ul>
        </>
      )}

      <h3>Total: EGP {price}</h3>

      <button
        className="checkout-btn"
        onClick={() => navigate("/payment", { state })}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
