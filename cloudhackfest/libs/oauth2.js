var 
	request = require('request'),
	options = require('../options.js')
	;


exports.getClientCredentialsToken = function(scopes) {
	
	var promise = new Promise(function(resolve, reject){

		request({
				url : options.base + '/oauth2/b1/token',
				method : 'POST',
				form : { 
					grant_type : 'client_credentials',
					scope : scopes.join(' '),
					client_id : options.client_id,
					client_secret : options.client_secret
				}
			}, function(error, response, body) {
				if (error)
				{
					reject(error);
				}
				else
				{
					console.log(body);
					resolve(JSON.parse(body).access_token);
				}
			});


	});

	return promise;
};	

exports.getCustomerAccessToken = function(email, password, clientCredentialsToken) {
	
	return new Promise(function(resolve, reject){
		request({
			url : options.base + '/customer/b1/minecraft/login',
			method : 'POST',
			headers : {'Authorization' : 'Bearer ' + clientCredentialsToken},
			json:true,
			body: {
				  "email": email,
				  "password": password
			}
		}, function(error, response, body) {
			resolve(body.accessToken);
		});		
	});
	
};