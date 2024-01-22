// Contains the workstation related logic
import workstations from "../workstation.config.json" with {type: "json"}
import {poll, wake} from "./networking.js"
const {nodes} = workstations

export const get_workstation_status = async () => await Promise.all(poll(nodes))

export const try_to_wake = async node_alias => {

  try {
    await wake(nodes.find(node => node.alias === node_alias).mac)
  } catch (err) { 
    console.error(err)
    return false;
  }

  return true;
}
