import Hero from "../components/Hero";
import ActivityBookingForm from "../components/ActivityBookingForm";
import Kayak from "../assets/Kayaking.png";

const kayakingTimeSlots = {
  morning: [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
  ],
  afternoon: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM"],
  evening: ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"],
};

const Kayaking = () => {
  return (
    <>
      <Hero
        backgroundImage={Kayak}
        title="Your Go To Kayaking Adventure"
        subtitle="Explore top yachts and exciting activities in Marsa Alam"
      />

      <ActivityBookingForm
        name="Kayaking in Marsa Alam"
        basePrice={750}
        durationUnit={15}
        durations={[15, 30, 45, 60]}
        timeSlots={kayakingTimeSlots}
      />
    </>
  );
};

export default Kayaking;
