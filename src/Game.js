import Debug from "./controls/Debug";
import Attr from "./controls/Attr";
import Stage from "./controls/Stage";
import Mouse from "./controls/Mouse";
import Emitter from "./controls/Emitter";
import Title from "./controls/Title";

import Intro from "./scenes/Intro";

const Game = () => {
  const timing = {
    clock: 0,
    engine: 0,
    render: 0,
  };

  let paused = false;

  const doGameEngine = (item) => item?.engine && item?.engine(game);
  const doGameRender = (item) => item?.render && item?.render(game);

  const game = {
    timing,
    pause: (bool) => (bool == null ? paused : (paused = !!bool)),
    doGameEngine,
    engine: (tick) => {
      if (paused) {
        return;
      }
      timing.clock += tick;
      timing.engine = tick;
      controls.forEach(doGameEngine);
      doGameEngine(game.scene);
      overlays.forEach(doGameEngine);
    },
    doGameRender,
    render: (tick) => {
      if (paused) {
        return;
      }
      timing.render = tick;
      controls.forEach(doGameRender);
      doGameRender(game.scene);
      overlays.forEach(doGameRender);
    },
  };

  const controls = [Emitter(game), Stage(game), Attr(game), Mouse(game)];

  const overlays = [
    // Debug(game),
    Title(game),
  ];

  game.scene = Intro(game);

  return game;
};

export default Game;
