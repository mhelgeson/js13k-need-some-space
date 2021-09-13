import Prando from "prando";

// make random numbers consistent
const rng = new Prando("4TNwT:kzWc76yLgW");

const random = (num1 = 100, num2 = 0) => {
  const min = Math.min(num1, num2);
  const max = Math.max(num1, num2);
  return Math.round(rng.next() * (max - min)) + min;
};

export default random;
