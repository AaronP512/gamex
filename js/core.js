function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var perf;
var cursors, movementKeys;
//var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS);//, '', { /*preload: preload, create: create, update: update*/ });
var sam; var cursors;
var belly;
var feet;

var otherplayer;

let treeClickCounter = 1;

var cursorSprite;
var cursorSprite;

var animals;



var worldScale = 1, nightfall;

var enviromentAlpha = 1;

let playState = {
    create: function create() {
        game.add.plugin(Phaser.Plugin.Debug);
        this.game.canvas.style.cursor = "none";

        game.physics.startSystem(Phaser.Physics.ARCADE);


        game.stage.backgroundColor = GameSettings.backgroundColor;
        game.world.setBounds(-GameSettings.bounds/2, -GameSettings.bounds/2, GameSettings.bounds, GameSettings.bounds);

        cursors = game.input.keyboard.createCursorKeys();
        movementKeys = Movement.getMovementKeys();
        
 
        game.add.tileSprite(-GameSettings.bounds, -GameSettings.bounds, GameSettings.bounds * 2, GameSettings.bounds * 2, 'grass');
         
        //sound = game.add.audio('theme').play();
        //sound.loop = true;

        animals = new Animals(game);
        for(i = 0; i < 100; i++) animals.create();

        caves = game.add.group();
        caves.inputEnableChildren = true;

        cave = caves.create(1000, 400, 'cave_e');
        caves.onChildInputDown.add(function(sprite) { 
            //console.log("lol"); 
            
            game.state.start("test");
            
        }, this);

        feet = game.add.group();
        feet.enableBody = true;

        tomatoes = game.add.group();
        tomatoes.enableBody = true;

        otherplayer = game.add.sprite(800, 400, 'sams');
        otherplayer.visible = false;
        otherplayer.enableBody = true;
        game.physics.arcade.enable(otherplayer);
        otherplayer.body.setSize(50, 42, 7, 15); //check

        otherplayer.animations.add('up',[0,1,2,3,4,5,6,7,8],8,true);
        otherplayer.animations.add('left',[9,10,11,12,13,14,15,16,17],8,true);
        otherplayer.animations.add('down',[18,19,20,21,22,23,24,25,26],8,true);
        otherplayer.animations.add('right',[27,28,29,30,31,32,33,34,35],8,true);



        sam = game.add.sprite(800, 400, 'sams');
        sam.enableBody = true;
        sam.scale.setTo(1.5,1.5);
        game.physics.arcade.enable(sam);
        sam.body.setSize(50, 42, 7, 15); //check

        belly = game.add.group();
        belly.inputEnableChildren = true;
        belly.onChildInputOver.add(function() {
            //this.game.canvas.style.cursor = "move";
          //  cursorSprite.body.setSize(64,0,55,66);
            cursorSprite.frame = 1;
        }, this);

        belly.onChildInputOut.add(function(){
            this.game.canvas.style.cursor = "none";
            cursorSprite.frame = 0;
           // cursorSprite.body.setSize(45,0,45,0);
            }, this);

        
        belly.onChildInputDown.add(function (sprite) {
            if(!treeCutTween || !treeCutTween.isRunning) {
                treeCutTween = game.add.tween(sprite).from({angle: -3}, 55, Phaser.Easing.Bounce.InOut, true, 0000, 1, true); //to(properties, duration, ease, autoStart, delay, repeat, yoyo);
                game.add.audio('chop').play();


                if(treeClickCounter++ % 5 == 0) {
                    /* LOL
                    emitter = game.add.emitter(0, 0, 0);
                    emitter.makeParticles('smoke');
                    emitter.setScale(0.4, 2, 0.4, 2, 6000, Phaser.Easing.Quintic.Out);
                    emitter.gravity = -100;
                    emitter.emitX = sprite.position.x;
                    emitter.emitY = sprite.position.y - 50;
                    emitter.start(true, 2000, null, 10);
                    */
                    game.add.tween(sprite.scale).to({x: 0.5, y: 0.5}, 2000, Phaser.Easing.Linear.Out, true, 0000, 1, false);
                    game.add.tween(sprite).to({alpha: 0}, 1000, Phaser.Easing.Linear.Out, true, 0000, 1, false); //to(properties, duration, ease, autoStart, delay, repeat, yoyo);
                    game.add.audio('chopdone').play();
                    setTimeout(function() { sprite.visible = false; }, 1000);
                }
                
            }
            
        }, this);


        for(y = -GameSettings.bounds; y < GameSettings.bounds; y += 250 ) {

            var x = Math.random() * 2e3;
            var pond = feet.create(x , y, 'pond-a');
            pond.scale.x = pond.scale.y = 0.5;
            pond.body.immovable = true;

            for(x2 = 0; x2 < 3; x2++) {

                var x = Math.random() * 2e3;
                var bark = feet.create(x , y, 'tree_foot');
                bark.body.setSize(30, 2, 21, 0); //check
                bark.body.immovable = true;

                var abelly = belly.create(x + 30, y + 30, 'tree_belly');
                abelly.anchor.setTo(0.5, 0.8);

            /*
            var x = Math.random() * 2e3;
            //let y = Math.random() * 2e3;
            var bark = feet.create(x , y, 'tree_foot');
            bark.body.setSize(30, 2, 21, 0); //check
            bark.body.immovable = true;
            //foot.body.immovable = false;
            //game.add.sprite(x - 60, y - 170, 'tree_belly');
            var abelly = belly.create(x + 30 , y + 30, 'tree_belly');
            abelly.anchor.setTo(0.5, 0.8);

            var x = Math.random() * 2e3 *-1;
            var bark = feet.create(x , y, 'tree_foot');
            bark.body.setSize(30, 2, 21, 0); //check
            bark.body.immovable = true;
            var abelly = belly.create(x + 30, y + 30, 'tree_belly');
            abelly.anchor.setTo(0.5, 0.8);
            */

            }
        }

        for(y = -GameSettings.bounds; y < GameSettings.bounds; y += 250 ) {
            var x = Math.random() * 2e3;
            //let y = Math.random() * 2e3;
            var plant = tomatoes.create(x , y, 'tomato');
            //plant.scale.setTo(0.16,0.16);
            plant.body.setSize(30, 2, 21, 0); //check
            plant.body.immovable = true;
                                  
        }
        
        game.camera.x = game.camera.y = 100;
       
        sam.animations.add('up',[0,1,2,3,4,5,6,7,8],8,true);
        sam.animations.add('left',[9,10,11,12,13,14,15,16,17],8,true);
        sam.animations.add('down',[18,19,20,21,22,23,24,25,26],8,true);
        sam.animations.add('right',[27,28,29,30,31,32,33,34,35],8,true);
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(sam);



        cursorSprite = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'pointers');
        //cursorSprite.visible = false;
        
       nightfall = game.add.tileSprite(-GameSettings.bounds, -GameSettings.bounds, GameSettings.bounds * 2, GameSettings.bounds * 2, 'night');
        nightfall.alpha = 0.1;
        new HUD(game);
// setTimeout(function() { animals.followenabled = true; }, 10000);


        setInterval(function() { 
            if(enviromentAlpha == 1) {
                nightfall.alpha += 0.1;
                if(nightfall.alpha >= 0.95) enviromentAlpha = 0;
            } else {
                nightfall.alpha -= 0.1;
                if(nightfall.alpha <= 0.05) enviromentAlpha = 1;
            }
        }, 60000);

        clock = game.add.sprite(window.innerWidth - 128, 0, 'clock');
        clock.fixedToCamera = true;
        clock.scale.setTo(0.07, 0.07);

    },  

    update:function update() {
        
        game.physics.arcade.collide(sam, feet);
        game.physics.arcade.overlap(sam, feet, function() { alert("boom"); }, null, this);

        game.physics.arcade.collide(sam, tomatoes);
        game.physics.arcade.overlap(sam, tomatoes, function() { alert("spooch"); }, null, this);
        //game.debug.cameraInfo(game.camera, 32, 32);

        
        cursorSprite.x = game.input.activePointer.x + game.camera.x;
        cursorSprite.y = game.input.mousePointer.y + game.camera.y;

        Movement.movementHandler(cursors, movementKeys, sam, 150);
        game.debug.text(game.time.fps + "fps, "+ game.time.elapsed + " ms. Min: " + game.time.fpsMin + " Max:" + game.time.fpsMax , 2, 14, "#00ff00");


        if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
            worldScale -= 0.005;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            worldScale += 0.005;
        } 
        else if (game.input.keyboard.isDown(Phaser.Keyboard.C)) {
            worldScale = 1;
        }
        game.world.scale.set(worldScale);
       
        animals.move();
        animals.follow(sam);
       

        

    }
};





game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.add('test', testState);
game.state.start("boot");


socket.on('connect',function() {
            console.log('Client has connected to the server!');
});
// Add a connect listener
socket.on('message',function(data) {
    console.log('Received a message from the server!',data);

    var cmd = data.split(" ");
    switch(cmd[0]) {
      case "PPOS": 
        if(otherplayer) {
            otherplayer.x = parseInt(cmd[2]);
            otherplayer.y = parseInt(cmd[3]);

            otherplayer.body.velocity.x = parseInt(cmd[4]);
            otherplayer.body.velocity.y = parseInt(cmd[5]);

            otherplayer.visible = true;

            otherplayer.animations.play(cmd[6]);
        }
        
        break;
      
    }

});
// Add a disconnect listener
socket.on('disconnect',function() {
    console.log('The client has disconnected!');
});

// Sends a message to the server via sockets
function sendMessageToServer(message) {
    socket.send(message);
}