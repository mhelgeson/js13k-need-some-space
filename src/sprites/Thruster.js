import Canvas from "../util/Canvas";
import path from "../util/path";

const Thruster = () => {
  // Thruster attr...
  let w = 12;
  let h = 24;
  let wu = w / 4;
  let hu = h / 3;

  const { canvas, ctx } = Canvas(w, h);

  path(
    ctx,
    [
      "M",
      1 * wu,
      0 * hu,
      "L",
      0 * wu,
      2 * hu,
      "L",
      1 * wu,
      1 * hu,
      "L",
      2 * wu,
      3 * hu,
      "L",
      3 * wu,
      1 * hu,
      "L",
      4 * wu,
      2 * hu,
      "L",
      3 * wu,
      0 * hu,
      "Z",
    ].join()
  );

  ctx.fillStyle = "rgba(255,127,127,1)";
  ctx.fill();

  let angle = Math.PI;

  return {
    engine: (game) => {
      // update local value
      angle = game.attr.direction;
    },
    render: (game) => {
      if (game.attr.thrust && !game.attr.destroyed) {
        const ctx = game.stage.ctx;
        const pos = game.attr.position.clone().subtract(game.attr.viewport);
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(-angle);
        ctx.drawImage(canvas, -w / 2, +h, w, h);
        ctx.restore();
      }
    },
  };
};

export default Thruster;
