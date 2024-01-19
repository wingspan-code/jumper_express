// The main Discord interaction API
const {InteractionType, InteractionResponseType} = require('discord-interactions');

module.exports = async (req) => {
  
  const {type, id, data} = req.body;
  if (type === InteractionType.PING) {
    return Resonse.json({ type: InteractionResponseType.PONG });
  }
  if(type === InteractionType.APPLICATION_COMMAND){
    const {name} = data;
    if(name === 'boing'){
      
      return Response.json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'Boing, Boing, Boing!',
        }
      });
    }
  }


}
