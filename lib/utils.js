import fetch from 'node-fetch';
import nacl from 'tweetnacl';
import {verifyKey} from 'discord-interactions';

// Refer to: https://discord.com/developers/docs/interactions/receiving-and-responding#security-and-authorization
export function VerifyDiscordRequest(clientKey) {
  return function (req, res, buf, encoding) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send('Bad request signature');
      throw new Error('Bad request signature');
    }
  };
}

export const Timer = () => {
  const time_start = Date.now();
  return () => {
    const time_end = Date.now();
    const time_elapsed = time_end - time_start;
    const in_seconds = time_elapsed / 1000;
    const in_minutes = in_seconds / 60;
    const timecode = `${Math.trunc(in_minutes)}:${Math.round((in_minutes - Math.trunc(in_minutes)) * 60)}`;
    console.log(`Full request processed in ${timecode}`);

  }
}

const DiscordRequest = (token) => async (endpoint, options) => {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use node-fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  console.log("Success: " + {...res});
  return res;
}

export const AuthDiscordRequest = DiscordRequest 

export const InstallGlobalCommands = async (appId, token, commands) => {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;
  console.log(appId, token);
  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(token)(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

export const DelayedReply = async (channel, message) => {
  return DiscordRequest(process.env.DISCORD_TOKEN)(`channels/${channel}/messages`, {method: 'POST', body: message})
}

export const logObjectOnCLI = obj => {
  console.log(JSON.stringify(obj));
}