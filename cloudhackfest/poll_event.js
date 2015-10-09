var request = require('request');
var oauth2 = require('./libs/oauth2.js');
var pubsub = require('./libs/pubsub.js');
var options = require('./options.js');

console.log('ready. go change the world.');

oauth2.getClientCredentialsToken(['hybris.pubsub.topic='+options.projectAndApp+'.'+options.pubsub_event])
.then(function(token) {
	console.log("Got a lovely client credentials token, starting polling!");
	setInterval(function() {

	pubsub.readNext(token, options.pubsub_event)
	.then(function(evt){
		if (evt == undefined)
			console.log("No event.");
		else
			console.log(evt);
	}, console.log);

	}, 500);

}, console.log);
