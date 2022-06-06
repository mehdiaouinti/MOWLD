import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  urlimage : any
  new: any;
  plus_vu : any
  ramadan : any
  genre : any
  comedie : any
  action : any
  drama : any
  pays : any
  typet :  any
  types :  any
  amarique : any

  constructor() { 
    this.new = 'new';
    this.typet = 'film';
    this.types = 'serie';
    this.plus_vu = 'plusvu';
    this.ramadan = 'ramadan';
    this.genre = 'genre';
    this.amarique = 'Amarique';
    this.pays = 'pays';
    this.comedie = 'Comédie'
    this.urlimage =environment.Urlimage
  }

  ngOnInit() {
  }

}
