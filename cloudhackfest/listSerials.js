var SerialPort = require("serialport");
var rport = /usb|acm|^com/i;

SerialPort.list(function(err, ports) {
  ports.forEach(function(port) {
    if (rport.test(port.comName)) {
      console.log("FOUND: ", port.comName);
    }
  });
});