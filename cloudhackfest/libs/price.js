var
	request = require('request'),
	options = require('../options.js'),
	_ = require('underscore')
	;
exports.getPriceForProductId = function(token, productId) {
	var promise = new Promise(function(resolve, reject){
		request({
			url : options.base + '/price/b1/'+options.tenant+'/prices?productId='+productId,
			method : 'GET',
			headers : {'Authorization' : 'Bearer ' + token},
			json : true
		}, function(error, response, body) {
			if (error) {
				console.log(error);
				reject(error);
			}
			else {
				console.log(body);
				resolve(body);
			}
		});

	});

	return promise;
};