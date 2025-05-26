import Carousel from "../components/Carousel.jsx";
import CateringPartners from "../components/CateringPartners.jsx";
import DestinationList from "../components/DestinationList.jsx";
import Features from "../components/Features.jsx";

function Home() {
  return (
    <>
      <Carousel />
      <DestinationList />
      <Features />
      <CateringPartners />
    </>
  );
}

export default Home;
