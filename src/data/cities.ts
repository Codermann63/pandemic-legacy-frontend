export class CityData{

  constructor(name:string, color:string, connections:string[], cubes:Cubes, x:number, y:number){
    this.name = name;
    this.color = color;
    this.connections = connections;
    this.cubes = cubes;
    this.x = x;
    this.y = y;
  }
  name: string;
  color: string;
  connections: string[];
  cubes: Cubes;
  x: number;
  y: number;
}

export type CubeColor = "blue" | "red" | "yellow" | "black";
export type Cubes = Record<CubeColor, number>;

export const cities: CityData[] = [
  new CityData(
    "Atlanta",
    "blue",
    ["Washington", "Chicago"],
    { blue: 1, red: 1, yellow: 2, black: 0 },
    396, 
    475 
  ),
  new CityData(
    "Chicago",
    "blue",
    ["Atlanta", "San Francisco"],
    { blue: 1, red: 1, yellow: 2, black: 0 },
    349,
    372
  ),
  new CityData(
    "Miami",
    "yellow",
    ["Washington"],
    { blue: 0, red: 1, yellow: 0, black: 0 },
    480,
    588
  ),
  new CityData(
    "Washington",
    "blue",
    ["Atlanta", "Miami"],
    { blue: 0, red: 0, yellow: 0, black: 1 },
    542,
    470
  ),
  new CityData(
    "San Francisco",
    "blue",
    ["Los Angeles", "Chicago", "Manila", "Tokyo"],
    { blue: 0, red: 0, yellow: 0, black: 1 },
    170,
    425
  ),
  new CityData(
    "Tokyo",
    "red",
    ["Seoul", "Shanghai", "Osaka", "San Francisco"],
    { blue: 0, red: 2, yellow: 0, black: 0 },
    1826,
    425
  )
  // Add more cities...
];
