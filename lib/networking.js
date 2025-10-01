import wol from 'wol'
import ping from 'ping'
import { logObjectOnCLI } from './utils.js';


// This functions return Promises which can be resolved with await, and Promise.all respectively

export const wake = wol.wake

export const pingNode = node => ping.promise.probe(node.ip).then(res => {
    console.log(`Pinged ${node.alias} (${node.ip}):`);
    logObjectOnCLI(res);
    return {...node, awake: res.alive}
})

export const poll = nodes => nodes.map(pingNode);

