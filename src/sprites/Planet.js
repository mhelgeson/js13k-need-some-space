import Vector from "../util/Vector";
import Canvas from "../util/Canvas";
import path from "../util/path";

const Planet = () => {
  const w = 1000;
  const h = 1000;

  const position = new Vector(0, 0);

  const { canvas, ctx } = Canvas(w, h);
  path(ctx, ["E", w / 2, h / 2, w / 2, h / 2, 0, 0, 2 * Math.PI, "Z"].join());
  ctx.fillStyle = "green";
  ctx.fill();

  return {
    render: (game) => {
      const ctx = game.stage.ctx;
      const pos = position.clone().subtract(game.attr.viewport);
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.drawImage(canvas, -w / 2, -h / 2, w, h);
      ctx.restore();
    },
  };
};

export default Planet;
