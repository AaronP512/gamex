function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var perf;
var cursors, movementKeys;
//var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS);//, '', { /*preload: preload, create: create, update: update*/ });
var sam;
var mia;
var cursors;
var belly;
var feet;
var clock;
var clock_hr;
var clock_min;


var otherplayer;

let treeClickCounter = 1;

var cursorSprite;
var cursorSprite;

var animals;


var connectedPlayers = [];

var worldScale = 1, nightfall;

var enviromentAlpha = 1;



var objs;

var players;


var clockCycleCount = 0;


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

        //animals = new Animals(game);
        //for(i = 0; i < 100; i++) animals.create();

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

        otherplayer = game.add.sprite(800, 400, 'gary');
        otherplayer.visible = false;
        otherplayer.enableBody = true;
        game.physics.arcade.enable(otherplayer);
        otherplayer.body.setSize(50, 42, 7, 15); //check

        otherplayer.animations.add('up',[104,105, 106, 107, 108, 109, 110, 111, 112],8,true);
        otherplayer.animations.add('left',[117,118,119,120,121,122,123,124,125],8,true);
        otherplayer.animations.add('down',[130,131,132,133,134,135,136,137,138],8,true);
        otherplayer.animations.add('right',[143,144,145,146,147,148,149,150,151],8,true);











        mia = game.add.sprite(0, 0, 'mia');
        mia.enableBody = true;
        mia.scale.setTo(1.5,1.5);
        game.physics.arcade.enable(mia);
        mia.body.setSize(50, 42, 7, 15); //check

        


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



        loadobjects(game);





        game.camera.x = game.camera.y = 100;
       
        mia.animations.add('up',[104,105, 106, 107, 108, 109, 110, 111, 112],8,true);
        mia.animations.add('left',[117,118,119,120,121,122,123,124,125],8,true);
        mia.animations.add('down',[130,131,132,133,134,135,136,137,138],8,true);
        mia.animations.add('right',[143,144,145,146,147,148,149,150,151],8,true);
        mia.animations.add('fight_up',[156,157,158,159,160,161],8,true);
        mia.animations.add('fight_left',[169,170,171,172,173,174],8,true);
        mia.animations.add('fight_down',[182,183,184,185,186,187],8,true);
        mia.animations.add('fight_right',[195,196,197,198,199,200],8,true);
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(mia);



        cursorSprite = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'pointers');
        //cursorSprite.visible = false;
        
       nightfall = game.add.tileSprite(-GameSettings.bounds, -GameSettings.bounds, GameSettings.bounds * 2, GameSettings.bounds * 2, 'night');
        nightfall.alpha = 0.1;
        new HUD(game);
// setTimeout(function() { animals.followenabled = true; }, 10000);








    //Move TO server everything below

        setInterval(function() { 
            if(enviromentAlpha == 1) {
                nightfall.alpha += 0.1;
                if(nightfall.alpha >= 0.95) enviromentAlpha = 0;
            } else {
                nightfall.alpha -= 0.1;
                if(nightfall.alpha <= 0.05) enviromentAlpha = 1;
            }
        }, 6000);

        clock = game.add.sprite(window.innerWidth - 150, 10, 'clock');
        clock.fixedToCamera = true;
        clock.scale.setTo(0.07, 0.07);

        clock_hr = game.add.sprite(window.innerWidth - 95, 65, 'hour');
        clock_hr.fixedToCamera = true;
        clock_hr.scale.setTo(0.07, 0.07);
        clock_hr.anchor.setTo(0.5, 0.5);
        clock_hr.rotation = 1.6;

        clock_min = game.add.sprite(window.innerWidth - 95, 65 , 'minute');
        clock_min.fixedToCamera = true;
        clock_min.scale.setTo(0.07, 0.07);
        clock_min.anchor.setTo(0.5, 0.5);
        

        
        setInterval(function() {  clock_hr.angle += 3; }, 500);
        setInterval(function() {  clock_min.angle += 3; }, 42); 
       
       

        players = new Players(game, mia);
    },  

    update:function update() {

        
        game.physics.arcade.collide(mia, feet);
      //  game.physics.arcade.overlap(sam, feet, function() { alert("boom"); }, null, this);

        game.physics.arcade.collide(mia, tomatoes);
        game.physics.arcade.overlap(mia, tomatoes, function() { alert("spooch"); }, null, this);
        //game.debug.cameraInfo(game.camera, 32, 32);

        
        cursorSprite.x = game.input.activePointer.x + game.camera.x;
        cursorSprite.y = game.input.mousePointer.y + game.camera.y;

        Movement.movementHandler(cursors, movementKeys, mia, 150);
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
       
        //animals.move();
        //animals.follow(sam);
       

        

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
    //console.log('Received a message from the server!',data);

    var cmd = data.split(" ");
    switch(cmd[0]) {
        case "ATT":
                console.log("Attacked by " + cmd[1]);
                players.processAttackOnMe(cmd[1]);
            
        break;
      case "PPOS":

      if(players) { players.updateData(cmd); }



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