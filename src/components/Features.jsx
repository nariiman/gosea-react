import React from "react";

const features = [
  { title: "Best Selection", description: "Handpicked yachts & activities." },
  {
    title: "Best Price Guarantee",
    description: "We match lower prices elsewhere.",
  },
  {
    title: "Best Activities",
    description: "Unforgettable experiences on sea.",
  },
];

const Features = () => (
  <section className="features">
    {features.map((feature, index) => (
      <div key={index} className="feature">
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    ))}
  </section>
);

export default Features;
