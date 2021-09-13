import $ from "../util/$";
import Vector from "../util/Vector";

const Mouse = (game) => {
  game.attr.thrust = 0;
  game.attr.mouse = new Vector();

  const move = (ev) => {
    game.attr.mouse.set(ev.pageX, ev.pageY);
  };

  const accel = (ev) => {
    move(ev);
    if (!game.attr.destroyed) {
      game.attr.thrust = 500;
    }
  };

  const decel = (ev) => {
    move(ev);
    game.attr.thrust = 0;
  };

  $(game.stage.canvas)
    .on("mousedown", accel)
    .on("mousemove", move)
    .on("mouseup", decel);

  return {};
};

export default Mouse;
