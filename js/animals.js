class Animals {
	
	constructor(game) {
		this.animals = game.add.group();
		this.kittyList = []
		this.kittyCount = 0;
		this.followenabled = false;
        //.enableBody = true;

		this.animalsRequestedFromServer = false;

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
			
			/*
			let now = new Date();

			if(now - animalthis.kittyList[item.z].changedDirections > 3000) {
				animalthis.kittyList[item.z].changedDirections = now;
				animalthis.kittyList[item.z].direction = rand(0, 3);
			}
			*/
    	});
	}


	update(animaldata) {

		if(!this.animalsRequestedFromServer) {
			socket.emit("request_animals", { data: 0 });
			return;
		}
		this.kittyList[animaldata.id].obj.position.x = animaldata.x;
		this.kittyList[animaldata.id].obj.position.y = animaldata.y;
		this.kittyList[animaldata.id].direction = animaldata.d;


	/*		
	for(var i = 0; i < animaldata.length; i++) {
			
			this.kittyList[animaldata[i].id].obj.position.x = animaldata[i].x;
			this.kittyList[animaldata[i].id].obj.position.y = animaldata[i].y;
			this.kittyList[animaldata[i].id].direction = animaldata[i].d;
			console.log(this.kittyList[animaldata[i].id]);
		} 
	*/

		
		
		
		
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

	create(animal, id) {

		this.animalsRequestedFromServer = true;

		let kitty = null;

		switch(animal) {
			case 'godzilla': 
							kitty = this.animals.create(0, 0, 'rap');
							kitty.scale.setTo(2,2);
							kitty.animations.add('d',[24,25,26,27,28,29],4,true);
							kitty.animations.add('l',[12,13,14,15,16,17],4,true);
							kitty.animations.add('r',[0,1,2,3,4,5],4,true);
							kitty.animations.add('u',[37,38,39,40,41,42],4,true);

							break;
			
			case 'kitty':

							kitty = this.animals.create(0, 0, 'cats');
							kitty.animations.add('d',[0,1,2],3,true);
							kitty.animations.add('l',[12,13,14],3,true);
							kitty.animations.add('r',[24,25,26],3,true);
							kitty.animations.add('u',[36,37,38],3,true);

							break;

		}

		

		


		
		//kitty.animations.play('r');
		/*
		let dir = rand(0, 3);
		kitty.z = this.kittyCount++;
		this.kittyList.push({id: rap.z, direction: dir, changedDirections: (new Date().getTime()) + Math.random() * 10000});
		*/

		kitty.z = id;
		this.kittyList.push({obj: kitty, id: kitty.z, direction: 0});



	}


}