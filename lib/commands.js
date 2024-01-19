import {InstallGlobalCommands} from './utils.js';

const JUMP_COMMAND = {
  name: 'jump',
  description: 'Start a machine through Jumpbox',
  options: [
    {
      type: 3,
      name: 'mode',
      description: 'Pick your mode',
      required: true,
      choices: [{name: "SERVER", value: 'server'}, {name: "INSIDE", value: 'client'}],
    },
  ],
  type: 1,
}

const HELP_COMMAND = {
}

const BOING_COMMAND = {
  name: 'boing',
  description: "Just my way of doing a test ping, suited for Kangaroos",
  type: 1
}

export default (appId, botToken) => {
    InstallGlobalCommands(appId, botToken, [JUMP_COMMAND, BOING_COMMAND]); 
}
