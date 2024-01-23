// Enter Button logic here
import {MessageComponentTypes, ButtonStyleTypes} from 'discord-interactions';



const ActionRow = (listOfComponents) => ({
  type: MessageComponentTypes.ACTION_ROW,
  components: listOfComponents
})


const WorkstationButton = (id, label, isOn) => ({
  type: MessageComponentTypes.BUTTON,
  custom_id: id,
  label,
  style: isOn ? ButtonStyleTypes.PRIMARY : ButtonStyleTypes.SECONDARY,
  disabled: isOn,
})

export const ListWorkstations = (listOfWS) => [
  ActionRow([WorkstationButton(listOfWS[0].alias, '🖥 ' + listOfWS[0].alias, listOfWS[0].awake)]),
  ActionRow(listOfWS.slice(1).map(ws => WorkstationButton(ws.alias, ws.alias, ws.awake)))
]

export const TestButtons = () => [
  ActionRow(['test1', 'test2', 'test3'].map( (id, i) => WorkstationButton(id, id.toUpperCase(), i > 1)))
]

export const ServerStatus = change => 
    change.before ? 
      "✅ Server is already running, have fun!" 
      : (change.now ? 
        "✅ (Server was sleeping), it is running now!" 
        : "❌ Mommy, the Server won't wake up. Is it dead?")
