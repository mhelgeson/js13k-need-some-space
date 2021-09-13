import random from "../util/random";

const Explosion = () => {
  const count = 48;
  const radius = 2;
  const duration = 3; // seconds
  const colors = [
    "#A10100",
    "#DA1F05",
    "#F33C04",
    "#FE650D",
    "#FFC11F",
    "#FFF75D",
  ];
  let particles = [];
  let started = null;

  const start = (time, position) => {
    // console.log("EXPLODE.START");
    started = time;
    for (let i = 0; i < count; i++) {
      let pos = position.clone();
      let vel = pos.clone();
      vel.length(random(50, 100));
      vel.angle(Math.random() * 2 * Math.PI);
      particles.push({
        pos: position.clone(),
        vel: position
          .clone()
          .length(random(200, 400))
          .angle(Math.random() * 2 * Math.PI),
        clr: colors[random(colors.length - 1)],
        r: radius,
      });
      particles.push({
        pos: position.clone(),
        vel: position
          .clone()
          .length(random(800, 1600))
          .angle(Math.random() * 2 * Math.PI),
        clr: "#FFFFFF",
        r: radius,
      });
    }
  };

  const stop = () => {
    // console.log("EXPLODE.STOP");
    particles = [];
    started = null;
  };

  return {
    engine: (game) => {
      const time = game.timing.engine;
      const clock = game.timing.clock;
      // update the particles
      if (started) {
        const progress = (clock - started) / duration;
        particles.forEach((particle) => {
          particle.pos.add(particle.vel.clone().multiply(time));
          particle.r = (1 - progress) * radius;
        });
        if (progress >= 1) {
          stop();
        }
      } else if (game.attr.destroyed && !started) {
        start(game.timing.clock, game.attr.position);
      }
    },
    render: (game) => {
      const ctx = game.stage.ctx;
      if (started) {
        particles.forEach(({ pos, r, clr }) => {
          ctx.beginPath();
          const { x, y } = pos.clone().subtract(game.attr.viewport);
          ctx.arc(x, y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = clr;
          ctx.fill();
        });
      }
    },
  };
};

export default Explosion;
