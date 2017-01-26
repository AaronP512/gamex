
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var perf;
var cursors, movementKeys;
var game = new Phaser.Game(window.innerWidth - 128, window.innerHeight - 128, Phaser.AUTO);//, '', { /*preload: preload, create: create, update: update*/ });
var sam; 
var cursors;
var belly;
var feet;

let treeClickCounter = 1;

var cursorSprite;
var posText;

var placeableObjects = [];
var currentPlaceableObject = 0;


var placedObjects = [];
var bellyList = [];

var depend_tree;

var placedGroup, bellies;

var worldScale = 1;

var spriteCounter = 0;

let playState = {
    preload:function preload(){
        //og
        game.load.image('tree_belly', 'assets/tre.png');
        game.load.image('tree_foot', 'assets/bark.png');
        game.load.image('grass', 'assets/grass.png');
        game.load.image('tomato', 'assets/Tomato_lay.png');
        game.load.image('smoke', 'assets/smoke-puff.png');
        game.load.spritesheet('pond-a', 'assets/pond-a_lay_sp.png', 813/3, 124, 3);
        game.load.image('pond-b', 'assets/pond-b_lay.png');
        game.load.image('night', 'assets/night2.png');
        
        //caves
        game.load.image('cave_e', 'assets/cave_e.png');
        game.load.image('cave_1', 'assets/cave_1.png');
        game.load.image('cave_2', 'assets/cave_2.png');
        game.load.image('cave_3', 'assets/cave_3.png');
        game.load.image('cave_4', 'assets/cave_4.png');
        game.load.image('cave_5', 'assets/cave_5.png');
        game.load.image('cave_6', 'assets/cave_6.png');
        game.load.image('cave_7', 'assets/cave_7.png');
        

        //blood
        game.load.image('blood-1', 'assets/death/blood1.png');
        game.load.image('blood-2', 'assets/death/blood2.png');
        game.load.image('blood-3', 'assets/death/blood3.png');

        //home
        game.load.image('house-1', 'assets/homes/house2.png');
        game.load.image('house-2', 'assets/homes/house3.png');
        game.load.image('house-3', 'assets/homes/house4.png');
        game.load.image('house', 'assets/House.png');

        //watch
        game.load.image('clock', 'assets/clock.png'); 
        game.load.image('hour', 'assets/hour.png'); 
        game.load.image('minute', 'assets/minute.png');        

        /* Animals */
        game.load.spritesheet('catsx', 'assets/cats.png', 48, 48, 12 * 9);
        game.load.spritesheet('rap', 'assets/monster2.png', 77.6, 54.6, 6 * 8);

        // characters
        game.load.spritesheet('sams', 'assets/sam.png', 64, 64, 36); //64,64 old values
        game.load.spritesheet('mia', 'assets/chars/mia.png', 64, 64.1, 273);
        game.load.spritesheet('gary', 'assets/chars/gary.png', 64, 64, 273); //64,64 old values
        game.load.spritesheet('echo','assets/chars/echo.png',64, 64, 273);
        game.load.spritesheet('friar','assets/chars/friar.png',64, 64, 273);
        game.load.spritesheet('friarf','assets/chars/friarf.png',64, 64, 273);
        game.load.spritesheet('peter','assets/chars/peter.png',64, 64, 273);
        game.load.spritesheet('winthy','assets/chars/winthy.png',64, 64, 273);
        game.load.spritesheet('winthy2','assets/chars/winthy2.png',64, 64, 273);
        game.load.spritesheet('suitman','assets/sprites.png',64, 64, 36);
        game.time.advancedTiming = true;


        //audio
        game.load.audio('chop', ['assets/sfx/chop.mp3', '']);
        game.load.audio('chopdone', ['assets/sfx/chopdone.mp3', '']);
        game.load.audio('theme', ['assets/sfx/theme.mp3', '']);

        /* HUD */
        game.load.image('health', 'assets/hud/health.png');
        game.load.image('hunger', 'assets/hud/hunger.png');
        game.load.image('mental', 'assets/hud/mental.png');

        /* Pointers */
        game.load.image('pointer_axe', 'assets/pointers/axe.png');
        game.load.spritesheet('pointers', 'assets/pointers/pointersprite.png', 64, 64, 4);
        //flowers
        game.load.image('flower1', 'assets/flower1.png');
        game.load.image('flower2', 'assets/flower2.png');
        game.load.image('flower3', 'assets/flower3.png');
        game.load.image('flower4', 'assets/flower4.png');
        game.load.image('flower5', 'assets/flower5.png');


    },
    create: function create() {
        game.add.plugin(Phaser.Plugin.Debug);
        this.game.canvas.style.cursor = "none";

        game.physics.startSystem(Phaser.Physics.ARCADE);


        game.stage.backgroundColor = GameSettings.backgroundColor;
        game.world.setBounds(-GameSettings.bounds/2, -GameSettings.bounds/2, GameSettings.bounds, GameSettings.bounds);

        cursors = game.input.keyboard.createCursorKeys();
        movementKeys = Movement.getMovementKeys();
        
 
        game.add.tileSprite(-GameSettings.bounds, -GameSettings.bounds, GameSettings.bounds * 2, GameSettings.bounds * 2, 'grass');
         



        sam = game.add.sprite(0, 0, 'sams');
        sam.enableBody = true;
        sam.scale.setTo(1.5,1.5);
        game.physics.arcade.enable(sam);
        sam.body.setSize(50, 42, 7, 15); //check

        


       
        sam.animations.add('up',[0,1,2,3,4,5,6,7,8],8,true);
        sam.animations.add('left',[9,10,11,12,13,14,15,16,17],8,true);
        sam.animations.add('down',[18,19,20,21,22,23,24,25,26],8,true);
        sam.animations.add('right',[27,28,29,30,31,32,33,34,35],8,true);
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(sam);



        cursorSprite = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'pointers');


        posText = game.add.text(0, 0, "POS HERE", { font: "12px Arial", fill: "#ff0044", align: "center" });
       

        depend_tree = game.add.sprite(0, 0, 'tree_belly');

 
        placeableObjects.push(game.add.sprite(0, 0, 'tree_foot'));
        placeableObjects.push(game.add.sprite(0, 0, 'tomato'));
        placeableObjects.push(game.add.sprite(0, 0, 'pond-a'));
        placeableObjects.push(game.add.sprite(0, 0, 'pond-b'));

        placedGroup = game.add.group();
        bellies = game.add.group();
        bellies.inputEnableChildren = true;
        placedGroup.inputEnableChildren = true;

        game.input.mouse.mouseWheelCallback =  function (event) {   
          
          
            
           if(game.input.mouse.wheelDelta == -1) {
               if(currentPlaceableObject > 0) {
                   currentPlaceableObject--;
               }
           } else {
               if(currentPlaceableObject < placeableObjects.length - 1) {
                   currentPlaceableObject++;
               }
           }
           console.log("CURR" + currentPlaceableObject);
        };


        

        game.input.mouse.mouseDownCallback =  function (event) {   
            
            if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {

                let element = placedGroup.create(cursorSprite.x, cursorSprite.y, placeableObjects[currentPlaceableObject].key);
                element.z = spriteCounter++;
                console.log("bark as " + element.z);
                

                placedObjects.push(element);

                //dependencies
                if(placeableObjects[currentPlaceableObject].key == 'tree_foot') {
                    let abelly =  bellies.create(cursorSprite.x + 30, cursorSprite.y + 30, 'tree_belly');
                    abelly.z = spriteCounter++;
                    //bellyList.push(abelly);
                    console.log("belly as "+ abelly.z);
                    abelly.anchor.setTo(0.5, 0.8);
                    placedObjects.push(abelly);
                }

                $.post("mapper.php", { x: element.x.toFixed(0), y: element.y.toFixed(0), a:1, i:element.key }, function(data) {
                    console.log(data);
                });
            }

                
        };


        placedGroup.onChildInputDown.add(function (sprite) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.CONTROL )) {
                let id = sprite.z;
                console.log("destory " + id + ": " + parseFloat(sprite.x).toFixed(0) + "," +  parseFloat(sprite.y).toFixed(0));
                /*
                for(let y = 0; y < placedObjects.length; y++) {
                    if (sprite.z + 1 == placedObjects[y].z) {
                        console.log("destorying " + y);
                        placedObjects[y].destroy();
                    }.
                }
                */



                $.post("mapper.php", { x:  parseFloat(sprite.x).toFixed(0), y: parseFloat(sprite.y).toFixed(0), a:0, i:sprite.key }, function(data) {
                    console.log(data);
                });

                sprite.destroy();
            }
        }, this);

        bellies.onChildInputDown.add(function (sprite) {
            let id = sprite.z;
            console.log("destorybelly " + id);
            sprite.destroy();

        }, this);




        setTimeout(function () {
            $.post("mapper.php", { a:2 }, function(datax) {
                console.log(datax);
                let data = JSON.parse(datax);
                for(let c = 0; c < data.length; c++) {
                    let element = placedGroup.create(data[c].x, data[c].y, data[c].i);
                    element.z = spriteCounter++;
                    console.log("creating " + element.z + ", "+ element.key);
                    

                    placedObjects.push(element);

                    //dependencies
                    if(data[c].i == 'tree_foot') {
                        
                        let abelly =  bellies.create(parseInt(data[c].x) + 30, parseInt(data[c].y) + 30, 'tree_belly');
                        //bellyList.push(abelly);
                        console.log("creating belly as "+ abelly.z);
                        abelly.anchor.setTo(0.5, 0.8);
                        placedObjects.push(abelly);
                    }
                }
            });
        }, 2000);
    },

    update:function update() {
        
        
        cursorSprite.x = game.input.activePointer.x + game.camera.x;
        cursorSprite.y = game.input.mousePointer.y + game.camera.y;
        
        posText.setText(cursorSprite.x + ", " + cursorSprite.y);
        posText.x = cursorSprite.x + 10;
        posText.y = cursorSprite.y;

        for(i = 0; i < placeableObjects.length; i++) {
            placeableObjects[i].visible = i == currentPlaceableObject ? true : false;
            placeableObjects[i].x = game.input.activePointer.x + game.camera.x;
            placeableObjects[i].y = game.input.mousePointer.y + game.camera.y;
        }

        Movement.movementHandler(cursors, movementKeys, sam, 950);
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
        
        

    }
};





game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('play', playState);
game.state.start("boot");



