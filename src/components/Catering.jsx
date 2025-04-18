import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ss.css';

import kay from '../assets/kay.jpg';
// import bbqImg from '../assets/bbq.jpg';
// import fingerfoodImg from '../assets/fingerfood.jpg';
// import sushiImg from '../assets/sushi.jpg';
// import orientalImg from '../assets/oriental.jpg';

const cuisineOptions = [
  {
    name: 'Seafood',
    price: 1200,
    img: kay,
    description: 'Grilled shrimp, lobster bites, calamari, seafood rice.'
  },
  {
    name: 'BBQ',
    price: 1000,
    img: kay,
    description: 'BBQ chicken wings, beef skewers, grilled veggies, sauces.'
  },
  {
    name: 'Finger Food',
    price: 700,
    img: kay,
    description: 'Spring rolls, mini sliders, puff pastries, mixed dips.'
  },
  {
    name: 'Sushi',
    price: 1300,
    img: kay,
    description: 'Nigiri, Maki rolls, Sashimi, soy sauce, pickled ginger.'
  },
  {
    name: 'Oriental',
    price: 900,
    img: kay,
    description: 'Kofta, kebab, vine leaves, sambousak, tahini.'
  }
];

const Catering = () => {
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setSelectedMenus((prev) =>
      prev.find((m) => m.name === menu.name)
        ? prev.filter((m) => m.name !== menu.name)
        : [...prev, menu]
    );
  };

  const handleContinue = () => {
    if (selectedMenus.length === 0) {
      alert('Please select at least one menu option.');
      return;
    }

    navigate('/checkout', {
      state: { menus: selectedMenus, notes: specialNotes }
    });
  };

  return (
    <div className="catering-container">
      <h2>🍽️ Catering Options</h2>
      <p>Select one or more preferred menus for your trip:</p>

      <div className="catering-grid">
        {cuisineOptions.map((item) => {
          const isSelected = selectedMenus.some((m) => m.name === item.name);
          return (
            <div
              key={item.name}
              className={`menu-card ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleMenu(item)}
            >
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p><strong>EGP {item.price}</strong> per person</p>
              <p className="menu-description">{item.description}</p>
            </div>
          );
        })}
      </div>

      

      <form onSubmit={(e) => {
        e.preventDefault();
        handleContinue();
      }}>
        <textarea
          placeholder="Special requests / allergies?"
          value={specialNotes}
          onChange={(e) => setSpecialNotes(e.target.value)}
        />
        <div className="btn-wrapper">
          <button className="checkout-btn" type="submit">Continue to Checkout</button>
        </div>
      </form>
    </div>
  );
};

export default Catering;
