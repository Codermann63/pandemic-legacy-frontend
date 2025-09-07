

export class Player {
  id: string;
  name: string;
  location: string
  img: string;
  constructor(id: string, name: string, location: string, img: string){
      this.id = id;
      this.name = name;
      this.location = location;
      this.img = img;
  }
}