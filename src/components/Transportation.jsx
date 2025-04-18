import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Transportation = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleTransportationClick = () => {
    if (isChecked) {
      navigate('/transportation');
    }
  };

  const vehicleCapacities = {
    'Sedan': 4,
    'SUV': 6,
    'Van': 8,
    'Mini Bus': 15,
  };

  const [passengers, setPassengers] = useState('');
const [vehicleType, setVehicleType] = useState('');
const [validationMessage, setValidationMessage] = useState('');

  return (
    <>
      <div className="transportation-section">
        <label className="transportation-label">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span>I would like to request transportation</span>
        </label>
      </div>

      <div className="transportation-button-wrapper">
        <button
          className="transportation-btn"
          disabled={!isChecked}
          onClick={handleTransportationClick}
        >
          Request Transportation
        </button>
      </div>
    </>
  );
};

export default Transportation;
