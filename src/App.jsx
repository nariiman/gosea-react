import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Marsa from './pages/Marsa.jsx';
import Kayaking from './pages/Kayaking.jsx';
import LuxYacht from './pages/LuxYacht.jsx';
import TransportationPage from './pages/Transportation';
import Catering from './components/Catering';
// import Catering from './components/CheckoutPage';
import Checkout from './components/Checkout.jsx';






// import Slideshow from './components/Slideshow.jsx'; // fix the path if needed


function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marsa" element={<Marsa />} />
        <Route path="/kayaking" element={<Kayaking />} />
        <Route path="/luxury-yacht" element={<LuxYacht />} />
        <Route path="/transportation" element={<TransportationPage />} />
        <Route path="/catering" element={<Catering />} />
        <Route path="/checkout" element={<Checkout />} />



        {/* Add more routes here */}
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App