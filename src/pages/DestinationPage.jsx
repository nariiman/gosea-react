import { useNavigate, useParams } from 'react-router-dom';
import Hero from '../components/Hero';
// import MarsaImage from '../assets/marsa.jpg';
// import HurghadaImage from '../assets/hurghada.jpg';
// import SharmImage from '../assets/sharm.jpg';
// import CairoImage from '../assets/cairo.jpg';
// import ElGounaImage from '../assets/gouna.jpg';
// import AlexImage from '../assets/alex.jpg';
import Shorely from '../assets/Shorely.png';


const destinationData = {
  1: {
    name: 'Marsa Alam',
    image: Shorely,
    subtitle: 'Explore top yachts and exciting activities in Marsa Alam',
  },
  2: {
    name: 'Hurghada',
    image: Shorely,
    subtitle: 'Explore top yachts and exciting activities in Hurghada',
  },
  3: {
    name: 'Sharm El Sheikh',
    image: Shorely,
    subtitle: 'Enjoy unforgettable experiences in Sharm El Sheikh',
  },
  4: {
    name: 'Cairo',
    image: Shorely,
    subtitle: 'Cruise the Nile and discover city adventures',
  },
  5: {
    name: 'El Gouna',
    image: Shorely,
    subtitle: 'Luxury, water, and relaxation await you in El Gouna',
  },
  6: {
    name: 'Alexandria',
    image: Shorely,
    subtitle: 'Yachts and culture on the Mediterranean',
  }
};

function DestinationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const destination = destinationData[id];

  if (!destination) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Destination Not Found 🛑</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  const handleNavigate = (type) => {
    navigate(`/destinations/${id}/${type}`);
  };

  return (
    <div className="destination-page">
      <Hero backgroundImage={destination.image} title={`Discover ${destination.name}`} subtitle={destination.subtitle} />

{/* Bubble Tags */}
<section className="bubbles">
        {[
          { label: 'Sunset Cruises', icon: '🌅' },
          { label: 'Watersports', icon: '🏄‍♂️' },
          { label: 'Private Yachts', icon: '🛥️' },
          { label: 'Gourmet Menus', icon: '🍤' },
          { label: 'Hotel Pickup', icon: '🚌' },
        ].map((item, i) => (
          <span key={i} className="bubble-tag">
            {item.icon} {item.label}
          </span>
        ))}
      </section>


      {/* Section 1 - Activities */}
      <section className="split-section reverse">
        <div className="image full-bg" style={{ backgroundImage: `url(${destination.image})` }}></div>
        <div className="text">
          <h2>Explore Activities</h2>
          <p>Dive into thrilling adventures — snorkeling, paddle boarding, desert safaris, and more. Our hand-picked activities offer excitement and unforgettable memories.</p>
          <button className="btn-primary" onClick={() => handleNavigate("activities")}>Explore Activities</button>
        </div>
      </section>

      

      {/* Section 2 - Yachts */}
      <section className="split-section">
        <div className="image full-bg" style={{ backgroundImage: `url(${destination.image})` }}></div>
        <div className="text">
          <h2>Book a Yacht</h2>
          <p>Set sail in style. Our fleet includes premium yachts for every occasion — from luxury cruises to private celebrations. Fully customizable and crew-ready.</p>
          <button className="btn-secondary" onClick={() => handleNavigate("yachts")}>Discover Yachts</button>
        </div>
      </section>
    </div>
  );
}

export default DestinationPage;
