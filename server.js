import express from "express"

import discord_bot from "./lib/discord.js"
import {Timer,VerifyDiscordRequest} from './lib/utils.js'

const app = express();

app.use(express.json({verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}));

const PORT = process.env.PORT || 8080;

app.post("/discord_interaction", async (req, res) => {
  const timer = Timer();
  const bot_response = await discord_bot(req);
  console.log(`respond after ${timer()}: ${JSON.stringify(bot_response)}`);
  return res.send(bot_response);
});

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
});
