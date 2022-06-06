export class Product {
    id : Number
    title: string;
    type: string;
    genre: string;
    price: number;
    rating: number;
    filename: string;
    nbr_vu : string
  
    constructor(id,title,type,image,genre,nbr_vu) {
      this.id = id
      this.title = title;
      this.type = type;
      this.filename = image;
      this.genre = genre;
      this.nbr_vu = nbr_vu;
    }
  }