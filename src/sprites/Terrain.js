import Canvas from "../util/Canvas";
import path from "../util/path";
import random from "../util/random";

// length and pos of terrain openings
const COORDS = [
  [5, 5], // |########|
  [0, 9], // |        |
  //---------0123456789-
  [0, 8], // |       #|
  [1, 9], // |#       |
  //---------0123456789-
  [0, 7], // |      ##|
  [1, 8], // |#      #|
  [2, 9], // |##      |
  //---------0123456789-
  [3, 9], // |###     |
  [2, 8], // |##     #|
  [1, 7], // |#     ##|
  [0, 6], // |     ###|
  //---------0123456789-
  [0, 5], // |    ####|
  [1, 6], // |#    ###|
  [2, 7], // |##    ##|
  [3, 8], // |###    #|
  [4, 9], // |####    |
  //---------0123456789-
  [5, 9], // |#####   |
  [4, 8], // |####   #|
  [3, 7], // |###   ##|
  [2, 6], // |##   ###|
  [1, 5], // |#   ####|
  [0, 4], // |   #####|
  //---------0123456789-
  [0, 3], // |  ######|
  [1, 4], // |#  #####|
  [2, 5], // |##  ####|
  [3, 6], // |###  ###|
  [4, 7], // |####  ##|
  [5, 8], // |#####  #|
  [6, 9], // |######  |
];

const COLOR_FILL = "rgba(100,100,132,.95)";
const COLOR_STROKE = "rgba(100,100,132,.5)";
const COLOR_ACTIVE = "rgba(255,255,127,.5)";
const COLOR_ALERT = "rgba(255,127,127,.75)";

const Terrain = (w, h) => {
  // units of measure
  const wu = 250;
  const hu = 100;

  const offset_x = -w / 2;
  const offset_y = -h / 2;

  const values = [0, 1, 2, 3, 4, 5];
  const count = 500;
  let v = 0;
  for (let i = 0; i <= count; i++) {
    // v += random(-2, +2);
    v = random(COORDS.length);
    v = Math.max(v, 1);
    v = Math.min(v, COORDS.length - 1);
    values.push(v);
  }
  const upper = [];
  const lower = [];
  values.forEach((val, i) => {
    const [a, b] = COORDS[val];
    upper.push({ x: i * wu + offset_x, y: a * hu + offset_y });
    lower.push({ x: i * wu + offset_x, y: b * hu + offset_y });
  });

  // keep track of intersection vertexes
  const radius = 16;
  const top = {};
  const bot = {};

  return {
    engine: (game) => {
      const pos = game.attr.position;

      // terrain coords from current position
      const index_min = Math.floor((pos.x - offset_x) / wu);
      const index_max = Math.ceil((pos.x - offset_x) / wu);

      // active terrain vertexes
      const top_left = upper[index_min] || {};
      const top_right = upper[index_max] || {};
      const bot_left = lower[index_min] || {};
      const bot_right = lower[index_max] || {};

      // upper slope, intercept, ship intersect
      let dy1 = top_right.y - top_left.y;
      let dx1 = top_right.x - top_left.x;
      let m1 = dy1 / dx1;
      let i1 = top_right.y - m1 * top_right.x;
      top.x = pos.x;
      top.y = m1 * pos.x + i1;
      top.collision = pos.y - radius < top.y;

      // lower slope, intercept, ship intersect
      let dy2 = bot_right.y - bot_left.y;
      let dx2 = bot_right.x - bot_left.x;
      let m2 = dy2 / dx2;
      let i2 = bot_right.y - m2 * bot_right.x;
      bot.x = pos.x;
      bot.y = m2 * pos.x + i2;
      bot.collision = pos.y + radius > bot.y;

      // broadcast collisions...
      if (game.attr.hitpoints > 0) {
        if (top.collision || bot.collision) {
          game.emit("collision", pos.clone());
        }
      }
    },
    render: (game) => {
      const ctx = game.stage.ctx;
      ctx.save();
      const view = game.attr.viewport;
      ctx.translate(-view.x, -view.y);
      ctx.lineWidth = 24;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      path(ctx, [
        "M",
        upper[0].x,
        -h,
        ...upper.map((pos) => ["L", pos.x, pos.y]),
        "L",
        upper[upper.length - 1].x,
        -h,
        "Z",
      ]);

      ctx.strokeStyle = COLOR_STROKE;
      ctx.stroke();
      ctx.fillStyle = COLOR_FILL;
      ctx.fill();

      path(ctx, [
        "M",
        lower[0].x,
        +h,
        ...lower.map((pos) => ["L", pos.x, pos.y]),
        "L",
        lower[lower.length - 1].x,
        +h,
        "Z",
      ]);

      ctx.strokeStyle = COLOR_STROKE;
      ctx.stroke();
      ctx.fillStyle = COLOR_FILL;
      ctx.fill();

      if (game.debug) {
        ctx.lineWidth = 8;
        const pos = game.attr.position;

        // upper ship intersection
        path(ctx, [
          "M",
          top.x,
          top.y,
          "E",
          top.x,
          top.y,
          10,
          10,
          0,
          0,
          2 * Math.PI,
          false,
        ]);
        ctx.fillStyle = top.collision ? COLOR_ALERT : COLOR_ACTIVE;
        ctx.fill();

        // lower ship intersection
        path(ctx, [
          "M",
          bot.x,
          bot.y,
          "E",
          bot.x,
          bot.y,
          10,
          10,
          0,
          0,
          2 * Math.PI,
          false,
        ]);
        ctx.fillStyle = bot.collision ? COLOR_ALERT : COLOR_ACTIVE;
        ctx.fill();
      }

      ctx.restore();
    },
  };
};

export default Terrain;
