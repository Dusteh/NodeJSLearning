var request = require('superagent');
request.get('http://search.twitter.com/search.json')
	.send({q:'Dusty'})
	.set('Date', new Date())
	.end(function(res){console.log(res.body);});