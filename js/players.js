class Players {

    constructor(game) {
        this.players = [];
        this.playersLastXY = [];
        this.game = game;
        this.playerGroup = game.add.group();
        this.playerGroup.inputEnableChildren = true;

        this.playerGroup.onChildInputDown.add(function(sprite) {
           
            if(typeof socket !== 'undefined') {
                socket.send("ATK " + sprite.z); 
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

        this.players[uid] = newPlayer;
        this.playersLastXY[uid] = {x: 0, y: 0};

        
        

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
            this.players[uid].animations.stop();
            this.players[uid].frame = 26;
            console.log("SIFD");
        } else {
            this.players[uid].body.velocity.x = parseInt(data[4]);
            this.players[uid].body.velocity.y = parseInt(data[5]);
            this.players[uid].animations.play(data[6]);
        }
            
        this.playersLastXY[uid] = {x: this.players[uid].x, y: this.players[uid].y };   
    }






}