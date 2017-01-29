class Inventory {
    constructor(game) {
        this.game = game;

        let x = (game.width / 2) - 860/2;
        let y = game.height - 128;

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

    

}