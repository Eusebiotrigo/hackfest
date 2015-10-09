var five = require("johnny-five"),
    board, lcd;

board = new five.Board();

board.on("ready", function() {
     var rotary = new five.Sensor("A0");
     var button = new five.Button(4);
     var r = 0;
     var g = 0;
     var b = 0;
     var selector = 0;
     var index=0;
    lcd = new five.LCD({
        // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
        // Arduino pin # 7    8   9   10  11  12
        controller: "JHD1313M1",
        rows: 2,
        cols: 16


        // Options:
        // bitMode: 4 or 8, defaults to 4
        // lines: number of lines, defaults to 2
        // dots: matrix dimensions, defaults to "5x8"
    });

    // Tell the LCD you will use these characters:
    //lcd.useChar("check");
    //lcd.useChar("heart");
    //lcd.useChar("duck");

    // Line 1: Hi rmurphey & hgstrp!
    lcd.clear();
    lcd.cursor(0,0).print("Select product");
    lcd.cursor(1, 0).print("*woop woop*");

    // Line 2: I <3 johnny-five
    // lcd.print("I").write(7).print(" johnny-five");
    // can now be written as:
    //lcd.print("I :heart: johnny-five");

    //this.wait(3000, function() {
    //    lcd.cursor(0, 0).print("suuuup");
    //});

    this.repl.inject({
        lcd: lcd
    });
    rotary.scale(0, 255).on("change", function() {
        if (r<250) r++;
        else if (g<250) g++;
        else if (b<250) b++;
        else {r=10;g=10;b=20;}
        //var r = linear(0xFF, 0xFF, this.value, 0xFF);
        //var g = linear(0x00, 0xFF, this.value, 0x88);
        //var b = linear(0x00, 0x00, this.value, 0xFF);
        if ((this.value/2) > selector+2) {selector++;}
        if ((this.value/2) < selector-2) {selector--;}
        lcd.bgColor(r, g, b);
        lcd.cursor(1,0).print("knob:"+ selector + "V"+this.scale(0,255).value);
        //lcd.clear();


      });

});
function linear(start, end, step, steps) {
  return (end - start) * step / steps + start;
}
