
let loadState = {
    preload: function() {
        game.load.image('tree_belly', 'assets/tre.png');
        game.load.image('tree_foot', 'assets/bark.png');
        game.load.image('grass', 'assets/grass.png');
        game.load.image('tomato', 'assets/Tomato_lay.png');
        game.load.image('smoke', 'assets/smoke-puff.png');
        game.load.image('pond-a', 'assets/pond-a_lay.png');
        game.load.image('pond-b', 'assets/pond-b_lay.png');
        game.load.image('night', 'assets/night2.png');
        game.load.image('cave_e', 'assets/cave_e.png');
        game.load.image('cave_1', 'assets/cave_1.png');
        game.load.image('cave_2', 'assets/cave_2.png');
        game.load.image('cave_3', 'assets/cave_3.png');
        game.load.image('cave_4', 'assets/cave_4.png');
        game.load.image('cave_5', 'assets/cave_5.png');
        game.load.image('cave_6', 'assets/cave_6.png');
        game.load.image('cave_7', 'assets/cave_7.png');

        /* Animols */
        game.load.spritesheet('catsx', 'assets/cats.png', 48, 48, 12 * 9);
        game.load.spritesheet('rap', 'assets/monster2.png', 77.6, 54.6, 6 * 8);

        game.load.spritesheet('sams', 'assets/sam.png', 64, 64, 36); //64,64 old values
        game.time.advancedTiming = true;



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


    },
    create: function() {

        game.state.start("play");
    }
}