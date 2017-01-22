var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});


var clients = [];



setInterval(function() {
  console.log("Broadcast");

  var positions = [];
  
  for(player in clients) {
    if(!player || !clients[player]) continue;
    console.log("Sending to " + clients[player].obj.id);
    for(xplayer in clients) {
      if(!xplayer || !clients[xplayer]) continue;
      if(clients[player].obj.id != clients[xplayer].obj.id) clients[player].obj.send("PPOS " + clients[xplayer].obj.id + " " + clients[xplayer].x + " " + clients[xplayer].y  + " " + clients[xplayer].vx + " " + clients[xplayer].vy + " " + clients[xplayer].anim);
    }
  }
}, 36);



io.on('connection', function(socket){
  console.log('A user connected ' + socket.id);
  clients[socket.id] = { obj: socket, x: 0, y: 0, vx:0, vy:0, anim: "" };
  socket.send("Welcome " + socket.id);


  socket.on('disconnect', function () {
    console.log('A user disconnected');

    clients.splice(clients.indexOf(socket.id), 1);
    clients[socket.id] = null;
      console.log("removing " + socket.id);

  });

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
      
    }
    
  });


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});