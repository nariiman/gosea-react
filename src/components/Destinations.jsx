import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '../styles/ss.css';

const fetchDestinations = async () => {
  const { data } = await axios.get('http://localhost:3000/destinations');
  return data;
};

const Destinations = () => {
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
      {data.map((destination, index) => (
        <a href={destination.imageUrl ?? '#'} key={index} className="card">
          <span>{destination.name}</span>
        </a>
      ))}
    </section>
  );
};

export default Destinations;
