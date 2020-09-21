enchant();
window.onload = function () {
  var game = new Game(160, 144);
  game.fps = 12;
  game.keybind(32, 'a');
  game.keybind(8, 'b');

  game.preload('home.png', 'gfx/town_map.png', 'gfx/town_map_cursor.png');
  game.onload = function () {
    var map = new Map(8, 8);
    map.image = game.assets['gfx/town_map.png'];
    map.loadData(town_map);

    var scene = new Scene();
    scene.addChild(map);

    var cursor = new Sprite(16, 16);
    var image = new Surface(32, 16);
    image.draw(game.assets['gfx/town_map_cursor.png']);
    cursor.image = image;

    cursor.addEventListener('enterframe', function () {
      let frame = game.frame % game.fps;
      if (frame == 0 || frame == 1 || frame == 2) {
        this.frame = 0;
      } else {
        this.frame = 1;
      }

      if (game.input.left) {
        this.x -= 4;
      } else if (game.input.right) {
        this.x += 4;
      } else if (game.input.up) {
        this.y -= 4;
      } else if (game.input.down) {
        this.y += 4;
      }
    })

    game.addEventListener('enterframe', function () {
      if (game.input.a) {
        stage.addChild(map);
        stage.addChild(cursor);
      }
      if (game.input.b) {
        stage.removeChild(map);
        stage.removeChild(cursor);
      }
    })

    scene.backgroundColor = 'black';

    var pad = new Pad();
    pad.y = game.height - pad.height;

    console.log(`screen width = ${window.screen.width}, screen height = ${window.screen.height}`)

    console.log(game.x)

    /*
    x = window.screen.width / window.screen.height;
    g = game.width / game.height;
    console.log(`x = ${x}, g = ${g}`);

    /*
    if (x >= g) {
      pad.y = game.height - pad.height;
    } else {
      let delta = window.screen.height - window.screen.width * g;
      console.log('delta = ' + delta)
      pad.y = delta;
      // pad.y = game.height - delta;
    }
    */

    var stage = new Group();
    stage.addChild(map);
    stage.addChild(cursor);

    // game.pushScene(scene);

    game.rootScene.addChild(stage);
    game.rootScene.addChild(pad);
  }
  game.start();
}
