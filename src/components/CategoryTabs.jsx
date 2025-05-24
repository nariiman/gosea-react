import React, { useState } from "react";
import items from "../data/items"; // create this file with your array
import "../styles/ss.css";

const CategoryTabs = () => {
  const [category, setCategory] = useState("activity");

  const filteredItems = items.filter((item) => item.type === category);

  return (
    <>
      <div className="tabs">
        <button
          className={`tab ${category === "activity" ? "active" : ""}`}
          onClick={() => setCategory("activity")}
        >
          Activity
        </button>
        <button
          className={`tab ${category === "yacht" ? "active" : ""}`}
          onClick={() => setCategory("yacht")}
        >
          Yacht
        </button>
      </div>

      <section className="items-list">
        {filteredItems.length === 0 ? (
          <p className="no-items">No {category}s available.</p>
        ) : (
          filteredItems.map((item, index) => (
            <a href={item.link} key={index} className="vertical-card">
              <img src={item.image} alt={item.name} />
              <div className="card-details">
                <span className="tag">Featured</span>
                <h3>{item.name}</h3>
                <p className="location">{item.location}</p>
                <p className="price">
                  from <strong>{item.basePrice} EGP</strong>
                </p>
              </div>
            </a>
          ))
        )}
      </section>
    </>
  );
};

export default CategoryTabs;
