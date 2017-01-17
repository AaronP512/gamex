class Animals {
	
	constructor(game) {
		this.animals = game.add.group();
		this.kittyList = []
		this.kittyCount = 0;
        //.enableBody = true;


	}

	move() {
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

	create() {
		let kitty = this.animals.create(576, 384, 'cats');
		kitty.animations.add('d',[0,1,2],3,true);
		kitty.animations.add('l',[12,13,14],3,true);
		kitty.animations.add('r',[24,25,26],3,true);
		kitty.animations.add('u',[36,37,38],3,true);
		
		//kitty.animations.play('r');
		let dir = rand(0, 3);
		kitty.z = this.kittyCount++;
		this.kittyList.push({id: kitty.z, direction: dir, changedDirections: 0});
		



	}


}