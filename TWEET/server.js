var http = require('http');
var qs = require('querystring');

var search = process.argv.slice(2).join(' ').trim();

if(!search.length){
	return console.log('\n Usage: node tweets <term>\n');
}
console.log('\n searching for '+search+'\n');
http.request({
	host:'search.twitter.com',
	path:'/search.json?'+qs.stringify({q:search})	
},function(res){
	var body = '';
	res.setEncoding('UTF8');
	res.on('data',function(chunk){
		body += chunk;
	});
	res.on('end',function(){
		var obj = JSON.parse(body);
		obj.results.forEach(function (tweet){
			console.log('	\033[90m' +tweet.text+'\033[39m');
			console.log('	\033[94m' +tweet.from_user+'\033[39m');
			console.log('___');
		});
	});
}).end();