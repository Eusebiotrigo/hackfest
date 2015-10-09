var request = require('request');
var oauth2 = require('./libs/oauth2.js');
var pubsub = require('./libs/pubsub.js');
var options = require('./options.js');

oauth2.getClientCredentialsToken([])
.then(function(token){	
	console.log('Got a lovely client credentials token: ' + token);
	return pubsub.createTopic(token, options.pubsub_topic);
}, console.log)
.then(function(response){
	console.log(response);
}, console.log);