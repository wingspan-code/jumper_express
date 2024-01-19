// The main Discord interaction API
import {InteractionType, InteractionResponseType} from 'discord-interactions';

export default async (req) => {
  
  return req.clone().json().then( body => {
    const {type, id, data} = body;
    console.log("Received legitimate Discord interaction: ", data);
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
      if(name === 'jump'){
        const {options} = data;
        // ensure correct command format
        if(options.length === 1 && options[0].name === 'mode'){
          
          switch(options[0].value){
            case 'server':
              
              return Response.json({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                  content: "Hopefully I can serve you soon with hop-tionally fast delivery!",
                }
              }, {status: 200});
              break;
            case 'client':
              return Response.json({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                  content: "I am a tech-savvy marsupial, but right now I prefere to conquer virtual worlds from the comfort of my pouch.",
                }
              }, {status: 200});
              break;

            default:
              break;
          }
          
        }
        return Response.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "I'm still a baby'roo, can't jump that far yet :(",
          }
        }, {status: 200});
      }

    }
  });


}
