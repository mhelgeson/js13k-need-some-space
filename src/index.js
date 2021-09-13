import loop from "./util/loop";
import Game from "./Game";

function main() {
  const game = Game();

  // engine loop ~200fps
  loop(game.engine, 1000 / 200);

  // render loop ~60fps
  loop(game.render);
}

main();
