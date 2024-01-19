// The main Discord interaction API
import {InteractionType, InteractionResponseType} from 'discord-interactions';

export default async (req) => {
  
  return req.clone().json().then( body => {
    const {type, id, data} = body;
    if (type === InteractionType.PING) {
      return Response.json({ type: InteractionResponseType.PONG }, {status: 200});
    }
    if(type === InteractionType.APPLICATION_COMMAND){
      const {name} = data;
      if(name === 'boing'){

        return Response.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'Boing, Boing, Boing!',
          }
        }, {status: 200});
      }
    }
  });


}
