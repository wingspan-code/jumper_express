// Function to run after successfull deploy automatically to register Discord commands once
import register from '../../lib/commands.js';
export default () => {
	try {
		register(Netlify.env.get('APP_ID'), Netlify.env.get('DISCORD_TOKEN'));
	} catch(err) {
		console.error(err);
		console.log("WARNING: This function requires a Netlify environment!");
	}
}
