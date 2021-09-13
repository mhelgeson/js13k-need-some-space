import Canvas from "../util/Canvas";
import path from "../util/path";

const TestShape = () => {
  const w = 325;
  const h = 325;

  const { canvas, ctx } = Canvas(w, h);
  path(
    ctx,
    `
    E 80 80 45 45 0 0 3.14
    Z
  `
  );
  ctx.fillStyle = "green";
  ctx.fill();

  // path( ctx, `
  //   M 230 80
  //   A 45 45, 0, 1, 0, 275 125
  //   L 275 80 Z
  // `);
  // ctx.fillStyle = "red";
  // ctx.fill();

  // path( ctx, `
  //   M 80 230
  //   A 45 45, 0, 0, 1, 125 275
  //   L 125 230 Z
  // `);
  // ctx.fillStyle = "purple";
  // ctx.fill();

  // path( ctx, `
  //   M 230 230
  //   A 45 45, 0, 1, 1, 275 275
  //   L 275 230 Z
  // `);
  // ctx.fillStyle = "blue";
  // ctx.fill();

  return {
    render: (game) => {
      const ctx = game.stage.ctx;
      const pos = game.attr.position.clone().subtract(game.attr.viewport);
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.drawImage(canvas, -w / 2, -h / 2, w, h);
      ctx.restore();
    },
  };
};

export default TestShape;
