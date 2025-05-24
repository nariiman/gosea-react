import React, { useState, useEffect } from "react"; // 🛠️ Add useEffect
import "../styles/ss.css";

const Transportation = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [passengers, setPassengers] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const vehicleCapacities = {
    Sedan: 4,
    SUV: 6,
    Van: 8,
    "Mini Bus": 15,
    Bus: 50,
  };

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
      alert(validationMessage); // Prevent form submit if invalid
      return;
    }

    console.log({ pickup, dropoff, vehicle, passengers, time, notes });
    alert("Transportation request submitted!");
  };

  return (
    <div className="transportation-page">
      <h2>Transportation Request</h2>
      <p>Tell us how you'd like to get there</p>

      <form className="transportation-form" onSubmit={handleSubmit}>
        <label>
          Pickup Location:
          <input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Hotel / Road Name"
            required
          />
        </label>

        <label>
          Number of Passengers:
          <input
            type="number"
            min="1"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            placeholder="Enter number of passengers"
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
            <option value="" disabled>
              Select vehicle
            </option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Mini Bus">Mini Bus</option>
            <option value="Bus">Bus</option>
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
  );
};

export default Transportation;
