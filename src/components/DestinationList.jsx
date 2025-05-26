import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fetchDestinations = async () => {
  const { data } = await axios.get("http://localhost:3000/destinations");
  return data;
};

const DestinationList = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["destinations"],
    queryFn: fetchDestinations,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading) return <p>Loading destinations...</p>;
  if (error) return <p>Error fetching destinations</p>;

  return (
    <section className="destinations">
      {data.map((destination) => (
        <div
          key={destination.id}
          className="destination-card"
          onClick={() => navigate(`/destinations/${destination.id}`)}
          role="button"
          aria-label={destination.name}
        >
          <img
            src={destination.imageUrl || "/fallback.png"}
            alt={destination.name}
            loading="lazy"
          />
          <span>{destination.name}</span>
        </div>
      ))}
    </section>
  );
};

export default DestinationList;
