import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import CateringModal from "./CateringModal";
import TransportationModal from "./TransportationModal";
import { useAuth } from "../hooks/useAuth";
import { useTransportation } from "../contexts/TransporationContext.jsx";
import { useCatering } from "../contexts/CateringContext.jsx";

const YachtBookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { transportationRequest } = useTransportation();
  const { cateringRequest } = useCatering();

  const {
    name = "",
    hourlyRate = 0,
    dailyRate = 0,
    startTimes = [],
    destinationId = null,
    mainImage = "/assets/Shorely.png",
    guestCapacity = state?.guestCapacity,
    beds = state?.beds,
    mainDescription = "",
    gallery = [
      "/assets/kay.jpg",
      "/assets/kaya.jpg",
      "/assets/kayaking.jpg",
      "/assets/Kayaking.png",
      "/assets/JetSki.png",
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
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [activitiesError, setActivitiesError] = useState("");
  const [activeImgIndex, setActiveImgIndex] = useState(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (activeImgIndex !== null) {
        if (e.key === "ArrowRight") {
          setActiveImgIndex((prev) => (prev + 1) % gallery.length);
        } else if (e.key === "ArrowLeft") {
          setActiveImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
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
    if (destinationId) {
      setLoadingActivities(true);
      fetch(`http://localhost:3000/activities?destinationId=${destinationId}`)
        .then((res) => res.json())
        .then((data) => {
          setActivities(data.map((a) => ({ ...a, pricePerHour: Number(a.pricePerHour) })));
        })
        .catch(() => setActivitiesError("Failed to fetch activities."))
        .finally(() => setLoadingActivities(false));
    }
  }, [destinationId]);

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

    const activitiesTotal = selectedActivities.reduce((acc, act) => acc + act.price, 0);
    const cateringTotal = cateringRequest?.total || 0;
    setPrice(yachtPrice + activitiesTotal + cateringTotal);
  }, [bookingType, hours, startDate, endDate, guests, selectedActivities, cateringRequest]);

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
      activities: selectedActivities.map((a) => a.id),
      transportationRequest: transportationRequest || undefined,
      catering: cateringRequest
        ? {
            menus: cateringRequest.menus.map((m) => m.id),
            notes: cateringRequest.notes,
            total: cateringRequest.total,
          }
        : undefined,
    };

    try {
      const res = await fetch("http://localhost:3000/bookings/yacht", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("✅ Booking successful!");
      navigate("/confirmation", { state: { bookingId: data.bookingId } });
    } catch (err) {
      alert(err.message);
    }
  };

  const activityOptions = activities.map((a) => ({
    value: a.id,
    label: `${a.name} (EGP ${a.pricePerHour})`,
    id: a.id,
    name: a.name,
    price: a.pricePerHour,
  }));

  return (
    <div className="booking-container">
      {/* Hero */}
      <div className="booking-header">
        <img src={mainImage} alt={name} className="booking-header-img" />
        <div className="booking-header-overlay">
          <h1>{name}</h1>
        </div>
      </div>

      {/* Gallery */}
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

      {/* Lightbox */}
      {activeImgIndex !== null && (
        <div className="lightbox-overlay" onClick={() => setActiveImgIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setActiveImgIndex(null)}>×</button>
            <img src={gallery[activeImgIndex]} alt="Preview" />
            <button
              className="lightbox-prev"
              onClick={() =>
                setActiveImgIndex((activeImgIndex - 1 + gallery.length) % gallery.length)
              }
            >⟨</button>
            <button
              className="lightbox-next"
              onClick={() =>
                setActiveImgIndex((activeImgIndex + 1) % gallery.length)
              }
            >⟩</button>
          </div>
        </div>
      )}

      {/* Details Bubbles */}
      <section className="bubbles" style={{ marginBottom: "0" }}>
        <div className="bubble-tag">💵 Hourly: EGP {hourlyRate}</div>
        <div className="bubble-tag">🛏️ Beds: {beds}</div>
        <div className="bubble-tag">🧍 Guests: {guestCapacity}</div>
        <div className="bubble-tag">📅 Daily: EGP {dailyRate}</div>
      </section>
      <p style={{ textAlign: "center", maxWidth: "800px", margin: "16px auto 24px", color: "#444", fontSize: "16px" }}>{mainDescription}</p>

      {/* Booking Form */}
      <div className="booking-content">
        <div className="booking-form">
          <label>Booking Type</label>
          <select value={bookingType} onChange={(e) => setBookingType(e.target.value)}>
            <option value="hourly">Hourly</option>
            <option value="overnight">Overnight Trip</option>
          </select>

          {bookingType === "hourly" && (
            <>
              <label>Booking Date</label>
              <input type="date" value={hourlyDate} onChange={(e) => setHourlyDate(e.target.value)} />
              <label>Start Time</label>
              <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
                <option value="">Select Start Time</option>
                {startTimes.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
              <label>Hours</label>
              <select value={hours} onChange={(e) => setHours(e.target.value)}>
                <option value="">Select</option>
                {[2, 4, 6, 8].map((h) => (
                  <option key={h} value={h}>{h} hours</option>
                ))}
              </select>
            </>
          )}

          {bookingType === "overnight" && (
            <>
              <label>Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label>End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              {dateError && <p className="error-message">{dateError}</p>}
            </>
          )}

          <label>Guests</label>
          <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} min={1} max={50} placeholder="Number of guests" />

          <label>Activities</label>
          {loadingActivities ? (
            <p>Loading...</p>
          ) : activitiesError ? (
            <p className="error-message">{activitiesError}</p>
          ) : (
            <Select isMulti options={activityOptions} value={selectedActivities} onChange={(options) => setSelectedActivities(options || [])} />
          )}

          <TransportationModal />
          <CateringModal destinationId={destinationId} guests={parseInt(guests || 1)} />

          {price !== null && price > 0 && (
            <div className="activity-receipt">
              <h4>Summary</h4>
              {selectedActivities.length > 0 && (
                <>
                  <ul>
                    {selectedActivities.map((a, i) => (
                      <li key={i}>{a.name} — EGP {a.price}</li>
                    ))}
                  </ul>
                  <p><strong>Activities Total:</strong> EGP {selectedActivities.reduce((acc, act) => acc + act.price, 0)}</p>
                </>
              )}
              {cateringRequest && (
                <>
                  <ul>
                    {cateringRequest.menus.map((m, i) => (
                      <li key={i}>{m.name} — EGP {m.pricePerPerson} × {guests}</li>
                    ))}
                  </ul>
                  <p><strong>Catering Total:</strong> EGP {cateringRequest.total}</p>
                </>
              )}
              <p className="price-display"><strong>Total Estimate:</strong> EGP {price}</p>
            </div>
          )}

          <button className="btn btn-primary" disabled={!price || price <= 0} onClick={handleBooking}>Reserve Yacht</button>
        </div>
      </div>
    </div>
  );
};

export default YachtBookingForm;
