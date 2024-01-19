// Main API processing discord interactions
import discord from '../../lib/discord.js'
import {Timer, VerifyDiscordInteraction} from '../../lib/utils.js'

export default async (req, context) => {
	const timer = Timer();
	return await VerifyDiscordInteraction(Netlify.get("DISCORD_KEY"), req, () => {
		const response_to_discord = discord(req); 
		console.log(`It took ${timer()} to process request ${req.body.id}`);
		return response_to_discord;
	})
}
