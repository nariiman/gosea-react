import pic from "../assets/Shorely.png";
import "../styles/ss.css";

function Destcard() {
  return (
    <div className="card">
      <img className="cardimg" src={pic} alt="Marsa"></img>
      <h2 className="cardTitle">Alexandria</h2>
      <a href="marsa.html" className="card">
        <span>Marsa Alam</span>
      </a>
    </div>
  );
}

export default Destcard;
