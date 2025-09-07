import { CityData } from "../data/data";
import { City } from "./City";

export class Network {


  private adj = new Map<string, Set<string>>();
  cities: Map<string, City> = new Map();
  roadList: string[][] = [];

  constructor(cities: CityData[]) {
    for (const c of cities) {
      // Build adjacency list
      if (!this.adj.has(c.name)) this.adj.set(c.name, new Set());
      for (const n of c.connections) {
        this.adj.get(c.name)!.add(n);
        //if (!this.adj.has(n)) this.adj.set(n, new Set()); TODO add connections both ways
        //this.adj.get(n)!.add(c.name);
        this.roadList.push([c.name, n]);
      }
      // Create City domain Object
      this.cities.set(c.name, new City(c.name, c.color as any, {...c.cubes}, c.x, c.y));
    }
  }


  neighbors(name: string) { return [...(this.adj.get(name) || [])]; }
  canMove(a: string, b: string) { return this.areAdjecent(a, b); }
  areAdjecent(a: string, b: string) { return this.adj.get(a)?.has(b) ?? false;}
}
