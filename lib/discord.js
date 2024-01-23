// The main Discord interaction API
import {InteractionType, InteractionResponseType} from 'discord-interactions';
import {TestButtons, ListWorkstations, ServerStatus} from './ui.js'
import {try_to_wake, get_workstation_status, ensure_server_running} from './workstation.js';
import { DelayedReply } from './utils.js';

export default async (req, res) => {
    
    const {type, id, data, channel_id} = req.body;

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
              const opserver = async () => {
                const server_state = await ensure_server_running()
                DelayedReply(channel_id, {
                      content: ServerStatus(server_state)
                });
              }
              opserver()
              return ({
                type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                  content: "Checking on server. Wait a sec!"
                }
              })

            case 'client':
              const opclient = async () => {
                const clients = await get_workstation_status();
                console.log(clients) // TODO: Check the output format and order!
                DelayedReply(channel_id, {
                    content: "Here are the nodes I could find:",
                    components: ListWorkstations(clients),
                });
              }
              opclient()
              return ({
                type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                  content: "Getting the node list to jump to!"
                }
              })

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
      } else {
        console.log(`Button ${compId} pressed.`)
        const nodeButtonOp = async () => {
          const wake_result = await try_to_wake(compId)
          if(!wake_result){
              DelayedReply(channel_id, {
                content: "❌ Oh no! I didn't jump far enough, wanna try again?\n(Just click one of the previous buttons)"
              })
          }  
          const workstations = await get_workstation_status()
            DelayedReply(channel_id, {
                content: "✅ Here is the updated list",
                components: ListWorkstations(workstations)
            });
        }
        nodeButtonOp();
        return ({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `Let's bounce to ${compId} 🤓 !` 
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
