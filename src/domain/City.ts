 import { CubeColor } from "../data/data";


export class City {
    name: string;
    color: CubeColor;
    cubes: Record<CubeColor, number>;
    x: number;
    y: number;
  constructor(name:string, color:CubeColor, cubes: Record<CubeColor, number>, x:number, y:number){
    this.name = name;
    this.color = color;
    this.cubes = cubes;
    this.x = x;
    this.y = y;
  }
}
