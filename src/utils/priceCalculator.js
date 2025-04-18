// import item from '../data/items'; // or pass via props


export function calculateActivityPrice(basePrice, duration, unit = 15) {
    return (duration / unit) * basePrice;
  }
  
  export function calculateYachtPrice(type, rate, duration) {
    return rate * duration;
  }

//   totalPrice = durationPrice * numberOfGuests
