// Contains the workstation related logic
import workstations from "../workstation.config.json" with {type: "json"}
import {poll, wake, pingOne} from "./networking.js"
const {nodes} = workstations

const getNode = alias => nodes.find(node => node.alias === alias)

export const get_workstation_status = async () => await Promise.all(poll(nodes))

export const ensure_server_running = async () => {
  const node_status = await pingOne(nodes[0]);
  if (node_status.awake) {
    return {before: true, now: true}
  } else {
    const wake_result = await try_to_wake(node_status.alias)
    return {before: false, now: wake_result}
  }
}

export const try_to_wake = async node_alias => {

  try {
    await wake(getNode(node_alias).mac)
  } catch (err) { 
    console.error(err)
    return false;
  }

  return true;
}
