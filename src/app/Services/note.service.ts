import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  url : any
DJANGO_SERVER: string
  constructor( private router: Router,private http: HttpClient) { 


    this.url =environment.Url
    this.DJANGO_SERVER = this.url + "note/"
  }


  public credentials(formData) {
    return this.http.post<any>(`${this.DJANGO_SERVER}`, formData);
  }
  public update(formData,id) {
    return this.http.put<any>(`${this.DJANGO_SERVER+id+"/"}`, formData);
  }
}
