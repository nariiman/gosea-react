import React, { useState, useEffect } from 'react';
import Transportation from './Transportation';

const ActivityBookingForm = ({ name, basePrice, durationUnit = 15, durations, timeSlots }) => {
  const [preferredTime, setPreferredTime] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('');
  const [riders, setRiders] = useState('');
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (duration && riders) {
      const durationCost = (parseInt(duration) / durationUnit) * basePrice;
      const riderCount = riders === '6+' ? 6 : parseInt(riders);
      setPrice(durationCost * riderCount);
    } else {
      setPrice(null);
    }
  }, [duration, riders]);

  return (
    <div className="details">
      <h2>{name}</h2>
      <p>Choose your preferred time, duration, and let's go! 🌊</p>

      <input type="date" />

      <select onChange={(e) => setPreferredTime(e.target.value)} value={preferredTime}>
        <option value="">Select Preferred Time</option>
        {Object.keys(timeSlots).map((slot) => (
          <option key={slot} value={slot}>
            {slot.charAt(0).toUpperCase() + slot.slice(1)}
          </option>
        ))}
      </select>

      {preferredTime && (
        <select onChange={(e) => setSelectedTime(e.target.value)} value={selectedTime}>
          <option value="">Choose Time Slot</option>
          {timeSlots[preferredTime].map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
      )}

      <select onChange={(e) => setDuration(e.target.value)} value={duration}>
        <option value="">Select Duration</option>
        {durations.map((d) => (
          <option key={d} value={d}>{d} mins</option>
        ))}
      </select>

      <select onChange={(e) => setRiders(e.target.value)} value={riders}>
        <option value="">Number of Riders</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6+">6+</option>
      </select>

      {price && (
        <p className="price-display">
          Estimated Price for {riders} rider{riders > 1 ? 's' : ''}:{' '}
          <strong>EGP {price}</strong>
        </p>
      )}

      <Transportation />

      <button className="checkout-btn">Book Now</button>
    </div>
  );
};

export default ActivityBookingForm;
