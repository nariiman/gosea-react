import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Kayaking from "./pages/Kayaking.jsx";
import LuxYacht from "./pages/LuxYacht.jsx";
import TransportationPage from "./pages/Transportation";
import Catering from "./components/Catering";
import Checkout from "./pages/Checkout.jsx";
import ActivityListing from "./pages/ActivityListing";
import YachtListing from "./pages/YachtListing";
import YachtBookingForm from "./components/YachtBookingForm";
import ActivityBookingForm from "./components/ActivityBookingForm";
import DestinationPage from "./pages/DestinationPage";
import GoToTop from "./components/GoToTop.jsx";
import Payment from "./pages/Payment.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations/:id" element={<DestinationPage />} />
          <Route
            path="/destinations/:id/activities"
            element={<ActivityListing />}
          />
          <Route path="/destinations/:id/yachts" element={<YachtListing />} />
          <Route path="/kayaking" element={<Kayaking />} />
          <Route path="/luxury-yacht" element={<LuxYacht />} />
          <Route path="/transportation" element={<TransportationPage />} />
          <Route path="/catering/:id" element={<Catering />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/yachts/:id" element={<YachtBookingForm />} />
          <Route path="/activities/:id" element={<ActivityBookingForm />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <GoToTop />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
