import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ss.css';

const CateringButton = () => {
  const navigate = useNavigate();

  return (
    <button className="catering-btn" onClick={() => navigate('/catering')}>
      View Catering Options 🍽️
    </button>
  );
};

export default CateringButton;
