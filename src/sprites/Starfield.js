import Canvas from "../util/Canvas";
import random from "../util/random";

// Perlin Noise for nebulae?
// https://gist.github.com/donpark/1796361

const Starfield = (width, height, distance = 0) => {
  const count = Math.sqrt(width * height) / 4;
  const radius = 1;

  // star field pos
  let x = 0;
  let y = 0;

  // draw the starfield once to copy into stage on render
  const { canvas, ctx } = Canvas(width, height);
  for (let i = 0; i < count; i++) {
    ctx.beginPath();
    const radius = Math.random() * 1.2;
    ctx.arc(random(width), random(height), radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `hsl(${[0, 60, 240][i % 3]},${random(50, 100)}%,85%)`;
    ctx.fill();
  }

  return {
    engine: (game) => {
      const pos = game.attr.position.clone().multiply(distance);
      x = pos.x % width;
      y = pos.y % height;
    },
    render: (game) => {
      const ctx = game.stage.ctx;
      // copy into 4 quadrants for infinite scrolling
      [-x, (x < 0 ? -width : +width) - x].forEach((x) => {
        [-y, (y < 0 ? -height : +height) - y].forEach((y) => {
          ctx.drawImage(canvas, x, y, width, height);
        });
      });
    },
  };
};

export default Starfield;
