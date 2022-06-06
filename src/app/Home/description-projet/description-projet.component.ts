import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NoteService } from "../../Services/note.service";
import { FavoriteService } from "../../Services/favorite.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-description-projet",
  templateUrl: "./description-projet.component.html",
  styleUrls: ["./description-projet.component.css"],
})
export class DescriptionProjetComponent implements OnInit {
  @ViewChild("vid", { static: false }) vid: ElementRef;
  public form: FormGroup;
  rating3: any = 0;
  rating2: any = 0;
  urlimage: any;
  son_b: boolean = true;
  casting_b: boolean = false;
  url: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private addnote: NoteService,
    private favorite: FavoriteService,
    private router: Router
  ) {
    this.urlimage = environment.Urlimage;
    this.url = environment.UrlGET;
  }

  ngOnInit(): void {
    this.getproduit();
    this.getall_serie();
    this.getuser();
    setTimeout(() => {
      this.getnotebyuser();
      this.getnote_produit();
      this.getfavoritebyid();
      this.getacteurs();
      this.getfiche();
    }, 600);
  }
  list_products: any;
  video: any;
  image: any;
  titre: any;
  description: any;
  nbr_saison: any;
  acteur: any;
  video_b: boolean = true;

  getall_serie() {
    this.http
      .get(this.url + "lists?id=" + this.route.snapshot.params["id"])
      .subscribe((response3) => {
        this.list_products = response3;
      });
  }
  ProduitId: any;
  pays: any;
  getproduit() {
    this.http
      .get(this.url + "get_produit?id=" + this.route.snapshot.params["id"])
      .subscribe((response3) => {
        this.ProduitId = response3[0].pk;
        this.titre = response3[0].fields["nom"];
        this.pays = response3[0].fields["pays"];
        this.video = this.urlimage + response3[0].fields["videopub"];
        this.description = response3[0].fields["description"];
        this.nbr_saison = response3[0].fields["nbr_saison"];
        this.acteur = response3[0].fields["acteurs"];
        this.image = this.urlimage + response3[0].fields["image"];

        if (this.video.length > 3) {
          this.video_b = true;
        } else {
          this.video_b = false;
        }
      });
  }

  open_modal_note(content) {
    this.modalService.open(content);
  }

  Userid: any;
  getuser() {
    this.http
      .get(this.url + "getuser?username=" + localStorage.getItem("username"))
      .subscribe((response3) => {
        this.Userid = response3[0].pk;
      });
  }

  save_note() {
    const formData1 = new FormData();
    formData1.append("user", this.Userid);
    formData1.append("produit", this.ProduitId);
    formData1.append("number", this.rating3);

    if (this.rating_bool == false) {
      this.addnote.credentials(formData1).subscribe(
        (res: any) => {
          this.getnote_produit();
          this.modalService.dismissAll();
        },

        (err) => {
          console.log(err);
        }
      );
    } else {
      this.addnote.update(formData1, this.Idnote).subscribe(
        (res: any) => {
          this.getnote_produit();
          this.modalService.dismissAll();
        },

        (err) => {
          console.log(err);
        }
      );
    }
  }

  Idnote: any;
  length_notes: any;
  rating_bool = false;
  getnotebyuser() {
    this.http
      .get(this.url + "getnote?id=" + this.Userid + "&id_p=" + this.ProduitId)
      .subscribe((response3) => {
        this.length_notes = response3;

        if (this.length_notes.length > 0) {
          this.rating3 = response3[0].fields["number"];
          this.Idnote = response3[0].pk;
          this.rating_bool = true;
        }
      });
  }

  getnote_produit() {
    this.http
      .get(this.url + "notefinal?id_p=" + this.ProduitId)
      .subscribe((response3) => {
        this.rating2 = response3["note"];
      });
  }

  add_favorite() {
    if (this.fav_bool == true) {
      const formData1 = new FormData();
      formData1.append("user", this.Userid);
      formData1.append("produit", this.ProduitId);

      this.favorite.credentials(formData1).subscribe(
        (res: any) => {
          this.getfavoritebyid();
        },

        (err) => {
          console.log(err);
        }
      );
    } else {
      this.favorite.delete(this.id_fav).subscribe(
        (res: any) => {
          this.getfavoritebyid();
        },

        (err) => {
          console.log(err);
        }
      );
    }
  }

  nom_favorite = "Ajouter aux favoris";
  fav_bool = true;
  liste_favorite: any;
  id_fav: any;
  getfavoritebyid() {
    this.http
      .get(
        this.url +
          "getfavortiebyid?id=" +
          this.Userid +
          "&id_p=" +
          this.ProduitId
      )
      .subscribe((response3) => {
        this.liste_favorite = response3;

        if (this.liste_favorite.length > 0) {
          this.nom_favorite = "Retirer des favoris";
          this.fav_bool = false;
          this.id_fav = this.liste_favorite[0].pk;
        } else {
          this.nom_favorite = "Ajouter aux favoris";
          this.fav_bool = true;
        }
      });
  }

  open_modal_login(content) {
    this.modalService.open(content);
  }

  login_check(id, content) {
    if (localStorage.getItem("login") == "true") {
      this.router.navigateByUrl("/episode/" + id + "/1");
    } else {
      this.modalService.open(content);
    }
  }
  listacteurs: any;
  getacteurs() {
    this.http
      .get(this.url + "getacteur?produit=" + this.ProduitId)
      .subscribe((response3) => {
        this.listacteurs = response3;

        if (this.listacteurs.length > 0) {
          this.casting_b = true;
        }
      });
  }
  fiche: any;
  realisateur: any;
  production: any;
  scenario: any;
  boolfiche: boolean = false;
  getfiche() {
    this.http
      .get(this.url + "getfiche?id=" + this.ProduitId)
      .subscribe((response3) => {
        this.fiche = response3;
        this.realisateur = this.fiche[0].fields["realisateur"];
        this.production = this.fiche[0].fields["production"];
        this.scenario = this.fiche[0].fields["scenario"];
        if (this.fiche.length > 0) {
          this.boolfiche = true;
        }
      });
  }
  son() {
    if (this.vid.nativeElement.muted == true) {
      this.vid.nativeElement.muted = false;
      this.son_b = false;
    } else {
      this.vid.nativeElement.muted = true;
      this.son_b = true;
    }
  }
}
