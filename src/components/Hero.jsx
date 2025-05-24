import React from "react";
import "../styles/ss.css";

const Hero = ({ backgroundImage, title, subtitle, children }) => {
  return (
    <div
      className="hero-banner parallax"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-overlay">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default Hero;
