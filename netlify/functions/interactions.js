// Main API processing discord interactions
import discord from '../../lib/discord.js'
import {Timer, VerifyDiscordInteraction} from '../../lib/utils.js'

export default async (req, context) => {
	const timer = Timer();
	const response = await VerifyDiscordInteraction(Netlify.env.get("DISCORD_KEY"), req.clone(), () => {
		const response_to_discord = discord(req.clone()); 
		return response_to_discord;
	})
	console.log(`respond after ${timer()}: ${response.clone().status}`);
	return response;
}
