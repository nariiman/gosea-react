import Shorely from "../assets/Shorely.png";
import Kayaking from "../assets/Kayaking.png";
// Add more images as needed

const items = [
  // ----------- ACTIVITIES -----------
  {
    name: "Kayaking",
    location: "Marsa Alam",
    type: "activity",
    basePrice: 750, // price for 15 mins
    durationUnit: "15-mins",
    durations: [15, 30, 45, 60],
    image: Kayaking,
    link: "/kayaking",
  },
  {
    name: "Surfing/Wind Surfing",
    location: "Marsa Alam",
    type: "activity",
    basePrice: 750,
    durationUnit: "15-mins",
    durations: [15, 30, 45],
    image: Shorely,
    link: "/surfing",
  },
  {
    name: "Scuba Diving",
    location: "Marsa Alam",
    type: "activity",
    basePrice: 1000,
    durationUnit: "15-mins",
    durations: [15, 30, 60],
    image: Kayaking,
    link: "/scuba-diving",
  },
  {
    name: "Fishing Tour",
    location: "Marsa Alam",
    type: "activity",
    basePrice: 1200,
    durationUnit: "15-mins",
    durations: [15, 30, 45],
    image: Kayaking,
    link: "/fishing-tour",
  },
  {
    name: "Jet Ski Adventure",
    location: "Marsa Alam",
    type: "activity",
    basePrice: 850,
    durationUnit: "15-mins",
    durations: [15, 30, 45],
    image: Kayaking,
    link: "/jetskii",
  },

  // ----------- YACHTS -----------
  {
    name: "Luxury Yacht",
    location: "Marsa Alam",
    type: "yacht",
    hourlyRate: 4000,
    dailyRate: 30000,
    durations: {
      hourly: [3, 6, 9, 12], // in hours
      daily: [1, 2, 3, 4, 5], // in days
    },
    image: Kayaking,
    link: "/luxury-yacht",
  },
  {
    name: "Private Sunset Yacht",
    location: "Marsa Alam",
    type: "yacht",
    hourlyRate: 5000,
    dailyRate: 35000,
    durations: {
      hourly: [2, 4, 6],
      daily: [1, 2],
    },
    image: Kayaking,
    link: "/private-sunset",
  },
  {
    name: "Family Yacht Party",
    location: "Marsa Alam",
    type: "yacht",
    hourlyRate: 6000,
    dailyRate: 40000,
    durations: {
      hourly: [3, 6, 9],
      daily: [1, 2, 3],
    },
    image: Kayaking,
    link: "/family-yacht",
  },
];

export default items;
