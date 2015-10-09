var oauth2 = require('./libs/oauth2.js');
var options = require('./options.js');
var products = require('./libs/products.js');

oauth2.getClientCredentialsToken(['hybris.pubsub.topic=' + options.projectAndApp + '.' + options.pubsub_event])
    .then(function (token) {
        console.log("Got a lovely client credentials token, starting polling!");
        products.displayProducts(token)
            .then(function (evt) {
                if (evt == undefined) {
                    console.log("No event.");
                }else {
                    console.log(evt);
                }
            }, console.log);
    }, console.log);

