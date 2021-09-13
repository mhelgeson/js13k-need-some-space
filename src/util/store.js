// static methods
store = function (name, value) {
  // serialize data to persistent local storage
  if (arguments.length === 2) {
    localStorage.setItem(name, JSON.stringify(value));
    return value;
  }
  // retrieve data from persistent local storage
  if (arguments.length === 1) {
    try {
      return JSON.parse(localStorage.getItem(name));
    } catch (ex) {
      return undefined;
    }
  }
};
