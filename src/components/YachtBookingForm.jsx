import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import CateringBtn from "./CateringBtn";
import TransportationModal from "./TransportationModal";
import { useAuth } from "../hooks/useAuth";
import { useTransportation } from "../contexts/TransporationContext.jsx";

const YachtBookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { transportationRequest } = useTransportation();

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
    const fetchActivities = async () => {
      setLoadingActivities(true);
      try {
        const res = await fetch(
          `http://localhost:3000/activities?destinationId=${destinationId}`
        );
        const data = await res.json();
        const formatted = data.map((a) => ({
          ...a,
          pricePerHour: Number(a.pricePerHour),
        }));
        setActivities(formatted);
      } catch {
        setActivitiesError("Failed to fetch activities.");
      } finally {
        setLoadingActivities(false);
      }
    };

    if (destinationId) fetchActivities();
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

    const activitiesTotal = selectedActivities.reduce(
      (acc, act) => acc + act.price,
      0
    );

    setPrice(yachtPrice + activitiesTotal);
  }, [bookingType, hours, startDate, endDate, guests, selectedActivities]);

  const handleBooking = async () => {
    if (!user?.uid) {
      alert("Please sign in to continue");
      return;
    }

    const now = new Date();

    const payload = {
      bookingType,
      bookingDate: now.toISOString(), // set now
      reservationDate:
        bookingType === "hourly"
          ? hourlyDate
          : bookingType === "overnight"
          ? startDate
          : undefined,
      reservationTime: startTime || "00:00", // ensure this is a valid time string
      numberOfPeople: parseInt(guests),
      bookingPrice: price.toFixed(2), // ensure string with 2 decimals
      userUid: user.uid,
      yachtId: state.id,
      activities: selectedActivities.map((a) => a.id),
      transportationRequest: transportationRequest || undefined,
    };

    try {
      const res = await fetch("http://localhost:3000/bookings/yacht", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Booking failed");

      const data = await res.json();
      alert("Booking confirmed!");
      navigate("/confirmation", { state: { bookingId: data.bookingId } });
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  const activityOptions = activities.map((activity) => ({
    value: activity.id,
    label: `${activity.name} (EGP ${activity.pricePerHour})`,
    id: activity.id,
    name: activity.name,
    price: activity.pricePerHour,
  }));

  if (!state || !name || !hourlyRate || !destinationId) {
    return <p>🚫 Missing yacht or destination details.</p>;
  }

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

      <section className="yacht-details-card">
        <div className="yacht-details-content">
          <div className="yacht-main-text">
            <h2>{name}</h2>
            {mainDescription && <p>{mainDescription}</p>}
            <ul className="yacht-specs-compact">
              <li>🧍 {guestCapacity} Guests</li>
              <li>🛏️ {beds} Beds</li>
              <li>⏱️ EGP {hourlyRate}/hour</li>
              <li>📅 EGP {dailyRate}/day</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="booking-content">
        <div className="booking-form">
          <label>Booking Type</label>
          <select
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
          >
            <option value="hourly">Hourly</option>
            <option value="overnight">Overnight Trip</option>
          </select>

          {bookingType === "hourly" && (
            <>
              <label>Booking Date</label>
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

          <label>Activities</label>
          {loadingActivities ? (
            <p>Loading...</p>
          ) : activitiesError ? (
            <p className="error-message">{activitiesError}</p>
          ) : (
            <Select
              isMulti
              options={activityOptions}
              value={selectedActivities}
              onChange={(options) => setSelectedActivities(options || [])}
            />
          )}

          <CateringBtn destinationId={destinationId} />
          <TransportationModal />

          <button
            className="checkout-btn"
            disabled={!price || price <= 0}
            onClick={handleBooking}
          >
            Reserve Yacht
          </button>
        </div>

        {price !== null && price > 0 && (
          <div className="booking-summary">
            <h3>Summary</h3>
            {selectedActivities.length > 0 && (
              <>
                <ul>
                  {selectedActivities.map((a, i) => (
                    <li key={i}>
                      {a.name} — EGP {a.price}
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Activities Total:</strong> EGP{" "}
                  {selectedActivities.reduce((acc, act) => acc + act.price, 0)}
                </p>
              </>
            )}
            <p className="price-display">
              <strong>Total Estimate:</strong> EGP {price}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YachtBookingForm;
