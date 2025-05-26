import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Hero from "../components/Hero";

function DestinationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: destination,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["destination", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/destinations/${id}`
      );
      return data;
    },
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleNavigate = (type) => {
    navigate(`/destinations/${id}/${type}`);
  };

  if (isLoading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading destination...</p>
      </div>
    );
  }

  if (isError || !destination) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Destination Not Found 🛑</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="destination-page">
      <Hero
        backgroundImage={destination.imageUrl || "/assets/Shorely.png"}
        title={`Discover ${destination.name}`}
        subtitle={
          destination.description ||
          `Explore unforgettable experiences in ${destination.name}`
        }
      />

      <section className="bubbles">
        {[
          { label: "Sunset Cruises", icon: "🌅" },
          { label: "Watersports", icon: "🏄‍♂️" },
          { label: "Private Yachts", icon: "🛥️" },
          { label: "Gourmet Menus", icon: "🍤" },
          { label: "Hotel Pickup", icon: "🚌" },
        ].map((item, i) => (
          <span key={i} className="bubble-tag">
            {item.icon} {item.label}
          </span>
        ))}
      </section>

      <section className="split-section reverse">
        <div
          className="image full-bg"
          style={{
            backgroundImage: `url(${
              destination.imageUrl || "/assets/Shorely.png"
            })`,
          }}
        ></div>
        <div className="text">
          <h2>Explore Activities</h2>
          <p>
            Dive into thrilling adventures — snorkeling, paddle boarding, desert
            safaris, and more. Our hand-picked activities offer excitement and
            unforgettable memories.
          </p>
          <button
            className="btn-primary"
            onClick={() => handleNavigate("activities")}
          >
            Explore Activities
          </button>
        </div>
      </section>

      <section className="split-section">
        <div
          className="image full-bg"
          style={{
            backgroundImage: `url(${
              destination.imageUrl || "/assets/Shorely.png"
            })`,
          }}
        ></div>
        <div className="text">
          <h2>Book a Yacht</h2>
          <p>
            Set sail in style. Our fleet includes premium yachts for every
            occasion — from luxury cruises to private celebrations. Fully
            customizable and crew-ready.
          </p>
          <button
            className="btn-secondary"
            onClick={() => handleNavigate("yachts")}
          >
            Discover Yachts
          </button>
        </div>
      </section>
    </div>
  );
}

export default DestinationPage;
