
const request = require('request') ; 
const fs = require('fs');

var authRaw = fs.readFileSync('../sensitive.json')
var auth = JSON.parse(authRaw);

var geocodeAddress = (address) =>{
		return new Promise((resolve, reject)=>{
			var encodedAddress = encodeURIComponent(address) ; 
		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${auth.geo}`,
			json: true
		}, (error, response, body) => {
			//console.log(JSON.stringify(response,undefined,2)) ;
			if (error){
				reject('unable to contact google servers');
				
			} else if (body.status === 'ZERO_RESULTS'){
				reject({error: 'Address was not found, anywhere...on, you stay classy, Planet Earth. '	
					});
				// callback("Address was not found, anywhere ... on ,(You Stay Classy,), planet Earth ");
			} else if (body.status === 'OK'){
				resolve({
					Address: body.results[0].formatted_address,
					Latitude: body.results[0].geometry.location.lat ,
					Longitude: body.results[0].geometry.location.lng  
				});		
			}

	
		} ) ;
		});
};

geocodeAddress('1332876548675').then((location) => {
		console.log(JSON.stringify(location, undefined, 2));	
}, (errorMessage) => {
	
	console.log(JSON.stringify(errorMessage, undefined, 2));	
}) ; 