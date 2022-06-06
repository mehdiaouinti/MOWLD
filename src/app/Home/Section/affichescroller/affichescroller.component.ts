import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';



@Component({
  selector: 'app-affichescroller',
  templateUrl: './affichescroller.component.html',
  styleUrls: ['./affichescroller.component.css']
})
export class AffichescrollerComponent implements OnInit {

  productList: Product[] = new Array<Product>();
 
  direction = "";

  public isCollapsed = false;

  isNavCollapse = false;
  @HostListener('window:scroll', []) onScroll() {
    if (this.scroll.getScrollPosition()[1] > 70) {
      this.isNavCollapse = true;
    } else {
      this.isNavCollapse = false;
    }
  }

  constructor(private scroll: ViewportScroller
    ,private http: HttpClient) { }

  ngOnInit() {

    this.Getproduits()
   
   
  }

  onWheel(event: WheelEvent): void {
    if (event.deltaY > 0) this.scrollToRight();
    else this.scrollToLeft();
  }

  scrollToLeft(): void {
    document.getElementById('scroll-1').scrollLeft -= 400;
  }

  scrollToRight(): void {
    document.getElementById('scroll-1')!.scrollLeft += 400;
  }
  list_produits : any
  Getproduits()
  {

    this.http.get("http://127.0.0.1:8000/nouveau")
    .subscribe((response3) => {
       this.list_produits = response3;
       for (let i = 0; i < this.list_produits.length; i++) {
        let image = this.list_produits[i].fields['image']
        let title = this.list_produits[i].fields['nom']
        let type = this.list_produits[i].fields['type']
        let product = new Product(title,type,image);
        this.productList.push(product);
      }
    }); 
  }

}


class Product {
  title: string;
  type: string;
  description: string;
  price: number;
  rating: number;
  filename: string;

  constructor(title,type,image) {
    this.title = title;
    this.type = type;
    this.filename = image;
  }
}
