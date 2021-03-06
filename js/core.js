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
var ponds;
var fires;
var pickups;



var otherplayer;

let treeClickCounter = 1;
let pondClickCounter = 1;

var cursorSprite;

var animals;


var connectedPlayers = [];

var worldScale = 1;


var objs;

var players;

var bloodOverlays = [];


var clockCycleCount = 0;


let playStateContext = null;

let playState = {
    create: function create() {
        playStateContext = this;
        
        game.add.plugin(Phaser.Plugin.Debug);
        this.game.canvas.style.cursor = "none";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = GameSettings.backgroundColor;
        game.world.setBounds(-GameSettings.bounds/2, -GameSettings.bounds/2, GameSettings.bounds, GameSettings.bounds);

        cursors = game.input.keyboard.createCursorKeys();
        movementKeys = Movement.getMovementKeys();
        
        this.playerStats = {
            myHealth: 100,
            mySanity: 100,
            myHunger: 100
        };
        
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


        this.accessDeniedSFX = game.add.audio('buzz');

        feet = game.add.group();
        feet.enableBody = true;

        pickups = game.add.group();
        pickups.enableBody = true;

        ponds = game.add.group();
        ponds.enableBody = true;

        fires = game.add.group();
        fires.enableBody = true;

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

        this.lakeoverlaygroup = game.add.group();
        this.lakeoverlaygroup.enableBody = true;
        

         ponds.inputEnableChildren = true;
        ponds.onChildInputOver.add(function(sprite) {
            cursorSprite.frame = 2;
            if(!isPlayerInRangeOfSprite(mia, sprite, 100)) cursorSprite.frame = 3;
        }, this);

        ponds.onChildInputOut.add(function(){
            this.game.canvas.style.cursor = "none";
            cursorSprite.frame = 0;
           // cursorSprite.body.setSize(45,0,45,0);
            }, this);

         ponds.onChildInputDown.add(function(sprite){
            if(!isPlayerInRangeOfSprite(mia, sprite, 100)) return playStateContext.accessDeniedSFX.play();
            
            if (!this.fishing || !this.fishing.isPlaying){

            this.fishing = sprite.animations.play("rip");
            sprite.animations.currentAnim.speed = 10;
            setTimeout(function(){

                if(pondClickCounter++ % (game.rnd.integerInRange(1, 9)) == 0) {
   
                    console.log("go fish");                    

                }

               sprite.animations.play("default");
            },1000);
            }

            //console.log("ponf");
            }, this);


        belly = game.add.group();
        belly.inputEnableChildren = true;
        belly.onChildInputOver.add(function(sprite) {
            //this.game.canvas.style.cursor = "move";
          //  cursorSprite.body.setSize(64,0,55,66);
            cursorSprite.frame = 1;

            if(!isPlayerInRangeOfSprite(mia, sprite, 20)) cursorSprite.frame = 3;


        }, this);

        belly.onChildInputOut.add(function(){
            this.game.canvas.style.cursor = "none";
            cursorSprite.frame = 0;
           // cursorSprite.body.setSize(45,0,45,0);
            }, this);



        

        
        belly.onChildInputDown.add(function (sprite) {
            if(!isPlayerInRangeOfSprite(mia, sprite, 20)) return playStateContext.accessDeniedSFX.play(); //alert("Out of Range brah."); 

            if(!treeCutTween || !treeCutTween.isRunning) {
                treeCutTween = game.add.tween(sprite).from({angle: -3}, 55, Phaser.Easing.Bounce.InOut, true, 0000, 1, true); //to(properties, duration, ease, autoStart, delay, repeat, yoyo);
                game.add.audio('chop').play();


                if(treeClickCounter++ % 5 == 0) {
   
                    game.add.tween(sprite.scale).to({x: 0.5, y: 0.5}, 2000, Phaser.Easing.Linear.Out, true, 0000, 1, false);
                    game.add.tween(sprite).to({alpha: 0}, 1000, Phaser.Easing.Linear.Out, true, 0000, 1, false); //to(properties, duration, ease, autoStart, delay, repeat, yoyo);
                    game.add.audio('chopdone').play();
                    setTimeout(function() { sprite.visible = false; }, 1000);

                    socket.emit('cut_tree', { treeid: sprite.z });

                }
                
            }
            
        }, this);



        





        game.camera.x = game.camera.y = 100;
       
        mia.animations.add('up',[104,105, 106, 107, 108, 109, 110, 111, 112],8,true);
        mia.animations.add('left',[117,118,119,120,121,122,123,124,125],8,true);
        mia.animations.add('down',[130,131,132,133,134,135,136,137,138],8,true);
        mia.animations.add('right',[143,144,145,146,147,148,149,150,151],8,true);
        mia.animations.add('fight_up',[156,157,158,159,160,161],8,true);
        mia.animations.add('fight_left',[169,170,171,172,173,174],8,true);
        mia.animations.add('fight_down',[182,183,184,185,186,187],8,true);
        mia.animations.add('fight_right',[195,196,197,198,199,200],8,true);

        game.camera.follow(mia);


        
        players = new Players(game, mia);


        /*
        *   Light Effects
        *
        *
        */
        

        this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);    // Create an object that will use the bitmap as a texture   
        this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);    // Set the blend mode to MULTIPLY. This will darken the colors of  everything below this sprite.    
        this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

        this.objectsThatRequireLight = [];

        loadobjects(game);



        ponds.forEach(function(sprite){
            var element_overlay = playStateContext.lakeoverlaygroup.create(sprite.x,sprite.y,sprite.key);
            element_overlay.frame = 6;
        });



        
// setTimeout(function() { animals.followenabled = true; }, 10000);







        

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


        


        bloodOverlays[0] = game.add.sprite(0, 0, 'blood-1');
        bloodOverlays[1] = game.add.sprite(0, 0, 'blood-2');
        bloodOverlays[2] = game.add.sprite(0, 0, 'blood-3');

        bloodOverlays[0].width = game.width;
        bloodOverlays[0].height = game.height;

        bloodOverlays[1].width = game.width;
        bloodOverlays[1].height = game.height;

        bloodOverlays[2].width = game.width;
        bloodOverlays[2].height = game.height;

        bloodOverlays[0].fixedToCamera = true;
        bloodOverlays[1].fixedToCamera = true;
        bloodOverlays[2].fixedToCamera = true;

        bloodOverlays[0].visible = false;
        bloodOverlays[1].visible = false;
        bloodOverlays[2].visible = false;


        //HUD over all other layers
        this.hud = new HUD(game, this.playerStats);

        //Inventory above others
        this.inventory = new Inventory(game);

        //Mouse over all other layers
        cursorSprite = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'pointers');
        
        this.preloadDone = true;
    },  

    update:function update() {

        this.lightSprite.reset(this.game.camera.x, this.game.camera.y);    
        this.updateShadowTexture();
          

        game.physics.arcade.collide(mia, feet);
        game.physics.arcade.collide(mia, ponds);
      //  game.physics.arcade.overlap(sam, feet, function() { alert("boom"); }, null, this);

        //game.physics.arcade.collide(mia, tomatoes);
        game.physics.arcade.overlap(pickups, mia, function(sprite, groupitem) {
            
            groupitem.visible = false;
            this.inventory.acquireItemFromLocation(groupitem.x, groupitem.y, 8);
          }, null, this);
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
        window.a = animals; //so I can run commands via terminal, remove this later not reqd
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

            let thiscontext = this;

            this.objectsThatRequireLight.forEach(function(data) {
                var objectX = data.x - thiscontext.game.camera.x + data.width/2;
                var objectY = data.y - thiscontext.game.camera.y + data.height/2;   
                var gradient =   thiscontext.shadowTexture.context.createRadialGradient(objectX, objectY, 100 * 0.75, objectX, objectY, radius);   
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');    
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');    
                thiscontext.shadowTexture.context.beginPath();    
                thiscontext.shadowTexture.context.fillStyle = gradient;    
                thiscontext.shadowTexture.context.arc(objectX, objectY, radius, 0, Math.PI*2, false);    
                thiscontext.shadowTexture.context.fill();    // This just tells the engine it should update the texture cache    
                thiscontext.shadowTexture.dirty = true;

            }); 


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
        if(time >= 4*60 && time < 5*60) this.rgb = '70, 70, 70';
        if(time >= 5*60 && time < 6*60) this.rgb = '100, 100, 100';
        if(time >= 6*60 && time < 7*60) this.rgb = '130, 130, 130';
        if(time >= 7*60 && time < 9*60) this.rgb = '150, 150, 150';
        if(time >= 9*60 && time < 12*60) this.rgb = '200, 200, 200';
        if(time >= 12*60 && time < 16*60) this.rgb = '255, 255, 255';
        if(time >= 16*60 && time < 18*60) this.rgb = '190, 150, 150';
        if(time >= 18*60 && time < 19*60) this.rgb = '140, 140, 160';
        if(time >= 19*60 && time < 20*60) this.rgb = '110, 110, 110';
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
                playState.playerStats.myHealth = parseInt(cmd[2]);
                players.processAttackOnMe(cmd[1]);
                console.log("My Current Health = " + playState.playerStats.myHealth); 

                playState.hud.updateHealth(playState.playerStats.myHealth);  

                console.log("cool");

                if(playState.playerStats.myHealth < 30) {
                    bloodOverlays[0].visible = true;
                }
                if(playState.playerStats.myHealth < 20) {
                    bloodOverlays[1].visible = true;
                }
                if(playState.playerStats.myHealth < 10) {
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
    //console.log("TIME: " + time);
    playState.updateGameClock(time);
        
});


socket.on('trees_cut_down', function(trees) {

    if(!playState.preloadDone) return;
    //console.log(trees);
   
    belly.forEach(function(item) {
        //console.log("Comparing " + item.z);
        if(trees.indexOf(item.z) != -1) {
            //console.log("Disabling " + item.z);
            item.visible = false;
        }
    }); 

});





socket.on('attack_ack',function(data) {
    console.log("Attacked by " + data.by);
    playState.playerStats.myHealth = parseInt(data.hp);
    players.processAttackOnMe(data.by);
    console.log("My Current Health = " + playState.playerStats.myHealth);   

    playState.hud.updateHealth(playState.playerStats.myHealth);


    if(playState.playerStats.myHealth < 30) {
        bloodOverlays[0].visible = true;
    }
    if(playState.playerStats.myHealth < 20) {
        bloodOverlays[1].visible = true;
    }
    if(playState.playerStats.myHealth < 10) {
        bloodOverlays[2].visible = true;
    }
});




socket.on('player_quit', function(player) {
    console.log("Bye " + player.id);
    players.destroyPlayer(player.id);
});


/* animals */

socket.on('animal_create', function(data) {
    if(!playState.preloadDone) return;
    animals.create(data.type, data.id, data.h);
});
socket.on('animal_update', function(data) {
    if(!playState.preloadDone) return;
    animals.update(data);
});


// Sends a message to the server via sockets
function sendMessageToServer(message) {
    socket.send(message);
}