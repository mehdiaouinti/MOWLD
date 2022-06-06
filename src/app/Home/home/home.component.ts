import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../Services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  login: boolean;

  constructor(private authentifation: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem("login") == "true") {
      this.login = true;
    }
  }

  getAuthService() {
    return this.authentifation;
  }
}
