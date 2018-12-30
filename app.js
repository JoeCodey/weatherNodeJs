const request = require('request'); 
const yargs = require('yargs') ; 
const geocode = require('./geocode/geocode.js')


const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: "Address to fetch wheather for",
			string: true 
		}
	})	
	.help()
	.alias('help','h')
	.argv ; 

var lat, lng ; 


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
	if(errorMessage){
		console.log(errorMessage) ; 
	}else{
		console.log(JSON.stringify(results, undefined, 2));
		lat = results.Latitude ; 
		lng = results.Longitude ; 
		console.log("lat/lng: "+lat+ " " + lng) ; 

	}
}) ; 

geocode.weatherAtLocation(lat,lng,(errorMessage, results)=>{
	console.log("/**\t*****&&& Attempting to retrive weather.") ;
});

