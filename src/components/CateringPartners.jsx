import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCateringPartners = async () => {
  const { data } = await axios.get("http://localhost:3000/catering");
  return data.slice(0, 3).map((item) => ({
    name: item.name,
    logo: item.pics || "/fallback.png",
  }));
};

const SkeletonCard = () => (
  <div className="partner-card skeleton">
    <div className="skeleton-img" />
    <div className="skeleton-text" />
  </div>
);

const CateringPartners = () => {
  const {
    data: partners,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["catering-partners"],
    queryFn: fetchCateringPartners,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="catering">
      <h2>Our Catering Partners</h2>
      <p>Enjoy world-class dining experiences with our catering partners.</p>
      <div className="partner-logos">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)
        ) : error ? (
          <p>Failed to load catering partners.</p>
        ) : (
          partners.map((partner, index) => (
            <div className="partner-card" key={index}>
              <img src={partner.logo} alt={partner.name} />
              <p>{partner.name}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CateringPartners;
