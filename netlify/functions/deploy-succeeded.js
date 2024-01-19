// Function to run after successfull deploy automatically to register Discord commands once
const register = require('../../lib/commands.js')
module.exports = () => {
	try {
		register(Netlify.env.get('APP_ID'), Netlify.env.get('DISCORD_TOKEN'));
	} catch {
		console.log("WARNING: This function requires a Netlify environment!");
	}
}
