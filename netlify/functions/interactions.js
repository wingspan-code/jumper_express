// Main API processing discord interactions
import discord from '../../lib/discord.js'
import {Timer} from '../../lib/utils.js'

export default async (req, context) => {
	const timer = Timer();
	const response_to_discord = await discord(req); 
	console.log(`It took ${timer()} to process request ${req.body.id}`);
	return response_to_discord;
}
