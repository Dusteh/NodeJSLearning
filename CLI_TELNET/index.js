/**
*Module Deps
*/
var net = require('net');
var log = console.log;

var count = 0;
var users = [];
/**
Create the Server
*/
var server = net.createServer(function(con){
	var nickname = '';
	log('New Connection');
	con.setEncoding('utf8');
	con.write('> Welcome!');
	con.write('\n> There are: '+count+' people online');
	con.write('\n> Enter your name to start chatting and press enter:');
	count++;
	con.on('data',function(data){		
		data = data.replace('\r\n','');
		if(!nickname){
			if(users[data]){
				con.write('\nnickname already in use try again');
				return;
			}else{
				nickname = data;
				users[nickname] = con;
				broadcast('\n> '+nickname+' joined the room\n',true);
			}
		}else{
			for( var i in users){
				if( i != nickname){
					broadcast(nickname+'>'+data+'\n');
				}
			}
		}	
	});
	con.on('close',function(){		
		count--;
		delete users[nickname];
		broadcast('User: '+nickname+' has left');
	});
	
	function broadcast(msg, exceptMyself){
		for( var i in users){
			if(!exceptMyself || i != nickname){
				users[i].write(msg);
			}
		}
	}
});

server.listen(3000,function(){
	log('Server listening on *:3000');
});


