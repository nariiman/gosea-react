import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCatering } from "../contexts/CateringContext";

const fetchCateringOptions = async (destinationId) => {
  const res = await fetch(
    `http://localhost:3000/catering/destination/${destinationId}`
  );
  if (!res.ok) throw new Error("Failed to fetch catering options");
  return res.json();
};

const CateringModal = ({ destinationId, guests = 1 }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [specialNotes, setSpecialNotes] = useState("");

  const { setCateringRequest } = useCatering();

  const {
    data: menus = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["catering", destinationId],
    queryFn: () => fetchCateringOptions(destinationId),
    enabled: showModal && !!destinationId,
  });

  const toggleMenu = (menu) => {
    setSelectedMenus((prev) =>
      prev.find((m) => m.id === menu.id)
        ? prev.filter((m) => m.id !== menu.id)
        : [...prev, menu]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedMenus.length === 0) {
      alert("Please select at least one menu.");
      return;
    }

    const total = selectedMenus.reduce(
      (acc, menu) => acc + menu.pricePerPerson * guests,
      0
    );

    setCateringRequest({
      menus: selectedMenus,
      notes: specialNotes,
      total,
    });

    setShowModal(false);
  };

  return (
    <>
      <div className="transportation-section">
        <label className="transportation-label">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span>I would like to add catering</span>
        </label>
      </div>

      <div className="transportation-button-wrapper">
        <button
          className="transportation-btn"
          disabled={!isChecked}
          onClick={() => setShowModal(true)}
        >
          Choose Catering
        </button>
      </div>

      {showModal && (
        <div
          className="transportation-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="transportation-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h2>Select Catering Menus</h2>

            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p className="error-message">Failed to load catering options.</p>
            ) : menus.length === 0 ? (
              <p>No catering options available.</p>
            ) : (
              <div className="catering-grid">
                {menus.map((menu) => {
                  const selected = selectedMenus.some((m) => m.id === menu.id);
                  return (
                    <div
                      key={menu.id}
                      className={`menu-card ${selected ? "selected" : ""}`}
                      onClick={() => toggleMenu(menu)}
                    >
                      <img src={`/assets/${menu.pics}`} alt={menu.name} />
                      <h3>{menu.name}</h3>
                      <p>
                        <strong>EGP {menu.pricePerPerson}</strong> per guest
                      </p>
                      <p>{menu.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <label>
              Special Notes:
              <textarea
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="Allergies, preferences..."
              />
            </label>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={selectedMenus.length === 0}
            >
              Confirm Catering
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CateringModal;
