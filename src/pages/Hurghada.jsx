import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import HurghadaImage from "../assets/Hurghada.png"; // replace with actual image

function Hurghada() {
  const navigate = useNavigate();
  const destinationId = 2;

  return (
    <div>
      <Hero
        backgroundImage={HurghadaImage}
        title="Discover Hurghada"
        subtitle="Explore top yachts and exciting activities in Hurghada"
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

export default Hurghada;
