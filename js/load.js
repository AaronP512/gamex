let loadState = {
    preload: function() {
        game.load.image('tree_belly', 'assets/tre.png');
        game.load.image('tree_foot', 'assets/bark.png');
        game.load.image('grass', 'assets/grass.png');
        game.load.image('tomato', 'assets/Tomato.png');
        game.load.image('smoke', 'assets/smoke-puff.png');


        game.load.spritesheet('sams', 'assets/sam.png', 64, 64, 36); //64,64 old values
        game.time.advancedTiming = true;



        game.load.audio('chop', ['assets/sfx/chop.mp3', '']);
        game.load.audio('chopdone', ['assets/sfx/chopdone.mp3', '']);

        /* HUD */
        game.load.image('health', 'assets/hud/health.png', 32, 32);
        game.load.image('hunger', 'assets/hud/hunger.png', 32, 32);
        game.load.image('mental', 'assets/hud/mental.png', 32, 32);


    },
    create: function() {

        game.state.start("play");
    }
}