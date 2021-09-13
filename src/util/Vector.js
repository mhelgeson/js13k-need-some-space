class Vector {
  constructor(x = 0, y = 0) {
    this.set(x, y);
  }

  set(x, y) {
    this.x = assertNumber(x);
    this.y = assertNumber(y);
    return this;
  }

  min(value) {
    // const { x, y } = this;
    // return this.set(Math.abs(x) <= n ? 0 : x, Math.abs(y) <= n ? 0 : y);
    return this.length(Math.max(value, this.length()));
  }

  max(value) {
    // const { x, y } = this;
    // return this.set(Math.abs(x) >= n ? 0 : x, Math.abs(y) >= n ? 0 : y);
    return this.length(Math.min(value, this.length()));
  }

  // add vector
  add(vector) {
    return this.set(this.x + vector.x, this.y + vector.y);
  }

  // subtract vector
  subtract(vector) {
    return this.set(this.x - vector.x, this.y - vector.y);
  }

  // multiply scalar
  multiply(factor) {
    return this.set(this.x * factor, this.y * factor);
  }

  // divide scalar
  divide(divisor) {
    return this.set(this.x / divisor, this.y / divisor);
  }

  angle(value) {
    if (value != null) {
      const length = this.length();
      return this.set(Math.sin(value), Math.cos(value)).multiply(length);
    }
    return Math.atan2(this.x, this.y); // getter
  }

  // magnitude
  length(value) {
    if (value != null) {
      const angle = this.angle();
      return this.set(Math.sin(angle), Math.cos(angle)).multiply(value);
    }
    return Math.sqrt(this.x ** 2 + this.y ** 2); // getter
  }

  // normalize to a unit vector
  normalize() {
    const len = this.length();
    return len ? this.divide(len) : this;
  }

  // rotate the vector to perpindicular
  rotate() {
    return this.set(-this.y, this.x);
  }

  // dot product
  dot(vector) {
    vector = vector || this;
    return this.x * vector.x + this.y * vector.y;
  }

  // copy into a new vector instance
  clone() {
    return new Vector(this.x, this.y);
  }
}

// ensure valid vector values
function assertNumber(n) {
  // validate the value
  if (isNaN(n) === true) {
    throw new Error("NaN in Vect");
  }
  if (isFinite(n) === false) {
    throw new Error("Infinity in Vect");
  }
  // fix flotaing point errors
  return Math.round(n * 1e6) / 1e6;
}

export default Vector;
