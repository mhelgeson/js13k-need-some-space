import $ from "../util/$";
import Canvas from "../util/Canvas";

const Stage = (game) => {
  $("body").css({
    background: "#0a0b3d",
    margin: 0,
    padding: 0,
  });

  const width = window.innerWidth;
  const height = window.innerHeight;
  const { canvas, ctx } = Canvas(width, height, document.body);

  $(canvas).css("cursor", "crosshair");

  game.stage = {
    canvas,
    ctx,
    width,
    height,
  };

  return {
    engine: () => {},
    render: () => {
      ctx.clearRect(0, 0, width, height);
      // const pos = game.attr.position;
      // ctx.translate(-pos.x, -pos.y);
    },
  };
};

export default Stage;
