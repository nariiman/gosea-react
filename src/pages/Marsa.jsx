
import CategoryTabs from '../components/CategoryTabs.jsx';

import Hero from '../components/Hero';
import Shorely from '../assets/Shorely.png';
// import Slideshow from './components/Slideshow.jsx'; // fix the path if needed

function Marsa() {
    return (
      <>
        <Hero
          backgroundImage={Shorely}
          title="Discover Marsa Alam"
          subtitle="Explore top yachts and exciting activities in Marsa Alam"
        />
        <CategoryTabs />
      </>
    );
  }
export default Marsa  