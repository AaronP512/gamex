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




var otherplayer;

let treeClickCounter = 1;

var cursorSprite;
var cursorSprite;

var animals;


var connectedPlayers = [];

var worldScale = 1;


var objs;

var players;

var bloodOverlays = [];


var clockCycleCount = 0;

var myHealth = 100;


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
            if(!isPlayerInRangeOfSprite(mia, sprite, 20)) return alert("Out of Range brah."); 

            if(!treeCutTween || !treeCutTween.isRunning) {
                treeCutTween = game.add.tween(sprite).from({angle: -3}, 55, Phaser.Easing.Bounce.InOut, true, 0000, 1, true); //to(properties, duration, ease, autoStart, delay, repeat, yoyo);
                game.add.audio('chop').play();


                if(treeClickCounter++ % 5 == 0) {
   
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



        

        
        //nightfall = game.add.tileSprite(-GameSettings.bounds, -GameSettings.bounds, GameSettings.bounds * 2, GameSettings.bounds * 2, 'night');
        //nightfall.alpha = 0.1;






        this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);    // Create an object that will use the bitmap as a texture   
        this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);    // Set the blend mode to MULTIPLY. This will darken the colors of  everything below this sprite.    
        this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;










        
// setTimeout(function() { animals.followenabled = true; }, 10000);








    //Move TO server everything below

        

        this.clock = game.add.sprite(window.innerWidth - 150, 10, 'clock');
        this.clock.fixedToCamera = true;
        this.clock.scale.setTo(0.07, 0.07);

        this.clock_hr = game.add.sprite(window.innerWidth - 95, 65, 'hour');
        this.clock_hr.fixedToCamera = true;
        this.clock_hr.scale.setTo(0.07, 0.07);
        this.clock_hr.anchor.setTo(0.5, 0.5);
        this.clock_hr.angle = 0;
        //this.clock_hr.rotation = 1.6;

        this.clock_min = game.add.sprite(window.innerWidth - 95, 65 , 'minute');
        this.clock_min.fixedToCamera = true;
        this.clock_min.scale.setTo(0.07, 0.07);
        this.clock_min.anchor.setTo(0.5, 0.5);
        this.clock_min.angle = 0;


        
        players = new Players(game, mia);


        bloodOverlays[0] = game.add.sprite(0, 0, 'blood-1');
        bloodOverlays[1] = game.add.sprite(0, 0, 'blood-2');
        bloodOverlays[2] = game.add.sprite(0, 0, 'blood-3');

        bloodOverlays[0].fixedToCamera = true;
        bloodOverlays[1].fixedToCamera = true;
        bloodOverlays[2].fixedToCamera = true;

        bloodOverlays[0].visible = false;
        bloodOverlays[1].visible = false;
        bloodOverlays[2].visible = false;


        //HUD over all other layers
        new HUD(game);

        //Mouse over all other layers
        cursorSprite = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'pointers');
        
        this.preloadDone = true;
    },  

    update:function update() {

        this.lightSprite.reset(this.game.camera.x, this.game.camera.y);    
        this.updateShadowTexture();
          

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
       
        animals.move();
        window.a = animals;
        //animals.follow(sam);
       

        

    },
    updateShadowTexture: function(){    // Draw shadow   
            this.shadowTexture.context.fillStyle = 'rgb(' + this.rgb + ')';   
            this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);   
            var radius = 100 + this.game.rnd.integerInRange(1,10),        
            heroX = (mia.x + 96/2) - this.game.camera.x,        
            heroY = (mia.y + 96/2) - this.game.camera.y;       // Draw circle of light with a soft edge    
            
            
            var gradient =   this.shadowTexture.context.createRadialGradient(            heroX, heroY, 100 * 0.75,            heroX, heroY, radius);   
             gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');    
             gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');    
             this.shadowTexture.context.beginPath();    
             this.shadowTexture.context.fillStyle = gradient;    
             this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI*2, false);    
             this.shadowTexture.context.fill();    // This just tells the engine it should update the texture cache    
             this.shadowTexture.dirty = true;
    },

    updateGameClock: function (time) {
        if(!this.preloadDone) return;

        let minute_of_day = time;
        let minute_hand_rotation = ((minute_of_day % 60) / 60 ) * 360;
        let hour_hand_rotation = ((((minute_of_day % 3600) / 60) % 12) / 12) * 360;

        this.clock_min.angle = minute_hand_rotation;
        this.clock_hr.angle = hour_hand_rotation;

        this.rgb = '10, 10, 10';
        if(time < 4*60) this.rgb = '10, 10, 10';
        if(time >= 4*60 && time < 6*60) this.rgb = '110, 110, 110';
        if(time >= 6*60 && time < 9*60) this.rgb = '150, 150, 150'
        if(time >= 9*60 && time < 16*60) this.rgb = '255, 255, 255'
        if(time >= 16*60 && time < 18*60) this.rgb = '190, 150, 150'
        if(time >= 18*60 && time < 20*60) this.rgb = '110, 110, 110'
        if(time >= 20*60) this.rgb = '10, 10, 10';

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
                myHealth = parseInt(cmd[2]);
                players.processAttackOnMe(cmd[1]);
                console.log("My Current Health = " + myHealth);   

                if(myHealth < 30) {
                    bloodOverlays[0].visible = true;
                }
                if(myHealth < 20) {
                    bloodOverlays[1].visible = true;
                }
                if(myHealth < 10) {
                    bloodOverlays[2].visible = true;
                }
            
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


socket.on('time',function(time) {
    console.log("TIME: " + time);
    playState.updateGameClock(time);
        
});



socket.on('attack_ack',function(data) {
    console.log("Attacked by " + data.by);
    myHealth = parseInt(data.hp);
    players.processAttackOnMe(data.by);
    console.log("My Current Health = " + myHealth);   

    if(myHealth < 30) {
        bloodOverlays[0].visible = true;
    }
    if(myHealth < 20) {
        bloodOverlays[1].visible = true;
    }
    if(myHealth < 10) {
        bloodOverlays[2].visible = true;
    }
});




/* animals */

socket.on('animal_create', function(data) {
    if(!playState.preloadDone) return;
    animals.create(data.type, data.id);
});
socket.on('animal_update', function(data) {
    if(!playState.preloadDone) return;
    animals.update(data);
});


// Sends a message to the server via sockets
function sendMessageToServer(message) {
    socket.send(message);
}