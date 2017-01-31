class Inventory {
    constructor(game) {
        this.game = game;


		this.inventoryItem = [0,0,0,0,0,0];
		this.inventoryItem[5] = game.add.sprite(0, 0, '6');
		this.inventoryItem[5].fixedToCamera = true;
		this.inventoryItem[5].visible = false;

		this.inventoryItem[7] = game.add.sprite(0, 0, '8');
		this.inventoryItem[7].fixedToCamera = true;
		this.inventoryItem[7].visible = false;


        let x = (game.width / 2) - 860/2;
        let y = game.height - 128;

		this.ax = x;
		this.ay = y;

        this.bg = game.add.sprite(x, y, 'bg');
        this.bg.fixedToCamera = true;
		//this.bg.scale.setTo(1,1);
        this.bg.width = 860;
		this.graphics = game.add.graphics(x, y);
        this.graphics.fixedToCamera = true;
		// graphics.beginFill(0xFF3300);
    	
    	this.graphics.lineStyle(1, 0xffd900, 1);
		
    	var j=1;

		for(var i = 10; i <= 850; i = i + 85){
            
            this.graphics.beginFill(0xFFFFFF, 1);
			this.graphics.drawRect(i, 10, 75, 75);
            this.graphics.endFill();
			//var inbg = game.add.sprite(i + x, 11 + y,'inbg');
            //inbg.fixedToCamera = true;
			//inbg.width=74;
			//inbg.height=74;
			var myimage = game.add.sprite(i + 1 + x, 11 + y, j);
            myimage.fixedToCamera = true;
			myimage.width=72;
			myimage.height=72;
			myimage.alpha=0.5;
			// myimage.add.filter('gray');
			j = j + 1;
		}
		
		// for(i=1)
		//window.graphics = graphics;
    }

	acquireItemFromLocation(x, y, item) {

		
		console.log("Acquire Item " + item);
        this.inventoryItem[item - 1].x = x;// - this.game.camera.x;
		this.inventoryItem[item - 1].y = y;// - this.game.camera.y;
		this.inventoryItem[item - 1].visible = true;
		this.inventoryItem[item - 1].fixedToCamera = false;

		this.game.add.tween(this.inventoryItem[item - 1].scale).to({x: 3, y: 3}, 1000, Phaser.Easing.Linear.Out, true, 0, 1, false);
		this.game.add.tween(this.inventoryItem[item - 1]).to({x: this.game.width/2, y: 1080}, 2000, Phaser.Easing.Linear.Out, true, 0, 1, false);
   
		//this.inventoryItem[item - 1].fixedToCamera = false;
	}
    

}