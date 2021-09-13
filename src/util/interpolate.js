const easing = {
  linear: (t) => t,
  easeOutQuad: (t) => t * (2 - t),
  easeOutQuint: (t) => 1 + --t * t * t * t * t,
  easeInQuint: (t) => t * t * t * t * t,
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};

const interpolate = (a, b, pct, name = "easeOutQuad") => {
  return easing[name](pct) * (b - a) + a;
};

export default interpolate;
