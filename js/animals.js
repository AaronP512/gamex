class Animals {
	
	constructor(game) {
		this.animals = game.add.group();
		this.kittyList = []
		this.kittyCount = 0;
		this.followenabled = false;
        //.enableBody = true;


	}

	move() {
		if(this.followenabled == true) return;

		let animalthis = this;
		this.animals.forEach(function(item) {
			
			let anim = "";
			switch(animalthis.kittyList[item.z].direction) {
				case 0: item.position.x--; 
						anim = "l";
						break;
				case 1: item.position.y--; 
						anim = "u";
						break;
				case 2: item.position.x++; 
						anim = "r";
						break;				
				case 3: item.position.y++; 
						anim = "d";
						break;
			}
			item.animations.play(anim);
			

			let now = new Date();

			if(now - animalthis.kittyList[item.z].changedDirections > 3000) {
				animalthis.kittyList[item.z].changedDirections = now;
				animalthis.kittyList[item.z].direction = rand(0, 3);
			}
			//console.log(item);
    	});
	}

	follow(sam) {
		if(this.followenabled == false) return;

		let animalthis = this;
		this.animals.forEach(function(item) {
			
			let anim = "l";

			if(item.position.x < sam.position.x) {
				item.position.x++;
				anim = "r";
			}
			else {
				item.position.x--;
				anim = "l";
			}

			if(item.position.y < sam.position.y) {
				item.position.y++;
				anim = "d";
			}
			else {
				item.position.y--;
				anim = "u";
			}
			
			item.animations.play(anim);
			


			//console.log(item);
    	});
	}

	create() {
		let kitty = this.animals.create(576, 384, 'cats');
		kitty.animations.add('d',[0,1,2],3,true);
		kitty.animations.add('l',[12,13,14],3,true);
		kitty.animations.add('r',[24,25,26],3,true);
		kitty.animations.add('u',[36,37,38],3,true);
		
		//kitty.animations.play('r');
		let dir = rand(0, 3);
		kitty.z = this.kittyCount++;
		this.kittyList.push({id: kitty.z, direction: dir, changedDirections: (new Date().getTime()) + Math.random() * 10000});
		



	}


}