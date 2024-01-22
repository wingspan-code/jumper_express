
// TODO: Refactor networking to self-contained async functions  
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
