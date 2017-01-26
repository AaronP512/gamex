var game = new Phaser.Game(865,100,Phaser.CANVAS);
var mainState={
	preload:function(){
		game.load.image('1','assets/axe.png');
		game.load.image('2','assets/blaster.png');
		// game.load.image('4','assets/fire.png');
		game.load.image('3','assets/gold.png');
		game.load.image('4','assets/hay1.jpg');
		game.load.image('5','assets/images.jpg');
		game.load.image('6','assets/meat.jpg');
		game.load.image('7','assets/sil2.jpg');
		game.load.image('8','assets/Tomato.png');
		game.load.image('9','assets/torch.png');
		game.load.image('10','assets/stone.png');
		game.load.image('11','assets/lighter.jpg');
		game.load.image('12','assets/Sword.png');		
		game.load.image('bg','assets/bg.jpg');
		game.load.image('inbg','assets/background.jpg');
	},
	create:function(){
		var bg = game.add.sprite(0,0,'bg');
		bg.scale.setTo(2,2);
		var graphics = game.add.graphics(0,0);
		// graphics.beginFill(0xFF3300);
    	
    	graphics.lineStyle(1, 0xffd900, 1);
		
    	j=1;

		for(i=10;i<=850;i=i+85){
			graphics.drawRect(i,10,75,75);
			inbg=game.add.sprite(i,11,'inbg');
			inbg.width=74;
			inbg.height=74;
			myimage = game.add.sprite(i+1,11,j);
			myimage.width=72;
			myimage.height=72;
			myimage.alpha=0.5;
			// myimage.add.filter('gray');
			j=j+1;
		}
		
		// for(i=1)
		window.graphics=graphics;
	},
	update:function(){
		//if object present set alpha=1

	}
}
game.state.add("mainState",mainState);
game.state.start("mainState");