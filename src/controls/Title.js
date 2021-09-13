import Canvas from "../util/Canvas";
import path from "../util/path";

const Title = (game) => {
  const { width, height } = game.attr;
  const { canvas, ctx } = Canvas(width, height);

  const x = width / 2;
  const y = height / 2;

  const title = "Need some space.";

  ctx.font = "48px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000000";
  ctx.strokeText(title, x, y);
  ctx.fillStyle = "#bbb5f1";
  ctx.fillText(title, x, y);

  let started = null;
  let progress = null;
  let duration = 3; // seconds

  const start = (time) => {
    // console.log("TITLE.START");
    started = time;
    progress = 0;
  };

  const stop = () => {
    // console.log("TITLE.STOP");
    started = null;
    game.emit("reset");
  };

  return {
    engine: (game) => {
      const time = game.timing.engine;
      const clock = game.timing.clock;
      // update the title
      if (started) {
        progress = (clock - started) / duration;
        if (progress >= 1) {
          stop();
        }
      } else if (game.attr.destroyed && !started) {
        start(clock);
      }
    },
    render: (game) => {
      const ctx = game.stage.ctx;
      if (game.attr.destroyed) {
        ctx.save();
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = `rgba(10,11,61,${progress})`;
        ctx.fill();
        ctx.globalAlpha = progress;
        ctx.drawImage(canvas, 0, 0, width, height);
        ctx.restore();
      }
    },
  };
};

export default Title;
