import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: any;
  urlregiste: any;
  DJANGO_SERVER: string = "token/";
  DJANGO_SERVER1: string = "user/";

  authToken: string;
  username: string;

  private getAuth(): any {
    if (!this.authToken) {
      this.authToken = localStorage.getItem("authToken");
    }
    return this.authToken;
  }

  constructor(private router: Router, private http: HttpClient) {
    this.url = environment.Url + this.DJANGO_SERVER;
    this.urlregiste = environment.Url + this.DJANGO_SERVER1;
  }
  public login(formData) {
    return this.http.post<any>(`${this.url}`, formData);
  }
  public register(formData) {
    return this.http.post<any>(`${this.urlregiste}`, formData);
  }
  isAuthenticated(): boolean {
    if (this.getAuth()) {
      return true;
    } else {
      return false;
    }
  }

  getAuthToken(): string {
    return this.getAuth();
  }

  getUsername(): string {
    if (!this.username) {
      this.username = localStorage.getItem("username");
    }
    return this.username;
  }
}
