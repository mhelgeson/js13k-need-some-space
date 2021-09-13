import Starfield from "../sprites/Starfield";
import Spaceship from "../sprites/Spaceship";
import Thruster from "../sprites/Thruster";
import Terrain from "../sprites/Terrain";
import Explosion from "../sprites/Explosion";

const Intro = (game) => {
  const width = game.stage.width;
  const height = game.stage.height;

  const sprites = [
    Starfield(width, height, 0.25),
    Starfield(width, height, 0.375),
    Starfield(width, height, 0.5),
    Terrain(width, height),
    Spaceship(),
    Thruster(),
    Explosion(),
  ];

  return {
    engine: ({ doGameEngine }) => {
      sprites.forEach(doGameEngine);
    },
    render: ({ doGameRender }) => {
      sprites.forEach(doGameRender);
    },
  };
};

export default Intro;
