import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ss.css';

const fetchDestinations = async () => {
  const { data } = await axios.get('http://localhost:3000/destinations');
  return data;
};

const DestinationList = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['destinations'],
    queryFn: fetchDestinations,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  if (isLoading) return <p>Loading destinations...</p>;
  if (error) return <p>Error fetching destinations</p>;

  return (
    <section className="destinations">
      {data.map((destination) => (
        <div
          key={destination.id}
          className="card"
          onClick={() => navigate(`/destinations/${destination.id}`)}
          style={{ cursor: 'pointer' }}
        >
          <img src={destination.imageUrl || 'fallback.png'} alt={destination.name} />
          <span>{destination.name}</span>
        </div>
      ))}
    </section>
  );
};

export default DestinationList;
