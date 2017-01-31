class Players {

    constructor(game, mia) {
        this.players = [];
        this.playersLastXY = [];
        this.playerGraphics = [];
        this.game = game;
        this.mia = mia;
        this.playerGroup = game.add.group();
        this.playerGroup.inputEnableChildren = true;
        this.swordSFX = game.add.audio('sword-a');

        this.lastFrameMovement = []; //stop anims after move, not after a fight anim

        this.playerGroup.onChildInputDown.add(function(sprite) {
           
            if(typeof socket !== 'undefined') {

                let anim = "", dist = 0;
                let hd = this.mia.x - sprite.x;
                let vd = this.mia.y - sprite.y;

                if(Math.abs(hd) > Math.abs(vd)) { //if horizontal dis > vertical dist
                    anim = hd < 0 ? "fight_right": "fight_left";
                } else {
                    anim = vd < 0 ? "fight_down": "fight_up";
                }

                console.log("MIA: " + hd + "," + vd + "," + anim);
                this.mia.animations.play(anim);
                this.swordSFX.play();

                
                //socket.send("ATK " + sprite.z); 
                socket.emit("attack_player", sprite.z); 
            }
              
        }, this);

    }

    createPlayer(uid) {
        let newPlayer = this.playerGroup.create(0, 0, 'gary');

        newPlayer.enableBody = true;
        this.game.physics.arcade.enable(newPlayer);
        newPlayer.body.setSize(50, 42, 7, 15); //check

       /* newPlayer.animations.add('up',[0,1,2,3,4,5,6,7,8],8,true);
        newPlayer.animations.add('left',[9,10,11,12,13,14,15,16,17],8,true);
        newPlayer.animations.add('down',[18,19,20,21,22,23,24,25,26],8,true);
        newPlayer.animations.add('right',[27,28,29,30,31,32,33,34,35],8,true);*/


        newPlayer.animations.add('up',[104,105, 106, 107, 108, 109, 110, 111, 112],8,true);
        newPlayer.animations.add('left',[117,118,119,120,121,122,123,124,125],8,true);
        newPlayer.animations.add('down',[130,131,132,133,134,135,136,137,138],8,true);
        newPlayer.animations.add('right',[143,144,145,146,147,148,149,150,151],8,true);

        newPlayer.animations.add('fight_up',[156,157,158,159,160,161],8,true);
        newPlayer.animations.add('fight_left',[169,170,171,172,173,174],8,true);
        newPlayer.animations.add('fight_down',[182,183,184,185,186,187],8,true);
        newPlayer.animations.add('fight_right',[195,196,197,198,199,200],8,true);



        this.players[uid] = newPlayer;
        this.playersLastXY[uid] = {x: 0, y: 0};

        let graphicsHealth = game.add.graphics(100, 15);
        graphicsHealth.lineStyle(1, 0xFFFF00, 1);
        graphicsHealth.drawRect(0, 0, 50, 8);
        graphicsHealth.endFill();

       	let graphicsHealthValue = game.add.graphics(100, 15);
        graphicsHealthValue.lineStyle(2, 0xFFFF00, 0);
        graphicsHealthValue.beginFill(0x00FF00, 1);
        graphicsHealthValue.drawRect(0, 0, 100, 8);
        graphicsHealthValue.endFill();

        this.playerGraphics[uid] = {indicator: graphicsHealth, indicatorval: graphicsHealthValue};

        

    }


    updateData(data) {
        
        let uid = data[1], now = new Date(); 
        try {
            if(!this.players[uid] || typeof this.players[uid] === 'undefined') createPlayer(uid);
        } catch(e) {
            this.createPlayer(uid);
        }
        
        this.players[uid].z = uid; //save uid to sprite z
       // console.log(this.players[uid].z);

        this.players[uid].x = parseInt(data[2]);
        this.players[uid].y = parseInt(data[3]);

        this.players[uid].body.velocity.x = 0;
        this.players[uid].body.velocity.y = 0;
        
        if(this.playersLastXY[uid].x == this.players[uid].x && this.playersLastXY[uid].y == this.players[uid].y) {
            if(this.lastFrameMovement[uid]) {
                this.players[uid].animations.stop();
                this.players[uid].frame = 26;
            }
            
            
            this.lastFrameMovement[uid] = false;
        } else {
            this.players[uid].body.velocity.x = parseInt(data[4]);
            this.players[uid].body.velocity.y = parseInt(data[5]);
            this.players[uid].animations.play(data[6]);
            this.lastFrameMovement[uid] = true;
        }
            
        this.playersLastXY[uid] = {x: this.players[uid].x, y: this.players[uid].y };   
        
        this.playerGraphics[uid].indicator.x = this.players[uid].x;
        this.playerGraphics[uid].indicator.y = this.players[uid].y;

        this.playerGraphics[uid].indicatorval.clear();
        this.playerGraphics[uid].indicatorval.x = this.players[uid].x;
        this.playerGraphics[uid].indicatorval.y = this.players[uid].y;
		this.playerGraphics[uid].indicatorval.lineStyle(2, 0xFFFF00, 0);
        this.playerGraphics[uid].indicatorval.beginFill(0x00FF00, 1);
        this.playerGraphics[uid].indicatorval.drawRect(0, 0, parseInt(data[7])/2, 8);
        this.playerGraphics[uid].indicatorval.endFill();

        
    }

    processAttackOnMe(sprite) {


        let anim = "", dist = 0;
        let hd = this.players[sprite].x - this.mia.x;
        let vd = this.players[sprite].y - this.mia.y;

        if(Math.abs(hd) > Math.abs(vd)) { //if horizontal dis > vertical dist
            anim = hd < 0 ? "fight_right": "fight_left";
        } else {
            anim = vd < 0 ? "fight_down": "fight_up";
        }

        this.players[sprite].animations.play(anim);
        console.log("FOE: " + hd + "," + vd + "," + anim);
        
        mia.body.velocity.x = -300;


         

    }

    destroyPlayer(uid) {
        this.players[uid].visible = false;
        if(this.players[uid].playerGraphics.indicator) this.players[uid].playerGraphics.indicator = false;
        if(this.players[uid].playerGraphics.indicatorval) this.players[uid].playerGraphics.indicatorval = false;
    }

    


}