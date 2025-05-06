import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Transportation from './Transportation';
import CateringBtn from './CateringBtn';
import Select from 'react-select';

const YachtBookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    name = '',
    hourlyRate = 0,
    dailyRate = 0,
    startTimes = [],
    destinationId = null,
  } = state || {};

  if (!state || !name || !hourlyRate || !destinationId) {
    return <p>🚫 Missing yacht or destination details. Please go back and select a yacht again.</p>;
  }

  const [bookingType, setBookingType] = useState('hourly');
  const [hourlyDate, setHourlyDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [hours, setHours] = useState('');
  const [guests, setGuests] = useState('');
  const [price, setPrice] = useState(null);
  const [dateError, setDateError] = useState('');

  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [activitiesError, setActivitiesError] = useState('');

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      setLoadingActivities(true);
      try {
        const res = await fetch(`http://localhost:3000/activities?destinationId=${destinationId}`);
        const data = await res.json();
        // Convert pricePerHour to number here immediately
        const formatted = data.map(a => ({
          ...a,
          pricePerHour: Number(a.pricePerHour),
        }));
        setActivities(formatted);
      } catch (err) {
        setActivitiesError('Failed to fetch activities.');
      } finally {
        setLoadingActivities(false);
      }
    };

    fetchActivities();
  }, [destinationId]);

  // Calculate total price
  useEffect(() => {
    setDateError('');
    const guestCount = guests ? parseInt(guests) : 0;

    if (bookingType === 'multi-day' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) {
        setDateError('🚫 End date cannot be before start date.');
        setPrice(null);
        return;
      }
    }

    let yachtPrice = 0;

    if (bookingType === 'hourly' && hours && guestCount > 0) {
      yachtPrice = parseInt(hours) * hourlyRate * guestCount;
    } else if (bookingType === 'multi-day' && startDate && endDate && guestCount > 0) {
      const diffDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        yachtPrice = diffDays * dailyRate * guestCount;
      }
    }

    const activitiesTotal = selectedActivities.reduce((acc, act) => acc + act.price, 0);
    setPrice(yachtPrice + activitiesTotal);
  }, [bookingType, hours, startDate, endDate, guests, selectedActivities]);

  const handleBooking = () => {
    const bookingData = {
      bookingType,
      hourlyDate,
      startDate,
      endDate,
      startTime,
      hours,
      guests,
      price,
      activityIds: selectedActivities.map((a) => a.id),
    };

    console.log('Booking:', bookingData);
    alert('Booking submitted!');
  };

  const activityOptions = activities.map(activity => ({
    value: activity.id,
    label: `${activity.name} (EGP ${activity.pricePerHour})`,
    id: activity.id,
    name: activity.name,
    price: activity.pricePerHour,
  }));

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
          {dateError && <p className="error-message">{dateError}</p>}
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

      <label>Select Activities (with price):</label>
      {loadingActivities ? (
        <p>Loading activities...</p>
      ) : activitiesError ? (
        <p style={{ color: 'red' }}>{activitiesError}</p>
      ) : (
        <Select
          isMulti
          className="activity-select"
          options={activityOptions}
          value={selectedActivities}
          onChange={(selectedOptions) => setSelectedActivities(selectedOptions || [])}
        />
      )}

      {selectedActivities.length > 0 && (
        <div className="activity-receipt">
          <h4>Selected Activities:</h4>
          <ul>
            {selectedActivities.map((activity, index) => (
              <li key={index}>
                🎯 {activity.name} — <strong>EGP {activity.price}</strong>
              </li>
            ))}
          </ul>
          <p><strong>Activities Total:</strong> EGP {
            selectedActivities.reduce((acc, act) => acc + act.price, 0)
          }</p>
        </div>
      )}

      {price !== null && (
        <p className="price-display">
          Estimated Total Price: <strong>EGP {price}</strong>
        </p>
      )}

      <CateringBtn destinationId={destinationId} />
      <Transportation />

      <button className="checkout-btn" onClick={handleBooking}>
        Reserve Yacht
      </button>
    </div>
  );
};

export default YachtBookingForm;
