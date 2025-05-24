import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Shorely from "../assets/Shorely.png";

function Marsa() {
  const navigate = useNavigate();
  const destinationId = 1; // ✅ Set correct ID from your database (Marsa Alam = 1)

  return (
    <div>
      <Hero
        backgroundImage={Shorely}
        title="Discover Marsa Alam"
        subtitle="Explore top yachts and exciting activities in Marsa Alam"
      />

      <div
        className="button-group"
        style={{ textAlign: "center", marginTop: "2rem" }}
      >
        <button
          onClick={() => navigate(`/destinations/${destinationId}/activities`)}
        >
          View Activities
        </button>
        <button
          onClick={() => navigate(`/destinations/${destinationId}/yachts`)}
        >
          View Yachts
        </button>
      </div>
    </div>
  );
}

export default Marsa;
