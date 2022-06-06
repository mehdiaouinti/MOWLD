import { Component, OnInit } from "@angular/core";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AuthService,
} from "angular-6-social-login-v2";
import { Socialusers } from "../../../Model/Socialusers";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import jwt_decode from "jwt-decode";
import { environment } from "../../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService as authentifation } from "../../../Services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  username: any;
  login: boolean = false;
  url: any;
  socialusers = new Socialusers();
  constructor(
    private modalService: NgbModal,
    public OAuth: AuthService,
    private authentifation: authentifation,
    private router: Router,

    private http: HttpClient,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.url = environment.UrlGET;
    this.loginForm = this.fb.group({
      username: [],
      password: [],
    });
    this.RegisterForm = this.fb.group({
      username_r: [],
      email_r: [],
      password_r: [],
      password_r1: [],
    });
  }

  ngOnInit() {
    console.log(this.authentifation.isAuthenticated());
    if (localStorage.getItem("login") == "true") {
      this.login = true;
      this.username = localStorage.getItem("username");
    }
  }
  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.OAuth.signIn(socialPlatformProvider)
      .then((socialusers) => {
        this.Check(socialusers["email"]);

        setTimeout(() => {
          if (this.existe == false) {
            let username = socialusers["name"].replace(" ", "_");
            let password = socialusers["name"].replace(" ", "_");

            this.Register(username, socialusers["email"], password);
          }
        }, 500);

        let username = socialusers["name"].replace(" ", "_");
        localStorage.setItem("login", "true");

        localStorage.setItem("username", username);
        localStorage.setItem("email", socialusers["email"]);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
  show_modal(content) {
    this.modalService.open(content);
  }

  logout() {
    localStorage.setItem("login", "false");
    localStorage.removeItem("authToken");
    window.location.reload();
  }

  user: any;
  existe: boolean;
  Check(email) {
    this.existe = false;

    this.http
      .get(this.url + "getuser?email=" + email)
      .subscribe((response3) => {
        this.user = response3;

        if (this.user.length > 0) {
          this.existe = true;
        }
      });
  }

  Register(username, email, password) {
    const formData1 = new FormData();
    formData1.append("username", username);
    formData1.append("email", email);
    formData1.append("password", password);

    this.authentifation.login(formData1).subscribe(
      (res: any) => {
        localStorage.setItem("authToken", res.token);
      },

      (err) => {
        console.log(err);
      }
    );
  }
  loginForm: FormGroup;
  token: any;
  connect() {
    this.spinner.show();
    const controls = this.loginForm.controls;
    const formData1 = new FormData();
    formData1.append("username", controls["username"].value);
    formData1.append("password", controls["password"].value);
    this.authentifation.login(formData1).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.token = this.getDecodedAccessToken(res.token);
        localStorage.setItem("token", this.token["exp"]);
        localStorage.setItem("authToken", res.token);
        localStorage.setItem("username", controls["username"].value);
        localStorage.setItem("login", "true");
        this.modalService.dismissAll();
        //  window.location.reload();
      },

      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
  RegisterForm: FormGroup;
  inscri() {
    this.spinner.show();
    const controls = this.RegisterForm.controls;
    const formData1 = new FormData();
    formData1.append("username", controls["username_r"].value);
    formData1.append("password", controls["password_r"].value);
    formData1.append("email", controls["email_r"].value);
    this.authentifation.register(formData1).subscribe(
      (res: any) => {
        this.spinner.hide();
        localStorage.setItem("username", controls["username_r"].value);
        localStorage.setItem("login", "true");
        this.modalService.dismissAll();
        localStorage.setItem("authToken", res.token);
        // window.location.reload();
      },

      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  login_bool: boolean = true;
  login_b() {
    if (this.login_bool == true) {
      this.login_bool = false;
    } else {
      this.login_bool = true;
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  getAuthService() {
    return this.authentifation;
  }

  getUsername() {
    return this.authentifation.getUsername();
  }
}
