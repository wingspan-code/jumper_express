const express = require("express");
const wol = require("wake_on_lan");
const { exec } = require("child_process");
const app = express();
app.use(express.json());

const PORT = 8080;

const CONFIG_FILE = {
  nodes: [
    { alias: "WING01", mac: "30:D0:42:EE:B0:2E", ip: "192.168.194.142" },
    { alias: "WING02", mac: "C8:F7:50:FD:3D:53", ip: "192.168.194.178" },
    { alias: "WING03", mac: "C8:F7:50:FD:3B:D5", ip: "192.168.194.66" },
    { alias: "WING04", mac: "00:D8:61:4F:0D:6B", ip: "192.168.194.121" },
  ],
};

function wakeOnLan(mac) {
  return new Promise((resolve, reject) => {
    wol.wake(mac, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function isAwake(ip) {
  return new Promise((resolve) => {
    exec(`ping -c 1 ${ip}`, (error) => {
      resolve(!error);
    });
  });
}

app.post("/", async (req, res) => {
  try {
    const { alias, mac } = req.body;
    let targetMac = mac;

    if (alias) {
      const node = CONFIG_FILE.nodes.find((n) => n.alias === alias);
      targetMac = node ? node.mac : null;
    }

    if (targetMac) {
      await wakeOnLan(targetMac);
      console.log(`Magic packet sent to ${targetMac}`);
      res.send(`Magic packet sent to ${targetMac}`);
    } else {
      res.status(400).send("Invalid request");
    }
  } catch (e) {
    console.error(`Error in wake_on_lan: ${e}`);
    res.status(500).send("Internal server error");
  }
});

app.get("/heartbeat", async (req, res) => {
  try {
    const checks = CONFIG_FILE.nodes.map(async (node) => ({
      alias: node.alias,
      isAwake: await isAwake(node.ip),
    }));

    const results = await Promise.all(checks);
    const response = {
      awake_count: results.filter((r) => r.isAwake).length,
      total_nodes: CONFIG_FILE.nodes.length,
      status: "OK",
      awake_nodes: results.filter((r) => r.isAwake).map((r) => r.alias),
      asleep_nodes: results.filter((r) => !r.isAwake).map((r) => r.alias),
    };

    console.log("Heartbeat checked");
    res.send(response);
  } catch (e) {
    console.error(`Error in heartbeat check: ${e}`);
    res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
});
