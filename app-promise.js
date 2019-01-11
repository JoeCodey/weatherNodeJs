const axios = require('axios') ; 
const yargs = require('yargs') ; 
var fs = require('fs') ; 
const geocode = require('./geocode/geocode.js')

var authRaw = fs.readFileSync('sensitive.json')
var auth = JSON.parse(authRaw);



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


var encodedAddress = encodeURIComponent(argv.address) ; 

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${auth.geo}`; 




axios.get(geocodeUrl).then((response)=>{
	if (response.data.status == 'ZERO_RESULTS'){
		throw new Error('Unable to find that address') 
	}
	
	var lat = response.data.results[0].geometry.location.lat ; 
	var lng = response.data.results[0].geometry.location.lng ;
	var weatherUrl = `https://api.darksky.net/forecast/${auth.weather}/${lat},${lng}/?units=ca` ; 
	var formatted_address = response.data.results[0].formatted_address ;
	console.log(formatted_address) ;
	return axios.get(weatherUrl) ; 

}).then( (response) => {
	var temperature = response.data.currently.temperature ; 
	var apparentTemperature = response.data.currently.apparentTemperature ; 
	console.log("it's currently ", temperature," but it feels like ", apparentTemperature);

}).catch((e) =>{
	if(e.code == 'ENOTFOUND'){
		console.log('unable to connec to server') ;
	}else{
	console.log(e.message) ; 
	}
});

