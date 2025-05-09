import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from "../components/Breadcrumbs";

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

        const formattedData = data.map(yacht => ({
          ...yacht,
          pricePerHour: yacht.pricePerHour ? parseFloat(yacht.pricePerHour) : null,
          imageUrl: yacht.pics || '/assets/Shorely.png'
        }));

        setYachts(formattedData);
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
        hourlyRate: yacht.pricePerHour,
        dailyRate: yacht.pricePerHour ? yacht.pricePerHour * 8 : 0,
        destinationId: yacht.destinationId ?? yacht.destination_id,
        mainImage: yacht.pics || '/assets/Shorely.png',
        gallery: [
          '/assets/kay.jpg',
          '/assets/kaya.jpg',
          '/assets/kayaking.jpg',
          '/assets/Kayaking.png',
          '/assets/JetSki.png',
        ]
      }
    });
  };

  const formatPrice = (price) => {
    if (price === null || isNaN(price)) return null;
    return price % 1 === 0 ? price.toFixed(0) : price.toFixed(2);
  };

  return (
    <div className="yachts-page">
      <Breadcrumbs />
      <h2 className="yachts-title">Explore Yachts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : yachts.length === 0 ? (
        <p>No yachts found.</p>
      ) : (
        <div className="yachts-grid">
          {yachts.map((item) => (
            <div
              key={item.id}
              className="yacht-card"
              onClick={() => handleCardClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <img src={item.imageUrl} alt={item.name} />
              <div className="yacht-card-content">
                <span className="yacht-type">{item.yachtType || 'Yacht'}</span>
                <h3>{item.name}</h3>
                <p className="yacht-price">
                  {formatPrice(item.pricePerHour) !== null ? (
                    <>from <strong>EGP {formatPrice(item.pricePerHour)}/hour</strong></>
                  ) : (
                    <>Price Not Available</>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YachtListing;
