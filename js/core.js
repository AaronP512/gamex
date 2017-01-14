
var perf;
var cursors, movementKeys;
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);//, '', { /*preload: preload, create: create, update: update*/ });
var sam; var cursors;
var belly;
var feet;
let playState = {
    create: function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);


        game.stage.backgroundColor = GameSettings.backgroundColor;
        game.world.setBounds(-GameSettings.bounds/2, -GameSettings.bounds/2, GameSettings.bounds, GameSettings.bounds);

        cursors = game.input.keyboard.createCursorKeys();
        movementKeys = Movement.getMovementKeys();
        
 
        game.add.tileSprite(-GameSettings.bounds, -GameSettings.bounds, GameSettings.bounds * 2, GameSettings.bounds * 2, 'grass');
         
        

        feet = game.add.group();
        feet.enableBody = true;

        tomatoes = game.add.group();
        tomatoes.enableBody = true;

        sam = game.add.sprite(800, 400, 'sams');
        sam.enableBody = true;
        sam.scale.setTo(1.5,1.5);
        game.physics.arcade.enable(sam);
        sam.body.setSize(50, 42, 7, 15); //check

        belly = game.add.group();

        for(y = -GameSettings.bounds; y < GameSettings.bounds; y += 250 ) {
            var x = Math.random() * 2e3;
            //let y = Math.random() * 2e3;
            var bark = feet.create(x , y, 'tree_foot');
            bark.body.setSize(30, 2, 21, 0); //check
            bark.body.immovable = true;
            //foot.body.immovable = false;
            //game.add.sprite(x - 60, y - 170, 'tree_belly');
            belly.create(x - 60, y - 170, 'tree_belly');

            var x = Math.random() * 2e3 *-1;
            var bark = feet.create(x , y, 'tree_foot');
            bark.body.setSize(30, 2, 21, 0); //check
            bark.body.immovable = true;
            belly.create(x - 60, y - 170, 'tree_belly');
            
        }

        for(y = -GameSettings.bounds; y < GameSettings.bounds; y += 250 ) {
            var x = Math.random() * 2e3;
            //let y = Math.random() * 2e3;
            var plant = tomatoes.create(x , y, 'tomato');
            plant.scale.setTo(0.16,0.16);
            //plant.body.setSize(30, 2, 21, 0); //check
            plant.body.immovable = true;
                                  
        }
        
        game.camera.x = game.camera.y = 100;
       
                sam.animations.add('up',[0,1,2,3,4,5,6,7,8],8,true);
                sam.animations.add('left',[9,10,11,12,13,14,15,16,17],8,true);
                sam.animations.add('down',[18,19,20,21,22,23,24,25,26],8,true);
                sam.animations.add('right',[27,28,29,30,31,32,33,34,35],8,true);
                cursors = game.input.keyboard.createCursorKeys();
                game.camera.follow(sam);
    },

    update:function update() {
        
        game.physics.arcade.collide(sam, feet);
        game.physics.arcade.overlap(sam, feet, function() { alert("boom"); }, null, this);

        game.physics.arcade.collide(sam, tomatoes);
        game.physics.arcade.overlap(sam, tomatoes, function() { alert("spooch"); }, null, this);
        //game.debug.cameraInfo(game.camera, 32, 32);

        
        
        Movement.movementHandler(cursors, movementKeys, sam);
        game.debug.text(game.time.fps + "fps, "+ game.time.elapsed + " ms. Min: " + game.time.fpsMin + " Max:" + game.time.fpsMax , 2, 14, "#00ff00");
        
    }
};





game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('play', playState);
game.state.start("boot");