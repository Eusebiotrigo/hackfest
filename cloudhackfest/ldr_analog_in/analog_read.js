var Board = require("firmata").Board;
var oauth2 = require("../libs/oauth2.js");
var pubsub = require("../libs/pubsub.js");
var options = require("../options.js");

var LDR_PIN = 0; //A0 on the grove shield
var ctx = {};


//please run node listSerials.js to find out your serial port!
var board = new Board('/dev/cu.usbmodem1411');

board.on("ready", function() {
  console.log("Ready. Go change the world."); 

  board.pinMode(LDR_PIN,board.MODES.INPUT);
  board.analogRead(LDR_PIN, function(data){
    ctx.sensorReading = data;
  });
});

setInterval(function() {
  if (ctx.sensorReading)
  {
    console.log("Data: " + ctx.sensorReading);  
    oauth2.getClientCredentialsToken(['hybris.pubsub.topic='+options.projectAndApp+'.'+options.pubsub_topic])
      .then(function(token){  
        console.log('Got a lovely client credentials token: ' + token);
        return pubsub.publish(token, options.pubsub_topic, {sensorReading:ctx.sensorReading});
      }, console.log)
      .then(function(){
        console.log('Published the ' + options.pubsub_topic + ' event.');
      }, function(error){
        console.log("Unable to publish the event - did you create the topic?");
      });    
  }

  
}, 1000);


