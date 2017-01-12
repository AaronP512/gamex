
var perf;
var cursors, movementKeys;


var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('tree', 'assets/tree.png');
    game.load.image('grass', 'assets/grass.png'); 
    game.load.spritesheet('sams','assets/sam.png',64,64,36);
    game.time.advancedTiming = true;
}

var sam;
var cursors;

function create() {

    
    game.stage.backgroundColor = '#00ff60';
    game.world.setBounds(-50000, -50000, 100000, 100000);
    cursors = game.input.keyboard.createCursorKeys();
    abox();



    
    movementKeys = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    

    for(i = -50000; i < 50000; i += 960) {
         for(j = -50000; j < 50000; j += 960) {
            game.add.sprite(i, j, 'grass');
        }
    }
    
    for(i = 0; i < 2000; i++ ) {
        game.add.sprite(i * 200, i * 200, 'tree');
        
    }
    game.camera.x = game.camera.y = 100;

     sam = game.add.sprite(800, 400, 'sams');
            sam.enableBody = true;

            sam.scale.setTo(1.5,1.5);

            game.physics.arcade.enable(sam);

            sam.animations.add('up',[0,1,2,3,4,5,6,7,8],8,true);
            sam.animations.add('left',[9,10,11,12,13,14,15,16,17],8,true);
            sam.animations.add('down',[18,19,20,21,22,23,24,25,26],8,true);
            sam.animations.add('right',[27,28,29,30,31,32,33,34,35],8,true);

            cursors = game.input.keyboard.createCursorKeys();

}

function update() {
    
    movementHandler();
    //game.debug.cameraInfo(game.camera, 32, 32);

    //game.camera.x++;

    game.debug.text(game.time.fps + "fps, "+ game.time.elapsed + " ms. Min: " + game.time.fpsMin + " Max:" + game.time.fpsMax , 2, 14, "#00ff00");


    sam.body.velocity.x = 0;
            sam.body.velocity.y = 0;
            
                if(cursors.right.isDown){

                        sam.body.velocity.x = 250;
                        sam.animations.play('right');

                }


                else if (cursors.up.isDown)
                {
                    //  Move to the left
                    sam.body.velocity.y = -250;

                    sam.animations.play('up');
                }
                
                else if (cursors.down.isDown)
                {
                    //  Move to the left
                    sam.body.velocity.y = 250;
                    sam.animations.play('down');

                    //player.animations.play('left');
                }

                else if (cursors.left.isDown)
                {
                    //  Move to the left
                    sam.body.velocity.x = -250;
                    sam.animations.play('left');

                    //player.animations.play('left');
                }

               /* 
adding provisions for diagonal movements -- simultaneous execution needs to be checked

               else if(cursors.right.isDown && cursors.up.isDown){

                        sam.body.velocity.x = 250;
                        sam.body.velocity.y = -250;
                        sam.animations.play('right');
                        sam.animations.play('up');

                }*/


                 else
                {
                    //  Stand still
                    sam.animations.stop();

                    sam.frame = 20;
                }

    
}







function abox() {
    var graphics = game.add.graphics(100, 100);
    graphics.beginFill(0xFF0000);
    graphics.lineStyle(3, 0xffd900, 1);
    graphics.drawRect(-164, -164, 164, 164);
    return graphics;

}



function movementHandler() {

    game.camera.y -= cursors.up.isDown || movementKeys.up.isDown ? 4 : 0;
    game.camera.y += cursors.down.isDown || movementKeys.down.isDown ? 4 : 0;
    game.camera.x -= cursors.left.isDown || movementKeys.left.isDown ? 4 : 0;
    game.camera.x += cursors.right.isDown || movementKeys.right.isDown ? 4 : 0;

}