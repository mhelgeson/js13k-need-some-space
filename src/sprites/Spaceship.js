import Canvas from "../util/Canvas";
import path from "../util/path";

/*

0  w/2  w
+   +   + 0
   / \
+ / + \ + h/2
 /     \
+ - + - + h

*/

const Spaceship = () => {
  const w = 30;
  const h = 40;
  const r = 4;
  // draw the spaceship once to copy into stage on render
  const { canvas, ctx } = Canvas(w, h);

  path(
    ctx,
    [
      "M",
      w / 2,
      0,
      "L",
      w,
      h,
      "L",
      w / 2,
      (h * 3) / 4,
      "L",
      0,
      h,
      "L",
      w / 2,
      0,
      "Z",
      "M",
      w / 2,
      h / 2 - r,
      // "E",
      // w / 2,
      // h / 2,
      // r,
      // r,
      // (Math.PI * 3) / 2,
      // 0,
      // 2 * Math.PI,
    ].join()
  );
  ctx.fillStyle = "rgba(255,255,255,.85)";
  ctx.fill("evenodd");
  ctx.strokeStyle = "#FFF";
  ctx.stroke();

  return {
    engine: (game) => {},
    render: (game) => {
      // destroyed...
      if (game.attr.destroyed) {
        return;
      }
      const ctx = game.stage.ctx;
      const pos = game.attr.position.clone().subtract(game.attr.viewport);
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(-game.attr.direction);
      ctx.drawImage(canvas, -w / 2, -h / 2, w, h);
      ctx.restore();
    },
  };
};

export default Spaceship;
