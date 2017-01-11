

var cursors;


var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('tree', 'assets/tree.png');
    game.load.image('grass', 'assets/grass.png'); 

}

function create() {
    
    game.stage.backgroundColor = '#00ff60';
    game.world.setBounds(-50000, -50000, 100000, 100000);
    cursors = game.input.keyboard.createCursorKeys();
    abox();

    

    

    for(i = 0; i < 100000; i += 960) {
         for(j = 0; j < 100000; j += 960) {
            game.add.sprite(i, j, 'grass');
        }
    }
    
    for(i = 0; i < 2000; i++ ) {
        game.add.sprite(i * 200, i * 200, 'tree');
        
    }
    game.camera.x = game.camera.y = 100;

    
}

function update() {
    
    movementHandler();
    game.debug.cameraInfo(game.camera, 32, 32);

    //game.camera.x++;
}







function abox() {
    var graphics = game.add.graphics(100, 100);
    graphics.beginFill(0xFF0000);
    graphics.lineStyle(3, 0xffd900, 1);
    graphics.drawRect(-164, -164, 164, 164);
    return graphics;

}



function movementHandler() {

    game.camera.y -= cursors.up.isDown ? 4 : 0;
    game.camera.y += cursors.down.isDown ? 4 : 0;
    game.camera.x -= cursors.left.isDown ? 4 : 0;
    game.camera.x += cursors.right.isDown ? 4 : 0;

}