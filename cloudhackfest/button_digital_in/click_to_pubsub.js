var Board = require("firmata").Board;
var oauth2 = require("../libs/oauth2.js");
var pubsub = require("../libs/pubsub.js");
var options = require("../options.js");

var BUTTON_PIN = 2; //D2 on the grove shield
var ctx = {};


//please run node listSerials.js to find out your serial port!
var board = new Board('/dev/cu.usbmodem1411');

board.on("ready", function() {
  console.log("Ready. Go change the world."); 

  board.pinMode(BUTTON_PIN,board.MODES.INPUT);
  board.digitalRead(BUTTON_PIN, function(data){
    if (data == 1) //pressed
    {
      console.log("Button pressed.");

      oauth2.getClientCredentialsToken(['hybris.pubsub.topic='+options.projectAndApp+'.'+options.pubsub_topic])
        .then(function(token){  
          console.log('Got a lovely client credentials token: ' + token);
          return pubsub.publish(token, options.pubsub_topic, {name:'Sven'});
        }, console.log)
        .then(function(){
          console.log('Published the ' + options.pubsub_topic + ' event.');
        }, function(error){
          console.log("Unable to publish the event - did you create the topic?");
        });

    }
    else //0, button released
    {
      console.log("Button released.");
    }
  });
});


   