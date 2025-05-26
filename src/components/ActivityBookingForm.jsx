import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTransportation } from "../contexts/TransporationContext.jsx";
import TransportationModal from "./TransportationModal";

const ActivityBookingForm = () => {
  const { state } = useLocation();
  const { user } = useAuth();
  const { transportationRequest } = useTransportation();

  const {
    name = "Activity",
    basePrice = 0,
    durationUnit = 15,
    durations = [],
    timeSlots = {},
    mainImage = "/assets/Shorely.png",
    gallery = [
      "/assets/kay.jpg",
      "/assets/kaya.jpg",
      "/assets/kayaking.jpg",
      "/assets/Kayaking.png",
      "/assets/JetSki.png",
    ],
    id: activityId,
  } = state || {};

  const [preferredTime, setPreferredTime] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [riders, setRiders] = useState("");
  const [price, setPrice] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (activeImgIndex !== null) {
        if (e.key === "ArrowRight") {
          setActiveImgIndex((prev) => (prev + 1) % gallery.length);
        } else if (e.key === "ArrowLeft") {
          setActiveImgIndex(
            (prev) => (prev - 1 + gallery.length) % gallery.length
          );
        } else if (e.key === "Escape") {
          setActiveImgIndex(null);
        }
      }
    },
    [activeImgIndex, gallery.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const validDuration = parseInt(duration);
    const validRiders = riders === "6+" ? 6 : parseInt(riders);

    if (!isNaN(validDuration) && !isNaN(validRiders)) {
      const durationCost = (validDuration / durationUnit) * basePrice;
      setPrice(durationCost * validRiders);
    } else {
      setPrice(null);
    }
  }, [duration, riders]);

  const handleBooking = async () => {
    if (!user?.uid) return alert("Please sign in first");

    const payload = {
      userId: user.uid,
      date,
      preferredTime,
      timeSlot: selectedTime,
      duration: parseInt(duration),
      riders: riders === "6+" ? 6 : parseInt(riders),
      price,
      activityId,
      transportationRequest,
    };

    try {
      const res = await fetch("http://localhost:3000/bookings/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("✅ Booking successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking-wrapper">
      <header className="booking-header">
        <img src={mainImage} alt={name} className="booking-header-img" />
        <div className="booking-header-overlay">
          <h1>{name}</h1>
        </div>
      </header>

      <section className="booking-gallery">
        {gallery.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Gallery ${idx + 1}`}
            onClick={() => setActiveImgIndex(idx)}
            className="gallery-thumb"
          />
        ))}
      </section>

      {activeImgIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={() => setActiveImgIndex(null)}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setActiveImgIndex(null)}
            >
              ×
            </button>
            <img src={gallery[activeImgIndex]} alt="Large View" />
            <button
              className="lightbox-prev"
              onClick={() =>
                setActiveImgIndex(
                  (activeImgIndex - 1 + gallery.length) % gallery.length
                )
              }
            >
              ⟨
            </button>
            <button
              className="lightbox-next"
              onClick={() =>
                setActiveImgIndex((activeImgIndex + 1) % gallery.length)
              }
            >
              ⟩
            </button>
          </div>
        </div>
      )}

      <section className="booking-section-intro">
        <div className="booking-callout">
          <h2>Ready for your adventure?</h2>
          <p>Secure your spot and customize your ride today.</p>
          <button
            className="primary-book-btn"
            onClick={() => setFormOpen(!formOpen)}
          >
            {formOpen ? "Hide Booking Form" : "Start Booking →"}
          </button>
        </div>
      </section>

      {formOpen && (
        <div className="booking-content">
          <div className="booking-form">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>Preferred Time</label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
            >
              <option value="">Select Preferred Time</option>
              {Object.keys(timeSlots).map((slot) => (
                <option key={slot} value={slot}>
                  {slot.charAt(0).toUpperCase() + slot.slice(1)}
                </option>
              ))}
            </select>

            {preferredTime && timeSlots[preferredTime] && (
              <>
                <label>Time Slot</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Choose Time Slot</option>
                  {timeSlots[preferredTime].map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </>
            )}

            <label>Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="">Select Duration</option>
              {durations.map((d) => (
                <option key={d} value={d}>
                  {d} mins
                </option>
              ))}
            </select>

            <label>Number of Riders</label>
            <select value={riders} onChange={(e) => setRiders(e.target.value)}>
              <option value="">Number of Riders</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
              <option value="6+">6+</option>
            </select>

            {price !== null && (
              <p className="price-display">
                Estimated Price: <strong>EGP {price}</strong>
              </p>
            )}

            <TransportationModal />
            <button className="checkout-btn" onClick={handleBooking}>
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* FAQs & Policies */}
      <div className="booking-extras-card">
        <details>
          <summary>📄 Cancellation Policy</summary>
          <p>
            Cancellations up to 24 hours before the activity will be fully
            refunded. No refunds for same-day cancellations.
          </p>
        </details>
        <details>
          <summary>🦺 Safety & Regulations</summary>
          <p>
            All riders must wear life jackets provided. Participation under the
            influence of alcohol or drugs is strictly prohibited.
          </p>
        </details>
        <details>
          <summary>❓ FAQs</summary>
          <p>
            <strong>Q: Can children participate?</strong>
            <br />
            A: Yes, children above 10 years old can join with adult supervision.
          </p>
          <p>
            <strong>Q: Is equipment provided?</strong>
            <br />
            A: Yes, all necessary safety and riding gear is included in the
            price.
          </p>
        </details>
      </div>
    </div>
  );
};

export default ActivityBookingForm;
