import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const YachtListing = () => {
  const { id } = useParams(); // destination ID
  const navigate = useNavigate();
  const [yachts, setYachts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYachts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/yachts/destination/${id}`);
        const data = await res.json();
        setYachts(data);
      } catch (err) {
        console.error('Failed to fetch yachts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchYachts();
  }, [id]);

  const handleCardClick = (yacht) => {
    navigate(`/yachts/${yacht.id}`, {
      state: {
        name: yacht.name,
        hourlyRate: parseFloat(yacht.pricePerHour),
        dailyRate: parseFloat(yacht.pricePerHour) * 8,
        destinationId: yacht.destinationId ?? yacht.destination_id,
      }
    });
  };

  return (
    <div className="items-list">
      <h2>Yachts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : yachts.length === 0 ? (
        <p>No yachts found.</p>
      ) : (
        yachts.map((item) => (
          <div
            key={item.id}
            className="vertical-card"
            onClick={() => handleCardClick(item)}
            style={{ cursor: 'pointer' }}
          >
            <img src={item.pics || 'fallback.png'} alt={item.name} />
            <div className="card-details">
              <span className="tag">{item.yachtType || 'Yacht'}</span>
              <h3>{item.name}</h3>
              <p className="price">
                from <strong>{item.pricePerHour} EGP/hour</strong>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default YachtListing;
