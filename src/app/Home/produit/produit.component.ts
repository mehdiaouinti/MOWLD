import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-produit",
  templateUrl: "./produit.component.html",
  styleUrls: ["./produit.component.css"],
})
export class ProduitComponent implements OnInit {
  types = ["Drama", "Actions", "Historique"];
  term: string;
  list_produits: any;
  selectedtype: any;
  selectedpays: any;
  urlimage: any;
  url: any;
  currentPage = 1;
  itemsPerPage = 15;
  maxSize = 5;
  type: any = this.route.snapshot.params["type"];
  pays = [
    this.type + " Tunisie",
    this.type + " Egypt",
    this.type + " Turc",
    this.type + " Étranger",
  ];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.urlimage = environment.Urlimage;
    this.url = environment.UrlGET;
  }

  ngOnInit() {
    this.getall_serie();
  }
  getall_serie() {
    this.spinner.show();
    this.http
      .get(this.url + "listp?type=" + this.route.snapshot.params["type"])
      .subscribe((response3) => {
        this.list_produits = response3;
        this.length_produit = this.list_produits.length;
        this.spinner.hide();
      });
  }
  urlfinal: any;
  Get_plus_vue() {
    this.spinner.show();
    this.urlfinal =
      this.url +
      "produitsbytype?type=plusvu1&nom=" +
      this.route.snapshot.params["type"];
    this.http.get(this.urlfinal).subscribe((response3) => {
      this.list_produits = response3;
      this.length_produit = this.list_produits.length;
      this.spinner.hide();
    });
  }

  Get_plus_aime() {
    this.spinner.show();
    this.urlfinal =
      this.url +
      "produitbynotefinal?type=" +
      this.route.snapshot.params["type"];
    this.http.get(this.urlfinal).subscribe((response3) => {
      this.list_produits = response3;
      this.length_produit = this.list_produits.length;
      this.spinner.hide();
    });
  }

  length_produit: any;
  onChangetype(event) {
    this.spinner.show();

    this.urlfinal =
      this.url +
      "produitbygenre?genre=" +
      event +
      "&nom=" +
      this.route.snapshot.params["type"];
    this.http.get(this.urlfinal).subscribe((response3) => {
      this.list_produits = response3;
      this.spinner.hide();
      this.length_produit = this.list_produits.length;
    });
  }

  pays_f: any;
  onChangepays(event) {
    this.spinner.show();
    if (event == this.type + " Tunisie") {
      this.pays_f = "Tunisie";
    }
    if (event == this.type + " Egypt") {
      this.pays_f = "Egypt";
    }
    if (event == this.type + " Turc") {
      this.pays_f = "Turc";
    }
    if (event == this.type + " Étranger") {
      this.pays_f = "Amarique";
    }

    this.urlfinal =
      this.url +
      "produitbypays?pays=" +
      this.pays_f +
      "&nom=" +
      this.route.snapshot.params["type"];

    this.http.get(this.urlfinal).subscribe((response3) => {
      this.list_produits = response3;
      this.spinner.hide();
      this.length_produit = this.list_produits.length;
    });
  }
}
