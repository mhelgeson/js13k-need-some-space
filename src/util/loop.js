const now = () => performance.now();

const loop = (func, time) => {
  let prev = now();
  const next = time ? (fn) => setTimeout(fn, time) : requestAnimationFrame;
  const frame = () => {
    const current = now();
    const delta = (current - prev) / 1000; // Math.min???
    // execute callback func
    func(delta);
    // schedule next tick
    next(frame);
    // move time forward
    prev = current;
  };
  // start ticking
  frame();
};

export default loop;
