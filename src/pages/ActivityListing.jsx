import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

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
          const formattedData = data.map(activity => ({
            ...activity,
            pricePerHour: activity.pricePerHour ?? null,
            imageUrl: activity.pics ? `${activity.pics}` : '/assets/Shorely.png'
          }));
          setActivities(formattedData);
        } else {
          console.error('Response is not an array:', data);
          setActivities([]);
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

  const formatPrice = (price) => {
    if (price === null || price === undefined) return null;
    return price % 1 === 0 ? price.toFixed(0) : price.toFixed(2);
  };

  return (
    <div className="activities-page">
      <Breadcrumbs />
      <h2 className="activities-title">Explore Activities</h2>

      {loading ? (
        <p>Loading...</p>
      ) : activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="activities-grid">
          {activities.map((item, index) => {
            const priceFormatted = formatPrice(item.pricePerHour);

            return (
              <Link
                to={`/activities/${item.id}`}
                state={{
                  name: item.name,
                  basePrice: item.pricePerHour || 0,
                  durationUnit: 15,
                  durations: [15, 30, 45, 60],
                  timeSlots: {
                    morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'],
                    afternoon: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM'],
                    evening: ['4:00 PM', '4:30 PM', '5:00 PM'],
                  },
                }}
                key={index}
                className="activity-card"
              >
                <img src={item.imageUrl} alt={item.name} />
                <div className="activity-card-content">
                  <span className="activity-type">{item.activity_type || 'Activity'}</span>
                  <h3>{item.name}</h3>
                  <p className="activity-price">
                    {priceFormatted !== null ? (
                      <>From <strong>EGP {priceFormatted}/hour</strong></>
                    ) : (
                      <>Not Available</>
                    )}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActivityListing;
