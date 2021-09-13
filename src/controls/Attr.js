import Vector from "../util/Vector";
import path from "../util/path";

const Attr = (game) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // initialize vectors
  const position = new Vector(0, 0);
  const velocity = new Vector();
  const friction = new Vector();
  const acceleration = new Vector();
  const viewport = new Vector(-width / 2, -height / 2);

  game.attr = {
    width,
    height,
    position,
    velocity,
    friction,
    acceleration,
    direction: -Math.PI / 2,
    thrust: 0,
    hitpoints: 5,
    viewport,
    destroyed: true,
  };

  game.on("collision", (pos) => {
    game.attr.hitpoints -= 1;
    if (game.attr.hitpoints <= 0) {
      game.emit("destroyed");
    }
  });

  game.on("destroyed", (pos) => {
    game.attr.destroyed = true;
    game.attr.thrust = 0;
  });

  game.on("reset", () => {
    game.attr.destroyed = false;
    game.attr.thrust = 0;
    game.attr.hitpoints = 5;
    game.attr.direction = -Math.PI / 2;
    game.attr.position.set(0, 0);
    game.attr.viewport.set(-width / 2, -height / 2);
  });

  return {
    engine: (game) => {
      const time = game.timing.engine;

      // ship rotation from mouse position
      const mouse = game.attr.mouse.clone().subtract(position).add(viewport);
      game.attr.direction = mouse.angle();

      // destroyed...
      if (game.attr.destroyed) {
        acceleration.set(0, 0);
      } else {
        // update acceleration vector from mouse thrust angle
        // acceleration.x = game.attr.thrust;
        acceleration
          .length(game.attr.thrust)
          .angle(game.attr.direction)
          .multiply(-1);
      }

      if (game.attr.thrust) {
        // acceleration is change in velocity over time
        velocity.add(acceleration.clone().multiply(time)).max(1000);
      } else {
        // force of friction opposes velocity
        friction.set(-velocity.x, -velocity.y).divide(100);
        velocity.add(friction);
      }
      // velocity is change in position over time
      const distance = velocity.clone().multiply(time);
      position.add(distance);
      viewport.add(distance);
    },

    render: (game) => {
      if (!game.debug) {
        return;
      }
      const ctx = game.stage.ctx;
      const angle = game.attr.direction;
      const pos = game.attr.position.clone().subtract(game.attr.viewport);
      const vel = game.attr.velocity;
      const acc = game.attr.acceleration;

      ctx.save();
      ctx.lineWidth = 8;
      ctx.lineCap = "round";

      // draw the velocity vector
      path(ctx, ["M", pos.x, pos.y, "l", vel.x, vel.y, "Z"]);
      ctx.strokeStyle = "rgba(0,255,0,.5)";
      ctx.stroke();

      // draw the acceleration vector
      path(ctx, ["M", pos.x, pos.y, "l", acc.x, acc.y, "Z"]);
      ctx.strokeStyle = "rgba(255,0,0,.5)";
      ctx.stroke();
      ctx.restore();
    },
  };
};

export default Attr;
