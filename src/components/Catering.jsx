import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/ss.css';

const Catering = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { booking } = location.state || {};

  const [options, setOptions] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [loading, setLoading] = useState(true);

  const guestCount = booking?.guests || 1;

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
    if (!booking) {
      toast.error("Please book a yacht or activity first before proceeding to checkout.");
      return;
    }

    if (selectedMenus.length === 0) {
      toast.error("Please select at least one menu option.");
      return;
    }

    const cateringTotal = selectedMenus.reduce(
      (acc, m) => acc + (m.pricePerPerson * guestCount),
      0
    );

    navigate('/checkout', {
      state: {
        booking,
        menus: selectedMenus,
        notes: specialNotes,
        cateringTotal
      }
    });
  };

  return (
    <div className="catering-container">
      <h2>🍽️ Catering Options</h2>
      <p>Select one or more menus for your trip. You have <strong>{guestCount}</strong> guest{guestCount > 1 ? 's' : ''}.</p>

      {loading ? (
        <p>Loading menus...</p>
      ) : options.length > 0 ? (
        <div className="catering-grid">
          {options.map((item) => {
            const isSelected = selectedMenus.some((m) => m.id === item.id);
            return (
              <div
                key={item.id}
                className={`menu-card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleMenu(item)}
              >
                <img src={`/assets/${item.pics}`} alt={item.name} />
                <h3>{item.name}</h3>
                <p><strong>EGP {item.pricePerPerson}</strong> per guest</p>
                <p className="menu-description">{item.description}</p>
                {Array.isArray(item.dishes) && item.dishes.length > 0 && (
                  <ul className="menu-dishes">
                    {item.dishes.map((dish, idx) => (
                      <li key={idx}>🍴 {dish}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No catering options found for this destination.</p>
      )}

      {selectedMenus.length > 0 && (
        <div className="summary-box">
          <p><strong>{selectedMenus.length}</strong> menu{selectedMenus.length > 1 ? 's' : ''} selected</p>
          <p>Total Catering: <strong>EGP {
            selectedMenus.reduce((acc, m) => acc + (m.pricePerPerson * guestCount), 0)
          }</strong></p>
        </div>
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
