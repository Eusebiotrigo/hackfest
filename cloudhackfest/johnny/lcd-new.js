var five = require("johnny-five"),
    customer = require("../libs/customer.js"),
    board, lcd;

var oauth2 = require('../libs/oauth2.js');
var options = require('../options.js');
var price = require('../libs/price.js');
var products = require('../libs/products.js');
var cart = require('../libs/cart.js');
var productlist = null;


oauth2.getClientCredentialsToken([options.scope])
    .then(function (token) {
        console.log("Got a lovely client credentials token, starting polling!");
        products.displayProducts(token).then(function (callbackEvt) {
                if (callbackEvt == undefined) {
                    console.log("No event.");
                } else {
                    console.log(callbackEvt);
                    productlist = callbackEvt;
                }
            }, console.log);
    }, console.log);

board = new five.Board();


board.on("ready", function() {
    var button = new five.Button(4);
    var rotary = new five.Sensor("A1");
    var r = 0;
    var g = 0;
    var b = 0;
    var selector = 18;
        // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
        // Arduino pin # 7    8   9   10  11  12
        var index=0;
    lcd = new five.LCD({
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

    rotary.scale(0, 100).on("change", function() {
        if (r<250) r++;
        else if (g<250) g++;
        else if (b<250) b++;
        else {r=10;g=10;b=20;}
        if (productlist != null)     {
            if ((this.value/2) > selector+1) {selector=Math.round(this.scale(0,100).value/2);if (index<productlist.length) index++}
            if ((this.value/2) < selector-1) {selector=Math.round(this.scale(0,100).value/2);if (index>1) index--}
            lcd.clear();
            product_to_select = Math.min(index-1, productlist.length -1);
            if(product_to_select < 0){ product_to_select = 0 }
            lcd.cursor(0,0).print(productlist[product_to_select].name);
        }
        lcd.bgColor(r, g, b);
        lcd.cursor(1,0).print("knob:"+ index + " V"+ selector);
    });

    button.on("down",function(){
        var selectedProduct = productlist[index-1];
        console.log("selectedProduct");
        //console.log(selectedProduct);
        var productId = selectedProduct.id;

        oauth2.getClientCredentialsToken([options.scope])
            .then(function (token) {
                products.getProduct(token, productId)
                    .then(function(product){
                        cart.getAnonymousCart(token)
                            .then(function(cartObj){
                                price.getPriceForProductId(token, product.id)
                                    .then(function(price){
                                        cart.addToCart(token, cartObj.cartId, product, price[0])
                                            .then(function(item){
                                                cart.getCartDetails(token, cartObj.cartId)
                                                    .then(function(calculatedCart){
                                                        console.log("calculatedCart");
                                                        console.log(calculatedCart);
                                                    }, console.log);
                                            }, console.log);
                                    }, console.log);
                            }, console.log);
                    }, console.log);
            },console.log);



    });
});

function linear(start, end, step, steps) {
  return (end - start) * step / steps + start;
}
