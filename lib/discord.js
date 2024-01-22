// The main Discord interaction API
import {InteractionType, InteractionResponseType} from 'discord-interactions';
import {TestButtons} from './ui.js'

export default async (req) => {
    
    const {type, id, data} = body;

    console.log("Received legitimate Discord interaction: ", type, id, data);
    
    if (type === InteractionType.PING) {
      return ({type: InteractionResponseType.PONG });
    }

    if(type === InteractionType.APPLICATION_COMMAND){

      const {name} = data;
    
      if(name === 'boing'){

        return ({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'Boing, Boing, Boing!',
          }
        }) 
      }
      // THIS IS THE MAIN WORKSTATION ENTRYPOINT
      if(name === 'jump'){
        const {options} = data;
        // ensure correct command format
        if(options.length === 1 && options[0].name === 'mode'){
          
          switch(options[0].value){
            
            case 'server':
              
              return ({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                  content: "Hopefully I can serve you soon with hop-tionally fast delivery!",
                }
              });
              break;

            case 'client':
              return ({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                  content: "I am a tech-savvy marsupial, but right now I prefere to conquer virtual worlds from the comfort of my pouch.",
                  components: TestButtons(),
                }
              });
              break;

            default:
              break;
          }
          
        }
      }

    }
    // Handle Button Interactions
    if(type === InteractionType.MESSAGE_COMPONENT){
      const compId = data.custom_id;
      
      if(compId.includes('test')){
        return ({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `You clicked test button ${compId}, didn't jump, but was still great!` 
          }
        });
      }
      
    }
  
    console.log("Unsupported discord interaction");
    return ({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "I'm still a baby'roo, can't jump that far yet :(",
      }
    });
}
