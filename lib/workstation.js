// Contains the workstation related logic
// TODO: Refactor into importable config file
const WORKSTATION_ADDRESSES = {
  nodes: [
    { alias: "WING01", mac: "30:D0:42:EE:B0:2E", ip: "192.168.194.142" },
    { alias: "WING02", mac: "C8:F7:50:FD:3D:53", ip: "192.168.194.178" },
    { alias: "WING03", mac: "C8:F7:50:FD:3B:D5", ip: "192.168.194.66" },
    { alias: "WING04", mac: "00:D8:61:4F:0D:6B", ip: "192.168.194.121" },
  ],
};

// TODO: Make abstraction around networking layer to expose to discord
