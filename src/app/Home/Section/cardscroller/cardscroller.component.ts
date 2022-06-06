import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { environment } from '../../../../environments/environment';
import { Product } from '../../../Model/Product' 

@Component({
  selector: 'app-cardscroller',
  templateUrl: './cardscroller.component.html',
  styleUrls: ['./cardscroller.component.css']
})
export class CardscrollerComponent implements OnInit {
  urlimage : any
  url : any
  urlfinal : any
  @Input() type_recherche: string;
  @Input() type: string;
  @Input() nom: string;

  @ViewChild('nav', {
  read: DragScrollComponent,
  static: false
}) ds: DragScrollComponent;

  productList: Product[] = new Array<Product>();
  direction = "";





  constructor(private scroll: ViewportScroller,private http: HttpClient) {
    this.urlimage =environment.Urlimage
    this.url = environment.UrlGET
   
   }

  ngOnInit() {
    
    this.Getproduits(this.type_recherche,this.type,this.nom)
   
  }

  list_produits : any
  Getproduits(type_recherche,type,nom)
  {
    
 
    if (type_recherche == "plusvu")
    {
      this.urlfinal = this.url+"produitsbytype?type="+type_recherche+"&nom="+type
    }
    if (type_recherche == "ramadan")
    {
 
      this.urlfinal = this.url+"produitsbytype?type="+type_recherche+"&nom="+type
    }
    if (type_recherche == "new")
    {
      this.urlfinal = this.url+"produitsbytype?type="+type_recherche+"&nom="+type
    }
    
    
    if (type_recherche == "genre")
    {
      this.urlfinal = this.url+"produitbygenre?genre="+nom+"&nom="+type
    }
    if (type_recherche == "pays")
    {
      this.urlfinal = this.url+"produitbypays?pays="+nom+"&nom="+type
    }

    this.http.get( this.urlfinal)
    .subscribe((response3) => {
       this.list_produits = response3;
       for (let i = 0; i < this.list_produits.length; i++) {
        let image = this.list_produits[i].fields['image']
        let id = this.list_produits[i].pk
        let title = this.list_produits[i].fields['nom']
        let type = this.list_produits[i].fields['type']
        let description = this.list_produits[i].fields['Genre']
        let nbr_vu = this.list_produits[i].fields['nbr_vue']
        let product = new Product(id,title,type,image,description,nbr_vu);
        this.productList.push(product);
      }
    }); 
  }

left (){

  this.ds.moveLeft();
}

right  (){

  this.ds.moveRight();
}

moveTo(index) {
  this.ds.moveTo(index);
}

ngAfterViewInit() {
  // Starting ngx-drag-scroll from specified index(3)
  setTimeout(() => {
    this.ds.moveTo(3);
  }, 0);
}
  

}



