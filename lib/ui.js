// Enter Button logic here
import {MessageComponentTypes, ButtonStyleTypes} from 'discord-interactions';



const ActionRow = (listOfComponents) => ({
  type: MessageComponentTypes.ActionRow,
  components: listOfComponents
})


const WorkstationButton = (id, label, isOn) => ({
  type: MessageComponentTypes.BUTTON,
  custom_id: id,
  label,
  style: isOn ? ButtonStyleTypes.PRIMARY : ButtonStyleTypes.SECONDARY,
  disabled: isOn,
})

export const ListWorkstations = (listOfWS) => ([
  ActionRow([WorkstationButton(listOfWS[0].id, listOfWS[0].name, listOfWS[0].on)]),
  ActionRow(listOfWS.slice(1).map(ws => WorkstationButton(ws.id, ws.name, ws.on))
])

export const TestButtons = () => ([
  ActionRow(['test1', 'test2', 'test3'].map(id => WorkstationButton(id, id.toUpperCase(), id > 2))
])

export const ServerStatus = () => {
}
