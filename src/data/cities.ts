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
  // --- Blue cities ---
  new CityData("San Francisco", "blue", ["Los Angeles","Chicago","Tokyo","Manila"], { blue:0, red:0, yellow:0, black:0 }, 100,400),
  new CityData("Chicago", "blue", ["San Francisco","Los Angeles","Mexico City","Atlanta","Montreal"], { blue:0, red:0, yellow:0, black:0 }, 200,350),
  new CityData("Atlanta", "blue", ["Chicago","Washington","Miami"], { blue:0, red:0, yellow:0, black:0 }, 250,400),
  new CityData("Montreal", "blue", ["Chicago","Washington","New York"], { blue:0, red:0, yellow:0, black:0 }, 250,300),
  new CityData("New York", "blue", ["Montreal","Washington","London","Madrid"], { blue:0, red:0, yellow:0, black:0 }, 300,280),
  new CityData("Washington", "blue", ["Atlanta","Miami","Montreal","New York"], { blue:0, red:0, yellow:0, black:0 }, 300,380),
  new CityData("London", "blue", ["New York","Madrid","Paris","Essen"], { blue:0, red:0, yellow:0, black:0 }, 400,250),
  new CityData("Madrid", "blue", ["New York","London","Paris","Sao Paulo","Algiers"], { blue:0, red:0, yellow:0, black:0 }, 380,320),
  new CityData("Paris", "blue", ["London","Madrid","Essen","Milan","Algiers"], { blue:0, red:0, yellow:0, black:0 }, 450,280),
  new CityData("Essen", "blue", ["London","Paris","Milan","St. Petersburg"], { blue:0, red:0, yellow:0, black:0 }, 500,250),
  new CityData("Milan", "blue", ["Essen","Paris","Istanbul"], { blue:0, red:0, yellow:0, black:0 }, 520,300),
  new CityData("St. Petersburg", "blue", ["Essen","Istanbul","Moscow"], { blue:0, red:0, yellow:0, black:0 }, 600,250),

  // --- Yellow cities ---
  new CityData("Los Angeles", "yellow", ["San Francisco","Chicago","Mexico City","Sydney"], { blue:0, red:0, yellow:0, black:0 }, 150,500),
  new CityData("Mexico City", "yellow", ["Los Angeles","Chicago","Miami","Bogota","Lima"], { blue:0, red:0, yellow:0, black:0 }, 220,500),
  new CityData("Miami", "yellow", ["Atlanta","Washington","Mexico City","Bogota"], { blue:0, red:0, yellow:0, black:0 }, 280,500),
  new CityData("Bogota", "yellow", ["Mexico City","Miami","Lima","Buenos Aires","Sao Paulo"], { blue:0, red:0, yellow:0, black:0 }, 300,600),
  new CityData("Lima", "yellow", ["Mexico City","Bogota","Santiago"], { blue:0, red:0, yellow:0, black:0 }, 250,650),
  new CityData("Santiago", "yellow", ["Lima"], { blue:0, red:0, yellow:0, black:0 }, 280,720),
  new CityData("Buenos Aires", "yellow", ["Bogota","Sao Paulo"], { blue:0, red:0, yellow:0, black:0 }, 350,700),
  new CityData("Sao Paulo", "yellow", ["Bogota","Buenos Aires","Madrid","Lagos"], { blue:0, red:0, yellow:0, black:0 }, 400,650),
  new CityData("Lagos", "yellow", ["Sao Paulo","Kinshasa","Khartoum"], { blue:0, red:0, yellow:0, black:0 }, 480,550),
  new CityData("Kinshasa", "yellow", ["Lagos","Johannesburg","Khartoum"], { blue:0, red:0, yellow:0, black:0 }, 520,600),
  new CityData("Johannesburg", "yellow", ["Kinshasa","Khartoum"], { blue:0, red:0, yellow:0, black:0 }, 540,650),
  new CityData("Khartoum", "yellow", ["Lagos","Kinshasa","Johannesburg","Cairo"], { blue:0, red:0, yellow:0, black:0 }, 550,500),

  // --- Black cities ---
  new CityData("Algiers", "black", ["Madrid","Paris","Istanbul","Cairo"], { blue:0, red:0, yellow:0, black:0 }, 420,360),
  new CityData("Cairo", "black", ["Algiers","Istanbul","Baghdad","Riyadh","Khartoum"], { blue:0, red:0, yellow:0, black:0 }, 500,400),
  new CityData("Istanbul", "black", ["Milan","St. Petersburg","Moscow","Baghdad","Cairo","Algiers"], { blue:0, red:0, yellow:0, black:0 }, 520,350),
  new CityData("Moscow", "black", ["St. Petersburg","Istanbul","Tehran"], { blue:0, red:0, yellow:0, black:0 }, 600,320),
  new CityData("Tehran", "black", ["Moscow","Baghdad","Karachi","Delhi"], { blue:0, red:0, yellow:0, black:0 }, 650,350),
  new CityData("Baghdad", "black", ["Istanbul","Cairo","Tehran","Karachi","Riyadh"], { blue:0, red:0, yellow:0, black:0 }, 580,380),
  new CityData("Riyadh", "black", ["Cairo","Baghdad","Karachi"], { blue:0, red:0, yellow:0, black:0 }, 600,420),
  new CityData("Karachi", "black", ["Baghdad","Riyadh","Tehran","Delhi","Mumbai"], { blue:0, red:0, yellow:0, black:0 }, 640,420),
  new CityData("Mumbai", "black", ["Karachi","Delhi","Chennai"], { blue:0, red:0, yellow:0, black:0 }, 660,460),
  new CityData("Delhi", "black", ["Tehran","Karachi","Mumbai","Chennai","Kolkata"], { blue:0, red:0, yellow:0, black:0 }, 700,400),
  new CityData("Chennai", "black", ["Mumbai","Delhi","Kolkata","Bangkok","Jakarta"], { blue:0, red:0, yellow:0, black:0 }, 740,480),
  new CityData("Kolkata", "black", ["Delhi","Chennai","Bangkok","Hong Kong"], { blue:0, red:0, yellow:0, black:0 }, 780,420),

  // --- Red cities ---
  new CityData("Bangkok", "red", ["Kolkata","Chennai","Jakarta","Ho Chi Minh City","Hong Kong"], { blue:0, red:0, yellow:0, black:0 }, 820,480),
  new CityData("Jakarta", "red", ["Chennai","Bangkok","Ho Chi Minh City","Sydney"], { blue:0, red:0, yellow:0, black:0 }, 860,550),
  new CityData("Ho Chi Minh City", "red", ["Bangkok","Jakarta","Hong Kong","Manila"], { blue:0, red:0, yellow:0, black:0 }, 880,500),
  new CityData("Hong Kong", "red", ["Kolkata","Bangkok","Ho Chi Minh City","Shanghai","Taipei","Manila"], { blue:0, red:0, yellow:0, black:0 }, 900,450),
  new CityData("Manila", "red", ["Hong Kong","Ho Chi Minh City","Sydney","San Francisco","Taipei"], { blue:0, red:0, yellow:0, black:0 }, 920,500),
  new CityData("Taipei", "red", ["Shanghai","Hong Kong","Osaka","Manila"], { blue:0, red:0, yellow:0, black:0 }, 950,420),
  new CityData("Shanghai", "red", ["Beijing","Seoul","Tokyo","Taipei","Hong Kong"], { blue:0, red:0, yellow:0, black:0 }, 960,380),
  new CityData("Beijing", "red", ["Shanghai","Seoul"], { blue:0, red:0, yellow:0, black:0 }, 980,340),
  new CityData("Seoul", "red", ["Beijing","Shanghai","Tokyo"], { blue:0, red:0, yellow:0, black:0 }, 1000,360),
  new CityData("Tokyo", "red", ["Seoul","Shanghai","Osaka","San Francisco"], { blue:0, red:0, yellow:0, black:0 }, 1020,400),
  new CityData("Osaka", "red", ["Tokyo","Taipei"], { blue:0, red:0, yellow:0, black:0 }, 1040,420),
  new CityData("Sydney", "red", ["Los Angeles","Jakarta","Manila"], { blue:0, red:0, yellow:0, black:0 }, 1100,550),
];
