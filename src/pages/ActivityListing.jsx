import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Breadcrumbs from "../components/Breadcrumbs";

const fetchActivities = async (destinationId) => {
  const res = await fetch(
    `http://localhost:3000/activities/destination/${destinationId}`
  );
  const data = await res.json();
  return data.map((activity) => ({
    ...activity,
    pricePerHour: activity.pricePerHour ?? null,
    imageUrl: activity.pics ? `${activity.pics}` : "/assets/Shorely.png",
  }));
};

const fetchTypes = async (destinationId) => {
  const res = await fetch(
    `http://localhost:3000/activities/types/${destinationId}`
  );
  return res.json();
};

const ActivityListing = () => {
  const { id } = useParams();
  const [typeFilter, setTypeFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");

  const {
    data: activities = [],
    isLoading: loadingActivities,
    isError: errorActivities,
  } = useQuery({
    queryKey: ["activities", id],
    queryFn: () => fetchActivities(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const {
    data: types = [],
    isLoading: loadingTypes,
    isError: errorTypes,
  } = useQuery({
    queryKey: ["types", id],
    queryFn: () => fetchTypes(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const filteredActivities = activities.filter((item) => {
    const matchesType = typeFilter
      ? item.activityType?.toLowerCase() === typeFilter.toLowerCase()
      : true;

    const matchesPrice = maxPriceFilter
      ? item.pricePerHour <= parseFloat(maxPriceFilter)
      : true;

    return matchesType && matchesPrice;
  });

  return (
    <div className="activities-page">
      {/* 🔥 Hero Section */}
      <div className="activities-hero">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/assets/activitieshero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          <h1>Explore Exciting Activities</h1>
          <p>
            Choose from a variety of thrilling experiences in this destination.
          </p>
        </div>
      </div>

      <div className="listing-container">
        <Breadcrumbs />
        <h2 className="activities-title">Explore Activities</h2>

        {/* 🔍 Filters */}
        <div className="filter-bar">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Max Price (EGP)"
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(e.target.value)}
          />
        </div>

        {/* 🗂️ Grid of Cards */}
        {loadingActivities || loadingTypes ? (
          <p>Loading...</p>
        ) : errorActivities || errorTypes ? (
          <p>Error loading activities or types.</p>
        ) : filteredActivities.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          <div className="activities-grid">
            {filteredActivities.map((item, index) => {
              const priceFormatted = parseInt(
                item.pricePerHour
              ).toLocaleString();

              return (
                <Link
                  to={`/destinations/${id}/activities/${item.id}`}
                  state={{
                    name: item.name,
                    basePrice: item.pricePerHour || 0,
                    durationUnit: 15,
                    durations: [15, 30, 45, 60],
                    timeSlots: {
                      morning: [
                        "9:00 AM",
                        "9:30 AM",
                        "10:00 AM",
                        "10:30 AM",
                        "11:00 AM",
                      ],
                      afternoon: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM"],
                      evening: ["4:00 PM", "4:30 PM", "5:00 PM"],
                    },
                  }}
                  key={index}
                  className="activity-card"
                >
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="activity-card-content">
                    <span className="activity-type badge">
                      {item.activityType?.trim().charAt(0).toUpperCase() +
                        item.activityType?.trim().slice(1) || "Activity"}
                    </span>

                    <h3>{item.name}</h3>
                    <p className="activity-price">
                      {priceFormatted !== null ? (
                        <>
                          From <strong>EGP {priceFormatted}/hour</strong>
                        </>
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
    </div>
  );
};

export default ActivityListing;
