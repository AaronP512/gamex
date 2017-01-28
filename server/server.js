var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var clients = [];

var animals = [];

(function () {

	var animallist = ['kitty', 'godzilla'];
	for(var i = 0; i < 20; i++) {
		animals.push({ id: i, type: animallist[rand(0,1)], x: 0, y: 0, d: 0});		
		console.log("Creating animal " + i + " as " + animals[i].type);
	}

	
})();



var minute = 06*60;

setInterval(function() {
    var positions = [];
  
    for(player in clients) {
        if(!player || !clients[player]) continue; //Null Check
          //console.log("Sending to " + clients[player].obj.id);
            for(xplayer in clients) {
            if(!xplayer || !clients[xplayer] || !clients[player]) continue; //Null Check, Again (If disconnected in between, thanks node)
            if(clients[player].obj.id != clients[xplayer].obj.id) {
                clients[player].obj.send("PPOS " + clients[xplayer].obj.id + " " + clients[xplayer].x + " " + clients[xplayer].y  + " " + clients[xplayer].vx + " " + clients[xplayer].vy + " " + clients[xplayer].anim);
            }
        }
    }
}, 36); //36Hz tickrate.


setInterval(function() {
    io.sockets.emit('time', ++minute);
    minute += 1 ;
    if(minute > 24*60) minute = 0;
}, 500);


var lastanimalupdate = 0;
setInterval(function() {

	for(var i = 0; i < animals.length; i++) {
		switch(animals[i].d) {
			case 0: animals[i].x-= 10; break;
			case 1: animals[i].y-= 10; break;
			case 2: animals[i].x+= 10; break;
			case 3: animals[i].y+= 10; break;
		}
	}





	if(new Date() - lastanimalupdate > 2000) {

		for(var i = 0; i < animals.length; i++) {
			animals[i].d = rand(0, 3);
			io.sockets.emit("animal_update", animals[i]);
		}	


		
		lastanimalupdate = new Date();

		
	}
    
}, 170);


/*

DO THIS. for the position loop... shiet

socket.broadcast.emit('get_message',data);
To broadcast it to all connected users, except to the socket where you are calling the broadcast on.

If you also want to include that socket you can do

*/


io.on('connection', function(socket){
  console.log('A user connected ' + socket.id);
  clients[socket.id] = { obj: socket, x: 0, y: 0, vx:0, vy:0, anim: "", health: 100 };
  socket.send("Welcome " + socket.id);

  	socket.emit("animal_create", animals[0]);
  	socket.emit("animal_create", animals[1]);

  socket.on('disconnect', function () {
    console.log('A user disconnected');

    clients.splice(clients.indexOf(socket.id), 1);
    clients[socket.id] = null;
    console.log("removing " + socket.id);

  });


  

  socket.on('client_pos', function(pos){
      clients[socket.id].x = pos.x;
      clients[socket.id].y = pos.y;
      clients[socket.id].vx = pos.vx;
      clients[socket.id].vy = pos.vy;
      clients[socket.id].anim = pos.anim;
	  console.log(pos);
  });

  socket.on('attack_player', function(playerid){
      /*** Do a Distance Check here ***/
	  if(clients[playerid]) {
           clients[playerid].health -= 10;
           //clients[playerid.obj.send("ATT " + socket.id + " " + clients[cmd[1]].health);
		   clients[playerid].obj.emit("attack_ack", {by: socket.id, hp: clients[playerid].health });
        }
	  console.log(pos);
  });

  //unused.
  socket.on('message', function(msg){
    console.log(socket.id + "> " + msg);
    var cmd = msg.split(" ");
    switch(cmd[0]) {
      case "POS": 
        clients[socket.id].x = parseInt(cmd[1]);
        clients[socket.id].y = parseInt(cmd[2]);
        clients[socket.id].vx = parseInt(cmd[3]);
        clients[socket.id].vy = parseInt(cmd[4]);
        clients[socket.id].anim = cmd[5];
        break;
      case "ATK":
        /*
        for(xplayer in clients) {
          if(!xplayer || !clients[xplayer]) continue;
          clients[xplayer].obj.send("ATT " + cmd[1]);
        }
        */
        if(clients[cmd[1]]) {
           clients[cmd[1]].health -= 10;
           clients[cmd[1]].obj.send("ATT " + socket.id + " " + clients[cmd[1]].health);
           
        }
        break;  
    }
    
  });


  socket.on('request_animals', function(data) {
	  	for(var i = 0; i < animals.length; i++) {
			  socket.emit("animal_create", animals[i]);
		}
  });


});

http.listen(3000, function(){
  console.log('listening on *:3002');
});