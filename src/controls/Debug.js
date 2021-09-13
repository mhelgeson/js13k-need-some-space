import $ from "../util/$";

const round = (num, precision = 0) => {
  const pow = Math.pow(10, precision);
  return Math.round(num * pow) / pow;
};

const Debug = (game) => {
  game.debug = true;

  const html = `
    <pre><code>{}</code></div>
    <div><label><input type="checkbox" /> Paused</label></div>
  `;
  const div = document.createElement("div");
  const $div = $(div).html(html).appendTo(document.body).css({
    position: "absolute",
    top: 0,
    left: 0,
    color: "#FFF",
  });
  const $stats = $("code", div);
  const $check = $("input", div).on("change", (ev) => {
    game.pause(ev.target.checked);
  });

  return {
    render: ({ debug, timing, attr }) => {
      if (debug !== true) {
        return;
      }
      const stats = {
        clock: `${round(timing.clock, 3)} sec`,
        engine: `${round(~~(1 / timing.engine))} fps`,
        render: `${round(~~(1 / timing.render))} fps`,
        ...attr,
      };
      $stats.html(JSON.stringify(stats, null, 2));
    },
  };
};

export default Debug;
