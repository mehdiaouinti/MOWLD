import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  url : any

  DJANGO_SERVER: string = "affectation/";
  constructor(private router: Router,private http: HttpClient) { 

    this.url =environment.Url + this.DJANGO_SERVER

  }
  public credentials(formData) {
    return this.http.post<any>(`${this.url}`, formData);
  }
}
