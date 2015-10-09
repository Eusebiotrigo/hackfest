var Board = require("firmata").Board;

//please run node listSerials.js to find out Serial port!
var board = new Board('/dev/cu.usbmodem1411');
var sirenVal = 0;
var sirenDirection = true;
var state = false;
var degree = 0;
var servoDirection = true;

board.on("ready", function() {
  console.log("Ready. Go change the world."); 

  /*
  var B=3975; 
  board.analogRead(0, function(data){
    var val = parseInt(data, 10);
    var resistance=(1023-val)*10000/val;                      // get resistance
    var temperature=1/(Math.log(resistance/10000)/B+1/298.15)-273.15; 
    console.log(temperature); 
  });
*/
  
  /*
  board.pinMode(3,board.MODES.INPUT);
  board.digitalRead(3, function(data){
    console.log(data);
  });*/
/*
  board.pinMode(3,board.MODES.PWM);
  setInterval(function(){
    board.analogWrite(3, sirenVal);

    if (sirenDirection)
      sirenVal++;
    else
      sirenVal--;

    if (sirenVal == 0 || sirenVal == 255)
      sirenDirection = !sirenDirection;

  }, 15);*/


  //relay
  /*
  board.pinMode(7,board.MODES.OUTPUT);
  setInterval(function(){
    board.digitalWrite(7, state ? board.HIGH : board.LOW);
    state = !state;

  }, 1000);  
  */

  /*
  board.pinMode(6,board.MODES.SERVO);
  setInterval(function(){
    board.servoWrite(6, degree);
    console.log(degree);
    if (servoDirection)
      degree++;
    else 
      degree--;

    if (degree == 0 || degree == 180)
      servoDirection = !servoDirection;


  }, 25);*/

  board.sendString("test");
  

});


   