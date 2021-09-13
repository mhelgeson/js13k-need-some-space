const Emitter = (game) => {
  const listeners = new Map();

  // register a callback function
  game.on = (type, handler) => {
    if (!listeners.has(type)) {
      listeners.set(type, []);
    }
    listeners.get(type).push(handler);
    // return a deregister function
    return () => game.off(type, handler);
  };

  // deregister a callback function
  game.off = (type, handler) => {
    if (!listeners.has(type)) {
      return;
    }
    const filtered = listeners
      .get(type)
      .filter((listener) => listener !== handler);
    listeners.set(type, filtered);
  };

  // trigger registered callbacks
  game.emit = (type, data) => {
    if (!listeners.has(type)) {
      return;
    }
    listeners.get(type).forEach((listener) => listener && listener(data));
  };

  return {};
};

export default Emitter;
