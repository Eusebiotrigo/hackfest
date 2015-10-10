var
    request = require('request'),
    options = require('../options.js')
    ;


exports.displayProducts = function (token) {

    var url = options.base + '/product/b1/e2y/products';
    console.log(url);

    return new Promise(function (resolve, reject) {

        request({
            url: url,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token},
            json: true

        }, function (error, response, body) {
            if (error)
                reject(error);
            else
                resolve(body);
        });


    });
};

exports.getProduct = function (token, productId) {

    var promise = new Promise(function (resolve, reject) {

        request({
            url: options.base + '/product/b1/' + options.tenant + '/products/' + productId,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token},
            json: true
        }, function (error, response, body) {
            if (error)
                reject(error);
            else
                resolve(body);
        });


    });

    return promise;
};


