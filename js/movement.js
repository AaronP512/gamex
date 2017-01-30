

class Movement {
    static getMovementKeys() {
            this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.lastKeysHeld = false;
            return this;
    }

    static movementHandler(cursors, movementKeys, sam, speed) {
        let keysBeingHeld = false;

        sam.body.velocity.x = sam.body.velocity.y = 0;
    	// //left
     //    if(cursors.left.isDown || movementKeys.left.isDown) {
     //        sam.body.velocity.x = -speed;
     //        sam.animations.play('left');
     //        keysBeingHeld = true;
     //    }
    	// //up
     //    if(cursors.up.isDown || movementKeys.up.isDown) {
     //        sam.body.velocity.y = -speed;
     //        sam.animations.play('up');
     //        keysBeingHeld = true;
     //        console.log('up');
     //    }
     //    //up-left
     //    if((cursors.up.isDown || movementKeys.up.isDown)&&(cursors.left.isDown || movementKeys.left.isDown)) {
     //        sam.body.velocity.x = -speed;
     //        sam.body.velocity.y = -speed;
     //        sam.animations.play('left');
     //        keysBeingHeld = true;
     //        console.log('upleft');
     //    }
     //    //up-right
     //    if((cursors.up.isDown || movementKeys.up.isDown)&&(cursors.right.isDown || movementKeys.right.isDown)) {
     //        console.log(cursors.up.isDown || movementKeys.up.isDown);
     //        console.log(cursors.right.isDown || movementKeys.right.isDown);
     //        sam.body.velocity.x = speed;
     //        sam.body.velocity.y = -speed;
     //        sam.animations.play('right');
     //        keysBeingHeld = true;
     //        console.log('upright');
     //    }
     //    //down-left
     //    if((cursors.down.isDown || movementKeys.down.isDown)&&(cursors.left.isDown || movementKeys.left.isDown)) {
     //        sam.body.velocity.x = -speed;
     //        sam.body.velocity.y = speed;
     //        sam.animations.play('left');
     //        keysBeingHeld = true;
     //        console.log('downleft');
     //    }
     //    //down-right
     //    if((cursors.down.isDown || movementKeys.down.isDown)&&(cursors.right.isDown || movementKeys.right.isDown)) {
            
     //        sam.body.velocity.x = speed;
     //        sam.body.velocity.y = speed;
     //        sam.animations.play('right');
     //        keysBeingHeld = true;
     //        console.log('down-right');
     //    }
     //    //down
     //    if(cursors.down.isDown || movementKeys.down.isDown) {
     //        sam.body.velocity.y = speed;
     //        sam.animations.play('down');
     //        keysBeingHeld = true;
     //        console.log('down');
     //    }
        
     //    //right
     //    if(cursors.right.isDown || movementKeys.right.isDown) {
     //        sam.body.velocity.x = speed;
     //        sam.animations.play('right');
     //        keysBeingHeld = true;
     //    }
     //    else {
     //        this.lastKeysHeld = true;
     //    }

     //    if(keysBeingHeld == false) {
     //        if(this.lastKeysHeld) { //Stop animations only if movementkeys were pressed in  LAST CALL, so avoid stopping fighting anims
     //            sam.animations.stop();
     //            sam.frame = 26; 
     //            this.lastKeysHeld = false;
     //        }
            
     //    } 

 	if(cursors.up.isDown || movementKeys.up.isDown) {
        if(cursors.left.isDown || movementKeys.left.isDown){
        	sam.body.velocity.x = -speed;
            sam.body.velocity.y = -speed;
            sam.animations.play('left');
            keysBeingHeld = true;
            console.log('upleft');
        }
        else if(cursors.right.isDown || movementKeys.right.isDown){
        	sam.body.velocity.x = speed;
            sam.body.velocity.y = -speed;
            sam.animations.play('right');
            keysBeingHeld = true;
            console.log('upright');
        }
 		else{
            sam.body.velocity.y = -speed;
            sam.animations.play('up');
            keysBeingHeld = true;
    	}
    }

	if(cursors.down.isDown || movementKeys.down.isDown) {
        if(cursors.left.isDown || movementKeys.left.isDown){
        	sam.body.velocity.x = -speed;
            sam.body.velocity.y = speed;
            sam.animations.play('left');
            keysBeingHeld = true;
            console.log('upleft');
        }
        else if(cursors.right.isDown || movementKeys.right.isDown){
        	sam.body.velocity.x = speed;
            sam.body.velocity.y = speed;
            sam.animations.play('right');
            keysBeingHeld = true;
            console.log('upright');
        }
 		else{
            sam.body.velocity.y = speed;
            sam.animations.play('down');
            keysBeingHeld = true;
    	}
    }


    else if(cursors.left.isDown || movementKeys.left.isDown) {
            sam.body.velocity.x = -speed;
            sam.animations.play('left');
            keysBeingHeld = true;
        }

        
    //right
    else if(cursors.right.isDown || movementKeys.right.isDown) {
        sam.body.velocity.x = speed;
        sam.animations.play('right');
        keysBeingHeld = true;
    }
    else {
            this.lastKeysHeld = true;
        }

        if(keysBeingHeld == false) {
            if(this.lastKeysHeld) { //Stop animations only if movementkeys were pressed in  LAST CALL, so avoid stopping fighting anims
                sam.animations.stop();
                sam.frame = 26; 
                this.lastKeysHeld = false;
            }
            
        } 



        
        //console.log(sam.animations.currentAnim.name);
        if(typeof socket !== 'undefined' && keysBeingHeld) { //' && socket

            socket.emit('client_pos', { 
                x: sam.position.x.toFixed(0),
                y: sam.position.y.toFixed(0),
                vx: sam.body.velocity.x.toFixed(0),
                vy: sam.body.velocity.y.toFixed(0),
                anim: sam.animations.currentAnim.name
            });


            //socket.send("POS " + sam.position.x.toFixed(0) + " " + sam.position.y.toFixed(0) + " " + sam.body.velocity.x.toFixed(0) + " " + sam.body.velocity.y.toFixed(0) + " " + sam.animations.currentAnim.name); 
            
        }
        
    }   
}

