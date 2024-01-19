// The main Discord interaction API
import {InteractionType, InteractionResponseType} from 'discord-interactions';

export default async (req) => {
  
  req.json().then( body => {
    console.log(req, body);
    const {type, id, data} = body;
    if (type === InteractionType.PING) {
      return Response.json({ type: InteractionResponseType.PONG });
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
  });


}
