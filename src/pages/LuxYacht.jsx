import React from "react";
import "../styles/ss.css";
import Hero from "../components/Hero";
import YachtBookingForm from "../components/YachtBookingForm";
import Shorely from "../assets/Shorely.png";

const LuxYacht = () => {
  const startTimes = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
  ];

  return (
    <>
      <Hero
        backgroundImage={Shorely}
        title="Luxury Yacht Charter"
        subtitle="Customize your private yacht experience"
      />

      <YachtBookingForm
        name="Luxury Yacht - Marsa Alam"
        hourlyRate={4000}
        dailyRate={30000}
        startTimes={startTimes}
      />
    </>
  );
};

export default LuxYacht;
