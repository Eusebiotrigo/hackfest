var
    request = require('request'),
    options = require('../options.js')
    ;

exports.createCustomer = function (token, payload) {
    var promise = new Promise(function (resolve, reject) {

        var url = options.base + '/customer/b1/' + options.tenant + '/signup';
        var jsonPayload = JSON.stringify(payload);

        request({
            url: url,
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + token},
            json: true,
            body: {
                "payload": JSON.stringify(jsonPayload)
            }
        }, function (error, response, body) {
            console.log(url);
            console.log(payload);
            console.log(jsonPayload);
            if (error || response.statusCode != 201) {
                console.log("something went wrong trying to create a customer");
                reject(error);
            }
            else{
                console.log("created customer");
                resolve();
            }
        });
    });
    return promise;
};

exports.logInCustomer = function (token, payload) {
    var promise = new Promise(function (resolve, reject) {

        var url = options.base + '/customer/b1/' + options.tenant + '/login';
        var jsonPayload = JSON.stringify(payload);

        request({
            url: url,
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + token},
            json: true,
            body: {
                "payload": payload
            }
        }, function (error, response, body) {
            console.log(url);
            console.log(payload);
            console.log(jsonPayload);
            if (error || response.statusCode != 200) {
                console.log("something went wrong trying to log in  a customer");
                console.log(error)
                reject(error);
            }
            else{
                console.log("created customer");
                resolve();
            }
        });
    });
    return promise;
};
