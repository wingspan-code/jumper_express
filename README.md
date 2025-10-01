# jumper-express
This implementation sits on the physical device: the Raspberry Pi,
acting as a network polling and WOL (Magic Packet) wake up service for the configured nodes.
It also acts as a Discord bot interacting with discord_interactions serving the endpoint over the
reverse proxy Ngrok. To interact with Discord the bot needs to authenticate with a Token and Public Key 
found on the Bot sub-page of the Application development page.

This implementation replaces the older Netlify API completely.
