import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  list_fav : any
  urlimage : any
  url : any
  constructor(private http: HttpClient) {
    this.urlimage =environment.Urlimage
    this.url =environment.UrlGET
   }

  ngOnInit() {
    this.getuser()

    setTimeout(() => {
      this.getall_serie()
      
    }, 500);
    
    
  }
  getall_serie()
{
 this.http.get(this.url+"favor?id="+this.Userid)
 .subscribe((response3) => {



    this.list_fav = response3
  
  
   
;
 }); 

}
Userid : any
getuser() 
{

  this.http.get(this.url+"getuser?username="+localStorage.getItem('username'))
  .subscribe((response3) => {

   
   
    this.Userid = response3[0].pk
   

  }); 
}


}
