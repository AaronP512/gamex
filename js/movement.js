

class Movement {
    static getMovementKeys() {
            this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
            return this;
    }

    static movementHandler(cursors, movementKeys, sam, speed) {
        let keysBeingHeld = false;

        sam.body.velocity.x = sam.body.velocity.y = 0;
    
        if(cursors.up.isDown || movementKeys.up.isDown) {
            sam.body.velocity.y = -speed;
            sam.animations.play('up');
            keysBeingHeld = true;
        }

        if(cursors.down.isDown || movementKeys.down.isDown) {
            sam.body.velocity.y = speed;
            sam.animations.play('down');
            keysBeingHeld = true;
        }

        if(cursors.left.isDown || movementKeys.left.isDown) {
            sam.body.velocity.x = -speed;
            sam.animations.play('left');
            keysBeingHeld = true;
        }

        if(cursors.right.isDown || movementKeys.right.isDown) {
            sam.body.velocity.x = speed;
            sam.animations.play('right');
            keysBeingHeld = true;
        }

        if(keysBeingHeld == false) {
            sam.animations.stop();
            sam.frame = 20; 
        }

        //console.log(sam.animations.currentAnim.name);
        if(typeof socket !== 'undefined') { //' && socket
            socket.send("POS " + sam.position.x.toFixed(0) + " " + sam.position.y.toFixed(0) + " " + sam.body.velocity.x.toFixed(0) + " " + sam.body.velocity.y.toFixed(0) + " " + sam.animations.currentAnim.name); 
        }
        
    }   
}

