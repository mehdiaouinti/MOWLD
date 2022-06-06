import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  url : any
DJANGO_SERVER: string
  constructor( private router: Router,private http: HttpClient) { 


    this.url =environment.Url
    this.DJANGO_SERVER = this.url + "prefere/"
  }


  public credentials(formData) {
    return this.http.post<any>(`${this.DJANGO_SERVER}`, formData);
  }
  public delete(id) {
    return this.http.delete<any>(`${this.DJANGO_SERVER+id+"/"}`);
  }
}
