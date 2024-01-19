// Function to run after successfull deploy automatically to register Discord commands once
const register = require('../../lib/commands.js')
if(global.Netlify != undefined){
	register(Netlify.env.get('APP_ID'), Netlify.env.get('DISCORD_TOKEN'));
} else {
	console.log("WARNING: This function requires a Netlify environment!");
}
