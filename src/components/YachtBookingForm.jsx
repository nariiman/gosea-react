import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import CateringModal from "./CateringModal";
import TransportationModal from "./TransportationModal";
import { useAuth } from "../hooks/useAuth";
import { useTransportation } from "../contexts/TransporationContext.jsx";
import { useCatering } from "../contexts/CateringContext.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";

const YachtBookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { transportationRequest } = useTransportation();
  const { cateringRequest } = useCatering();

  const {
    name = "Yacht",
    hourlyRate = 0,
    dailyRate = 0,
    startTimes = [],
    destinationId = null,
    mainImage = "/assets/Shorely.png",
    guestCapacity = state?.guestCapacity,
    beds = state?.beds,
    mainDescription = "",
    gallery = [
      "/assets/yachtgal.png",
      "/assets/yachtgall.png",
      "/assets/yachtgaller.png",
      "/assets/yachtgallery.png",
    ],
    id,
  } = state || {};

  const [bookingType, setBookingType] = useState("hourly");
  const [hourlyDate, setHourlyDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [hours, setHours] = useState("");
  const [guests, setGuests] = useState("");
  const [price, setPrice] = useState(null);
  const [dateError, setDateError] = useState("");
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
    if (activeImgIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeImgIndex]);

  useEffect(() => {
    setDateError("");
    const guestCount = parseInt(guests);
    let yachtPrice = 0;

    if (
      bookingType === "overnight" &&
      startDate &&
      endDate &&
      new Date(endDate) < new Date(startDate)
    ) {
      setDateError("🚫 End date cannot be before start date.");
      setPrice(null);
      return;
    }

    if (bookingType === "hourly" && hours && guestCount > 0) {
      yachtPrice = parseInt(hours) * hourlyRate * guestCount;
    } else if (
      bookingType === "overnight" &&
      startDate &&
      endDate &&
      guestCount > 0
    ) {
      const diffDays = Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      );
      yachtPrice = diffDays * dailyRate * guestCount;
    }

    const cateringTotal = cateringRequest?.total || 0;
    setPrice(yachtPrice + cateringTotal);
  }, [bookingType, hours, startDate, endDate, guests, cateringRequest]);

  const handleBooking = async () => {
    if (!user?.uid) return alert("Please sign in first");

    const payload = {
      bookingType,
      bookingDate: new Date().toISOString(),
      reservationDate: bookingType === "hourly" ? hourlyDate : startDate,
      reservationTime: startTime || "00:00",
      numberOfPeople: parseInt(guests),
      bookingPrice: price.toFixed(2),
      userUid: user.uid,
      yachtId: id,
      catering: cateringRequest
        ? {
            menus: cateringRequest.menus.map((m) => m.id),
            notes: cateringRequest.notes,
            total: cateringRequest.total,
          }
        : undefined,
      transportationRequest: transportationRequest || undefined,
    };

    try {
      const res = await fetch("http://localhost:3000/bookings/yacht", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      navigate("/checkout", {
        state: {
          bookingId: data.bookingId,
          type: "yacht",
          name,
          price,
          bookingType,
          guests: parseInt(guests),
          startDate: bookingType === "hourly" ? hourlyDate : startDate,
          endDate: bookingType === "overnight" ? endDate : null,
          startTime,
          catering: cateringRequest,
          transportation: transportationRequest,
          image: mainImage,
        },
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking-container">
      <div className="activities-hero">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/assets/yachthero.mp4" type="video/mp4" />
        </video>
        <div className="overlay">
          <h1>{name}</h1>
        </div>
      </div>

      <div className="booking-breadcrumbs-wrapper">
        <Breadcrumbs />
      </div>

      <div className="booking-gallery">
        {gallery.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Gallery ${idx + 1}`}
            onClick={() => setActiveImgIndex(idx)}
            className="gallery-thumb"
          />
        ))}
      </div>

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
            <img src={gallery[activeImgIndex]} alt="Preview" />
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

      <section className="bubbles" style={{ marginBottom: "0" }}>
        <div className="bubble-tag">
          💵 Hourly: EGP {parseInt(hourlyRate).toLocaleString()}
        </div>
        <div className="bubble-tag">🛏️ Beds: {beds}</div>
        <div className="bubble-tag">🧍 Guests: {guestCapacity}</div>
        <div className="bubble-tag">
          📅 Daily: EGP {parseInt(dailyRate).toLocaleString()}
        </div>
      </section>

      <p
        style={{
          textAlign: "center",
          maxWidth: "800px",
          margin: "16px auto 24px",
          color: "#444",
          fontSize: "16px",
          lineHeight: 1.6,
        }}
      >
        {mainDescription}
      </p>

      <div className="booking-content">
        <div className="booking-form">
          <label>Booking Type</label>
          <select
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
          >
            <option value="hourly">Hourly</option>
            <option value="overnight">Overnight</option>
          </select>

          {bookingType === "hourly" && (
            <>
              <label>Date</label>
              <input
                type="date"
                value={hourlyDate}
                onChange={(e) => setHourlyDate(e.target.value)}
              />
              <label>Start Time</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                <option value="">Select Start Time</option>
                {startTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <label>Hours</label>
              <select value={hours} onChange={(e) => setHours(e.target.value)}>
                <option value="">Select</option>
                {[2, 4, 6, 8].map((h) => (
                  <option key={h} value={h}>
                    {h} hours
                  </option>
                ))}
              </select>
            </>
          )}

          {bookingType === "overnight" && (
            <>
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {dateError && <p className="error-message">{dateError}</p>}
            </>
          )}

          <label>Guests</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min={1}
            max={50}
            placeholder="Number of guests"
          />

          <TransportationModal />
          <CateringModal
            destinationId={destinationId}
            guests={parseInt(guests || 1)}
          />

          {price !== null && (
            <p className="price-display">
              Estimated Price:{" "}
              <strong>EGP {parseInt(price).toLocaleString()}</strong>
            </p>
          )}

          <button className="btn btn-primary" onClick={handleBooking}>
            Book Now
          </button>
        </div>
      </div>

      <section className="booking-extras-card">
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
            All guests must follow provided safety instructions. Participation
            under the influence of alcohol or drugs is strictly prohibited.
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
            A: Yes, all necessary safety and navigation gear is included in the
            price.
          </p>
        </details>
      </section>
    </div>
  );
};

export default YachtBookingForm;
