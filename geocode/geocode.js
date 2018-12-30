const request = require('request') ; 
const fs = require('fs');

var authRaw = fs.readFileSync('sensitive.json')
var auth = JSON.parse(authRaw);

// console.log("W = " + myLines.weather) ;
// console.log("G = " + myLines.geo) ;

var geocodeAddress = (address, callback) => {

	var encodedAddress = encodeURIComponent(address) ; 
request({
	url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${auth.geo}`,
	json: true
}, (error, response, body) => {
	//console.log(JSON.stringify(response,undefined,2)) ;
	if (error){
		callback("Unable to connect to Google servers.");
	} else if (body.status === 'ZERO_RESULTS'){
		callback("Address was not found, anywhere ... on ,(You Stay Classy,), planet Earth ");
	} else if (body.status === 'OK'){

		callback(undefined,{
			Address: body.results[0].formatted_address,
			Latitude: body.results[0].geometry.location.lat ,
			Longitude: body.results[0].geometry.location.lng  
		});
	
	}
	
	// console.log(JSON.stringify(body,undefined,2)) ;
	
} ) ;

} ; 

var weatherAtLocation = (lat,lng, callback)=>{
	var locCoordinates = lat + ',' + lng ;
	var encodedLocation = encodeURIComponent(locCoordinates);
	console.log(`https://api.darksky.net/forecast/${auth.weather}/${encodedLocation}`);
	request({
		url: `https://api.darksky.net/forecast/${auth.weather}/${encodedLocation}`,
		json: true 
	}, (error, response, body) =>{
		console.log(JSON.stringify(response,undefined,2)) ;
		console.log("\n\n**************************\n\n") ; 
		console.log(JSON.stringify(body,undefined,2)) ;

	}) ; 

};

module.exports.geocodeAddress = geocodeAddress ;	
module.exports.weatherAtLocation = weatherAtLocation 

