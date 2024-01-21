// Main API processing discord interactions
import discord from '../../lib/discord.js'
import {Timer, VerifyDiscordInteraction} from '../../lib/utils.js'

export default async (req, context) => {
	const timer = Timer();
	const response = await VerifyDiscordInteraction(Netlify.env.get("DISCORD_KEY"), req.clone(), () => {
		const response_to_discord = discord(req.clone()); 
		return response_to_discord;
	})
	const json = await response.clone().json();
	console.log(`respond after ${timer()}: ${response.clone().status} -> ${json}`);
	return response;
}
