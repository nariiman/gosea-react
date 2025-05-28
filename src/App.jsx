import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import GoToTop from "./components/GoToTop.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.jsx";
import Kayaking from "./pages/Kayaking.jsx";
import LuxYacht from "./pages/LuxYacht.jsx";
import TransportationPage from "./pages/Transportation";
import Catering from "./components/Catering";
import ActivityListing from "./pages/ActivityListing";
import YachtListing from "./pages/YachtListing";
import YachtBookingForm from "./components/YachtBookingForm";
import ActivityBookingForm from "./components/ActivityBookingForm";
import DestinationPage from "./pages/DestinationPage";
import Payment from "./pages/Payment.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import BookingDetail from "./pages/BookingDetails.jsx";
import CheckoutPage from "./pages/CheckoutPage.js";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";

function AppRoutes() {
  return (
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
      <Route
        path="/destinations/:id/yachts/:id"
        element={<YachtBookingForm />}
      />
      <Route
        path="/destinations/:id/activities/:id"
        element={<ActivityBookingForm />}
      />
      <Route path="/payment" element={<Payment />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/bookings" element={<MyBookings />} />
      <Route path="/bookings/:id" element={<BookingDetail />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
      <Layout>
        <AppRoutes />
      </Layout>
      <GoToTop />
    </BrowserRouter>
  );
}

export default App;
