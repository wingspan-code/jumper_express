import {InstallGlobalCommands} from './utils.js';

const JUMP_COMMAND = {
  name: 'jump',
  description: 'Start a machine(s) through the Jumpbox',
  options: [
    {
      type: 3,
      name: 'mode',
      description: 'Jump where? 1.SERVER [Use node 1 as Server] • 2. INSIDE [Access one of the nodes remotely]',
      required: true,
      choices: [{name: "SERVER", value: 'server'}, {name: "INSIDE", value: 'client'}],
    },
  ],
  type: 1,
}

const BOING_COMMAND = {
  name: 'boing',
  description: "Just my way of doing a test ping, suited for Kangaroos",
  type: 1
}

export default (appId, botToken) => {
    InstallGlobalCommands(appId, botToken, [JUMP_COMMAND, BOING_COMMAND]); 
}
