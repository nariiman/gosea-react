import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ActivityListing = () => {
  const { id } = useParams();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`http://localhost:3000/activities/destination/${id}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setActivities(data);
        } else {
          console.error('Response is not an array:', data);
          setActivities([]); // fallback to empty
        }
      } catch (err) {
        console.error('Failed to fetch activities:', err);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [id]);

  return (
    <div className="items-list">
      <h2>Activities</h2>
      {loading ? (
        <p>Loading...</p>
      ) : activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        activities.map((item, index) => (
          <Link
            to={`/activities/${item.id}`}
            state={{
              name: item.name,
              basePrice: parseFloat(item.price_per_hour),
              durationUnit: 15,
              durations: [15, 30, 45, 60],
              timeSlots: {
                morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'],
                afternoon: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM'],
                evening: ['4:00 PM', '4:30 PM', '5:00 PM'],
              },
            }}
            key={index}
            className="vertical-card"
          >
            <img src={item.pics || 'fallback.png'} alt={item.name} />
            <div className="card-details">
              <span className="tag">{item.activity_type || 'Activity'}</span>
              <h3>{item.name}</h3>
              <p className="price">
                from <strong>{item.price_per_hour} EGP/hour</strong>
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ActivityListing;
