// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
import Carousel from '../components/Carousel.jsx';
// import Destcard from './components/Destcard.jsx';
// import CategoryTabs from './components/CategoryTabs.jsx';
import CateringPartners from '../components/CateringPartners.jsx';
import Destinations from '../components/Destinations.jsx';
import Features from '../components/Features.jsx';
// import "./styles/ss.css";

// import Slideshow from './components/Slideshow.jsx'; // fix the path if needed


function Home() {
  return (
    <>
    
      {/* <Header /> */}
      <Carousel />
      <Destinations />
      <Features />
      <CateringPartners />
      {/* <Footer /> */}
    </>
  );
}

export default Home