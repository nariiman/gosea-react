import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ss.css";

const CateringBtn = ({ destinationId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!destinationId) {
      alert("Missing destination ID!");
      return;
    }

    navigate(`/catering/${destinationId}`);
  };

  return (
    <button className="catering-btn" onClick={handleClick}>
      View Catering Options 🍽️
    </button>
  );
};

export default CateringBtn;
