import React from 'react';
// import './CateringPartners.css';
import '../styles/ss.css';


const partners = [
  { name: 'El Gouna', logo: '/path/to/elgouna-logo.png' },
  { name: 'Chef\'s Kiss', logo: '/path/to/chefskiss-logo.png' },
  { name: 'The Y Catering', logo: '/path/to/ycatering-logo.png' },
];

const CateringPartners = () => (
  <section className="catering">
    <h2>Our Catering Partners</h2>
    <p>Enjoy world-class dining experiences with our catering partners.</p>
    <div className="partner-logos">
      {partners.map((partner, index) => (
        <img key={index} src={partner.logo} alt={partner.name} />
      ))}
    </div>
  </section>
);

export default CateringPartners;
