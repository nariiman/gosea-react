import React, { useEffect, useState } from 'react';
// import './Hero.css';
import '../styles/ss.css';

import Shorely from '../assets/Shorely.png';
import Kayaking from '../assets/Kayaking.png';
import JetSki from '../assets/JetSki.png';

const slides = [
  { image: Shorely },
  { image: Kayaking },
  { image: JetSki },
];


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="slideshow">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
        ))}
      </div>
      <div className="overlay">
        <h1>The best Yacht and Activities experience</h1>
        <div className="search-box">
          {/* Search functionality goes here */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
