import React, { useState, useEffect } from 'react';
import Transportation from './Transportation';
import CateringBtn from './CateringBtn';

const YachtBookingForm = ({ name, hourlyRate, dailyRate, startTimes }) => {
  const [bookingType, setBookingType] = useState('hourly');
  const [hourlyDate, setHourlyDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [hours, setHours] = useState('');
  const [guests, setGuests] = useState('');
  const [price, setPrice] = useState(null);

  const [dateError, setDateError] = useState('');

  useEffect(() => {
    // 🔸 Reset previous error
    setDateError('');
  
    const guestCount = guests ? parseInt(guests) : 0;
  
    // 🔸 Validate multi-day date range
    if (bookingType === 'multi-day' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      if (end < start) {
        setDateError('🚫 End date cannot be before start date.');
        setPrice(null);
        return;
      }
    }
  
    // 💰 Price Calculation Logic
    if (bookingType === 'hourly' && hours && guestCount > 0) {
      const durationCost = parseInt(hours) * hourlyRate;
      setPrice(durationCost * guestCount);
    } else if (bookingType === 'multi-day' && startDate && endDate && guestCount > 0) {
      const diffDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        const total = diffDays * dailyRate * guestCount;
        setPrice(total);
      }
    } else {
      setPrice(null);
    }
  }, [bookingType, hours, startDate, endDate, guests]);
  

  return (
    <div className="details">
      <h2>{name}</h2>
      <p>Choose your yacht rental type and customize your trip details.</p>

      <label>Booking Type:</label>
      <select value={bookingType} onChange={(e) => setBookingType(e.target.value)}>
        <option value="hourly">Hourly</option>
        <option value="multi-day">Multi-day</option>
      </select>

      {bookingType === 'hourly' && (
        <>
          <label>Booking Date:</label>
          <input type="date" value={hourlyDate} onChange={(e) => setHourlyDate(e.target.value)} />

          <label>Start Time:</label>
          <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
            <option value="">Select Start Time</option>
            {startTimes.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>

          <label>Hours Required:</label>
          <select value={hours} onChange={(e) => setHours(e.target.value)}>
            <option value="">Select Duration</option>
            <option value="2">2 Hours</option>
            <option value="4">4 Hours</option>
            <option value="6">6 Hours</option>
            <option value="8">8 Hours</option>
          </select>
        </>
      )}

      {bookingType === 'multi-day' && (
        <>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          {dateError && (
  <p className="error-message">{dateError}</p>
)}

        </>
        
      )}

      <label>Guest Count:</label>
      <input
        type="number"
        min={1}
        max={50}
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        placeholder="Enter number of guests"
      />

{price && (
  <p className="price-display">
    Estimated Price for {guests} guest{guests > 1 ? 's' : ''}:{' '}
    <strong>EGP {price}</strong>
  </p>
)}


      <CateringBtn />
      <Transportation />

      <button className="checkout-btn">Reserve Yacht</button>
    </div>
  );
};

export default YachtBookingForm;
