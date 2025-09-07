export const cities = [
  {
    name: "Atlanta",
    color: "blue",
    connections: ["Washington", "Chicago"],
    cubes: { blue: 0, red: 0, yellow: 0, black: 0 },
    x: 396, 
    y: 475 
  },
  {
    name: "Chicago",
    color: "blue",
    connections: ["Atlanta", "San Francisco"],
    cubes: { blue: 1, red: 1, yellow: 2, black: 0 },
    x: 349,
    y: 372
  },
  {
    name: "Miami",
    color: "yellow",
    connections: ["Washington"],
    cubes: { blue: 0, red: 1, yellow: 0, black: 0 },
    x: 480,
    y: 588
  },
  {
    name: "Washington",
    color: "blue",
    connections: ["Atlanta", "Miami"],
    cubes: { blue: 0, red: 0, yellow: 0, black: 1 },
    x: 542,
    y: 470
  },
    {
    name: "San Francisco",
    color: "blue",
    connections: ["Los Angeles", "Chicago", "Manila", "Tokyo"],
    cubes: { blue: 0, red: 0, yellow: 0, black: 1 },
    x: 170,
    y: 425
  },
  {
    name: "Tokyo",
    color: "red",
    connections: ["Seoul", "Shanghai", "Osaka", "San Francisco"],
    cubes: { blue: 0, red: 2, yellow: 0, black: 0 },
    x: 1826,
    y: 425
  }
  // Add more cities...
];
