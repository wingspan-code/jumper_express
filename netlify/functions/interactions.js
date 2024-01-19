// Main API processing discord interactions
const discord = require('../../lib/discord.js')
const {Timer} = require('../../lib/utils.js')

module.exports = async (req, context) => {
	const timer = Timer();
	const response_to_discord = await discord(req, new Response());
	console.log(`It took ${timer()} to process request ${req.body.id}`);
	return response_to_discord;
}
