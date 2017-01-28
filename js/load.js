
let loadState = {
    preload: function() {
        game.load.image('tree_belly', 'assets/tre.png');
        game.load.image('tree_foot', 'assets/bark.png');
        game.load.image('grass', 'assets/grass.png');
        game.load.image('tomato', 'assets/Tomato_lay.png');
        game.load.image('smoke', 'assets/smoke-puff.png');
        game.load.spritesheet('pond-a', 'assets/pond-a_lay_sp.png', 813/3, 124, 3);
        game.load.image('pond-b', 'assets/pond-b_lay.png');
        game.load.image('night', 'assets/night2.png');
        game.load.spritesheet('fire-a', 'assets/fire/fire.png', 1245/5, 1192/4, 18);

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
        game.load.spritesheet('cats', 'assets/cats.png', 48, 48, 12 * 9);
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
    create: function() {

        game.state.start("play");
    }
}


    function isPlayerInRangeOfSprite(mia, sprite) {
        let vd = Math.abs(mia.x - sprite.x);
        let hd = Math.abs(mia.y - sprite.y);
        if(vd < 100 && hd < 100) return true;
        return false;
}