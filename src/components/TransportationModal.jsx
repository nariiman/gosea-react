import React, { useState, useEffect } from "react";
import { useTransportation } from "../contexts/TransporationContext.jsx";

const vehicleCapacities = {
  Sedan: 4,
  SUV: 6,
  Van: 8,
  "Mini Bus": 15,
};

const TransportationModal = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [passengers, setPassengers] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const { setTransportationRequest } = useTransportation();

  useEffect(() => {
    if (vehicle && passengers) {
      const maxCapacity = vehicleCapacities[vehicle];
      if (parseInt(passengers) > maxCapacity) {
        setValidationMessage(
          `⚠️ The selected vehicle (${vehicle}) only supports up to ${maxCapacity} passengers.`
        );
      } else {
        setValidationMessage("");
      }
    }
  }, [vehicle, passengers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validationMessage) {
      alert(validationMessage);
      return;
    }

    const payload = {
      pickup,
      dropoff,
      vehicle,
      passengers: Number(passengers),
      time,
      notes,
    };

    setTransportationRequest(payload);
    setShowModal(false);
  };

  return (
    <>
      <div className="transportation-section">
        <label className="transportation-label">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span>I would like to request transportation</span>
        </label>
      </div>

      <div className="transportation-button-wrapper">
        <button
          className="transportation-btn"
          disabled={!isChecked}
          onClick={() => setShowModal(true)}
        >
          Request Transportation
        </button>
      </div>

      {showModal && (
        <div
          className="transportation-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="transportation-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h2>Transportation Request</h2>
            <form className="transportation-form" onSubmit={handleSubmit}>
              <label>
                Pickup Location:
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  required
                  placeholder="Hotel / Road Name"
                />
              </label>

              <label>
                Drop-off Location:
                <input
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  required
                  placeholder="Destination / Landmark"
                />
              </label>

              <label>
                Number of Passengers:
                <input
                  type="number"
                  min="1"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  required
                />
              </label>

              <label>
                Vehicle Type:
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  required
                >
                  <option value="">Select vehicle</option>
                  {Object.keys(vehicleCapacities).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>

              {validationMessage && (
                <p className="error-message">{validationMessage}</p>
              )}

              <label>
                Preferred Pickup Time:
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </label>

              <label>
                Special Requests / Notes:
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes like child seat, accessibility, etc."
                />
              </label>

              <button
                type="submit"
                className="submit-btn"
                disabled={!!validationMessage}
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TransportationModal;
