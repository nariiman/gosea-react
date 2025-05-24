import React from "react";
import "../styles/ss.css";

function Services() {
  return (
    <div className="page-container">
      <h1 className="page-title">Our Services</h1>
      <p className="page-subtitle">
        Unforgettable seaside experiences tailored for you.
      </p>

      <div className="service-list">
        <div className="service-item">
          <h3>Luxury Yacht Charters</h3>
          <p>
            Choose from a fleet of modern yachts equipped with premium
            amenities. Perfect for private parties, corporate events, or a
            relaxing day on the water.
          </p>
        </div>

        <div className="service-item">
          <h3>Exciting Water Activities</h3>
          <p>
            Enjoy jet skiing, kayaking, paddleboarding, snorkeling, and more. We
            offer guided experiences to ensure fun and safety.
          </p>
        </div>

        <div className="service-item">
          <h3>Exclusive Catering</h3>
          <p>
            Partnering with top-tier chefs and caterers, we provide gourmet
            cuisine tailored to your taste, served on board or by the seaside.
          </p>
        </div>

        <div className="service-item">
          <h3>Transportation</h3>
          <p>
            Seamless pickup and drop-off services to and from our marina and
            activity locations for a stress-free journey.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
