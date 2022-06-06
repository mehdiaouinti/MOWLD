import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit  {

  urlimage : any
  url : any 
  episode : any

  constructor(private http: HttpClient,
    private route:ActivatedRoute) {
      this.urlimage =environment.Urlimage
      this.url =environment.UrlGET
     }
  ngOnInit(): void {

    
    this.getall_serie()
    this.getsaison()
    this.getepisode()

    this.id_saison=this.route.snapshot.params['id']
  
  }
  list_products : any
  id_saison : any
   titre_p : any = "Episode "

  getall_serie()
{
 this.http.get(this.url+"liste?id="+this.route.snapshot.params['id'])
 .subscribe((response3) => {

    this.list_products = response3
  
 
   
;
 }); 

}
image : any
titre : any 
pays : any
type : any
description : any
saison : any
genre : any


getsaison()
{
 this.http.get(this.url+"get_saison?id="+this.route.snapshot.params['id'])
 .subscribe((response3) => {

  this.getproduit(response3[0].fields.produit)
  this.saison = response3[0].fields.nom

  this.episode = this.saison +"-Episode "+this.route.snapshot.params['id1']

    
;
 }); 

}
rating2: any = 0;
nbr_vu
getproduit(id)
{
  this.http.get(this.url+"get_produit?id="+id)
  .subscribe((response3) => {
    this.getnote_produit(id)
 this.image = this.urlimage+response3[0].fields.image
 this.titre = response3[0].fields.nom
 this.pays = response3[0].fields.pays
 this.type = response3[0].fields.type
 this.genre = response3[0].fields.Genre
 this.nbr_vu = response3[0].fields.nbr_vue
 this.description = response3[0].fields.description
     
 ;
  }); 

}
getnote_produit(id)

{
  

  this.http.get(this.url+"notefinal?id_p="+id)
  .subscribe((response3) => {
  
this.rating2 = response3['note']

   

  }); 
}
ratingStyle = {
	starsStyle: {'height' : '1px', 'width' : '1px'},
	ratingStyle: {'font-size' : '1px'},
	countStyle: {'font-size' : '1px'}
}

video : any =""
getepisode()

{
  

  this.http.get(this.url+"getepisode?id="+this.route.snapshot.params['id1']+"&saison="+this.route.snapshot.params['id'])
  .subscribe((response3) => {
  
this.video =this.urlimage + response3[0].fields.video


   

  }); 
}

}