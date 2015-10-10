var
	request = require('request'),
	options = require('../options.js'),
	_ = require('underscore')
	;

exports.getAnonymousCart = function(token) {
	var promise = new Promise(function(resolve, reject){
		request({
			url : options.base + '/cart/b1/'+options.tenant+'/carts/',
			method : 'POST',
			headers : {'Authorization' : 'Bearer ' + token},
			json : true,
			body : {
				"currency" : options.currency,
				"siteCode" : options.siteCode
			}
		}, function(error, response, body) {
			if (error)
				reject(error);
			else {
				console.log(body);
				resolve(body);
			}
		});

	});

	return promise;
};

exports.addToCart = function(token, cartId, product, price) {
	console.log('cartid');
	console.log(cartId);
	console.log('producti');
	console.log(product);
	console.log('price');
	console.log(price);
	var promise = new Promise(function(resolve, reject){
		request({
			url : options.base + '/cart/b1/'+options.tenant+'/carts/'+cartId+'/items',
			method : 'POST',
			headers : {'Authorization' : 'Bearer ' + token},
			json : true,
			body : {
				"product": {
					"id": product.id,
					"description": product.description,
					"name": product.name,
					"images": [],
					"sku": product.sku
				},
				"price": {
					"originalAmount": price.originalAmount,
					"effectiveAmount": price.effectiveAmount,
					"currency": price.currency,
					"priceId": price.priceId
				},
				"quantity": 1
			}
		}, function(error, response, body) {
			if (error) {
				//console.log(error);
				reject(error);
			}
			else {
				//console.log(body);
				resolve(body);
			}
		});

	});

	return promise;
};

// not sure if working
exports.updateCart = function(token, cartId) {
	var promise = new Promise(function(resolve, reject){
		request({
			url : options.base + '/cart/b1/'+options.tenant+'/carts/'+cartId,
			method : 'PUT',
			headers : {'Authorization' : 'Bearer ' + token},
			json : true,
			body : {
				"zipCode": "02201-2021",
				"countryCode": "US",
			}
		}, function(error, response) {
			if (error) {
				console.log(error);
				reject(error);
			}
			else {
				console.log(response);
				resolve(response);
			}
		});

	});

	return promise;
};

exports.getCartDetails = function(token, cartId) {
	var promise = new Promise(function(resolve, reject){
		request({
			url : options.base + '/cart/b1/'+options.tenant+'/carts/'+cartId,
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