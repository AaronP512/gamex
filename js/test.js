function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let testState = {
    create: function create() {
        this.game.canvas.style.cursor = "none";

        game.physics.startSystem(Phaser.Physics.ARCADE);


        game.stage.backgroundColor = GameSettings.backgroundColor;
        game.world.setBounds(-GameSettings.bounds/2, -GameSettings.bounds/2, GameSettings.bounds, GameSettings.bounds);

        cursors = game.input.keyboard.createCursorKeys();
        movementKeys = Movement.getMovementKeys();
        
 
       // game.add.tileSprite(-GameSettings.bounds, -GameSettings.bounds, GameSettings.bounds * 2, GameSettings.bounds * 2, 'grass');
         
        
       lol = game.add.sprite(0, 0, 'cave_' + rand(1,7));
       lol.scale.x = lol.scale.y = 1.5;


        sam = game.add.sprite(800, 400, 'sams');
        sam.enableBody = true;
        sam.scale.setTo(1.5,1.5);
        game.physics.arcade.enable(sam);
        sam.body.setSize(50, 42, 7, 15); //check

        

            
        
        game.camera.x = game.camera.y = 100;
       
        sam.animations.add('up',[0,1,2,3,4,5,6,7,8],8,true);
        sam.animations.add('left',[9,10,11,12,13,14,15,16,17],8,true);
        sam.animations.add('down',[18,19,20,21,22,23,24,25,26],8,true);
        sam.animations.add('right',[27,28,29,30,31,32,33,34,35],8,true);
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(sam);



    },

    update:function update() {
        Movement.movementHandler(cursors, movementKeys, sam);
    }    
};





game.state.add('test', testState);