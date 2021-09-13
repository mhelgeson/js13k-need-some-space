// shorthand query selector all
const $ = function $(selector, scope) {
  // auto instantiate
  if (!(this instanceof $)) {
    return new $(selector, scope);
  }
  switch (typeof selector) {
    // array/nodelist
    case Array.isArray(selector) && "object":
    case selector instanceof NodeList && "object":
      return this.push(...selector);
    // straight node elem
    case "object":
      return this.push(selector);
    // string selector
    case "string":
      return this.find(selector, scope);
  }
};

// instance methods
$.prototype = {
  push: function (...args) {
    [].push.apply(this, args);
    return this;
  },
  find: function (selector, scope) {
    scope = scope || this[0] || document || documentElement;
    return this.push(...scope.querySelectorAll(selector));
  },
  each: function (iterator) {
    [].forEach.call(this, iterator);
    return this; // chain
  },
  on: function (type, listener) {
    return this.each((elem) =>
      elem.addEventListener(type, listener.bind(elem))
    );
  },
  attr: function (...args) {
    const [name, value] = args;
    if (this.length > 0 && args.length === 1) {
      return this[0][name]; // getter
    } else if (args.length === 2) {
      this.each((elem) => (elem[name] = value)); // setter
    }
    return this; // chain
  },
  html: function (...args) {
    return this.attr(...["innerHTML", ...args]);
  },
  css: function (name, value) {
    if (typeof name === "object") {
      Object.keys(name).forEach((key) => this.css(key, name[key]));
      return this;
    }
    return this.each((elem) => (elem.style[name] = value));
  },
  appendTo: function (parent) {
    return this.each((node) => parent.appendChild(node));
  },
};

export default $;
