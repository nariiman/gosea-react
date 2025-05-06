import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ss.css';

const Catering = () => {
  const { id } = useParams(); // Destination ID
  const [options, setOptions] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCatering = async () => {
      try {
        const res = await fetch(`http://localhost:3000/catering/destination/${id}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setOptions(data);
        } else {
          console.warn("Expected array, received:", data);
          setOptions([]);
        }
      } catch (err) {
        console.error('Failed to fetch catering options:', err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCatering();
  }, [id]);

  const toggleMenu = (menu) => {
    setSelectedMenus((prev) =>
      prev.find((m) => m.id === menu.id)
        ? prev.filter((m) => m.id !== menu.id)
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

      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(options) && options.length > 0 ? (
        <div className="catering-grid">
          {options.map((item) => {
            const isSelected = selectedMenus.some((m) => m.id === item.id);
            return (
              <div
                key={item.id}
                className={`menu-card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleMenu(item)}
              >
                <img src={item.pics || 'fallback.png'} alt={item.name} />
                <h3>{item.name}</h3>
                <p><strong>EGP {item.pricePerPerson}</strong> per person</p>
                <p className="menu-description">{item.description}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No catering options available for this destination.</p>
      )}

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
