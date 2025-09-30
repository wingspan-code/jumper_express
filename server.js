import express from "express"

import discord_bot from "./lib/discord.js"
import {VerifyDiscordRequest} from './lib/utils.js'
import ngrok_url from './lib/ngrok.js'

const app = express();

app.use(express.json({verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}));

const PORT = process.env.PORT || 8080;

app.post("/discord_interaction", async (req, res) => {
  const response = await discord_bot(req, res);
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
});

