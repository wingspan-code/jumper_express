// Main API processing discord interactions
import discord from '../../lib/discord.js'
import {Timer, VerifyDiscordInteraction} from '../../lib/utils.js'

export default async (req, context) => {
	const timer = Timer();
	const response = await VerifyDiscordInteraction(Netlify.env.get("DISCORD_KEY"), req, () => {
		const response_to_discord = discord(req); 
		return response_to_discord;
	})
	console.log(`It took ${timer()} to process request ${req.body.id}`);
	return response;
}
