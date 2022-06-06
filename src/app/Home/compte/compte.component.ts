import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProduitService } from "../../Services/produit.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatChipInputEvent, MatRadioChange } from "@angular/material";
import { SaisonService } from "../../Services/saison.service";
import { EpisodeService } from "src/app/Services/episode.service";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "../../../environments/environment";
import { NotifierService } from "angular-notifier";
import { ActivatedRoute, Router } from "@angular/router";
import { ActeurService } from "../../Services/acteur.service";
import { AffectationService } from "../../Services/affectation.service";

@Component({
  selector: "app-compte",
  templateUrl: "./compte.component.html",
  styleUrls: ["./compte.component.css"],
})
export class CompteComponent implements OnInit {
  ProduitForm: FormGroup;
  SaisonForm: FormGroup;
  EpisodeForm: FormGroup;
  ActeurForm: FormGroup;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  choix1 = new FormControl();
  choix2 = new FormControl();
  choix: string = "serie";
  selectedproduit: any;
  selectedproduit1: any;
  selectedsaison: any;
  out = new EventEmitter();
  produits = [];
  saisons = [];
  types = ["serie", "film"];
  episode_bool: boolean = false;
  saison_bool: boolean = false;
  url: any;
  urlapi: any;
  term: string;
  selectedtype: any;
  changeimage: boolean = false;
  changevideo: boolean = false;

  constructor(
    private http: HttpClient,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private produit: ProduitService,
    private formBuilder: FormBuilder,
    private SaisonService: SaisonService,
    private EpisodeService: EpisodeService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private route: Router,
    private router: ActivatedRoute,
    private acteurservice: ActeurService,
    private affecationservice: AffectationService
  ) {
    this.notifier = notifier;
    this.url = environment.UrlGET;
    this.urlapi = environment.Url;
    this.urlimage = environment.Urlimage;
    this.ProduitForm = this.formBuilder.group({
      titre: ["", Validators.required],
      description: ["", Validators.required],
      pays: ["", Validators.required],
      image: ["", Validators.required],
      nbr: ["", Validators.required],
      video: [""],
      acteurs: [""],
      genre: ["", Validators.required],
      nv: [""],
      new: [""],
    });

    this.SaisonForm = this.formBuilder.group({
      titre: ["", Validators.required],
      produit: ["", Validators.required],
      image: ["", Validators.required],
    });
    this.EpisodeForm = this.formBuilder.group({
      titre: ["", Validators.required],
      produit: ["", Validators.required],
      saison: ["", Validators.required],
      video: ["", Validators.required],
    });
    this.ActeurForm = this.formBuilder.group({
      nv: ["", Validators.required],
      image: ["", Validators.required],
    });

    if (localStorage.getItem("login") != "true") {
      this.route.navigate(["/accueil"]);
    }
  }

  login: boolean = false;
  urlimage: any;
  ngOnInit() {
    this.getuser();
    this.getallproduit();
    this.getallacteurs();
    this.getall_serie("film");
  }
  Userid: any;
  nom: any;
  email: any;
  etat_b: boolean = false;
  statut: any;
  date_rejoind: any;
  getuser() {
    this.http
      .get(this.url + "getuser?username=" + localStorage.getItem("username"))
      .subscribe((response3) => {
        this.Userid = response3[0].pk;
        this.etat_b = response3[0].fields["is_superuser"];
        this.date_rejoind = this.datepipe.transform(new Date(), "dd-MM-yyyy");
        this.nom = response3[0].fields["username"];
        this.email = response3[0].fields["email"];

        if (this.etat_b == true) {
          this.statut = "Administrateur";
        }
      });
  }

  openmodal_produit(content) {
    this.modalService.open(content, { size: "lg" });
    this.type_crud = "add";
    this.ProduitForm.reset();
  }

  acteurs: any;

  add_produit() {
    this.modalService.dismissAll();
    this.spinner.show();

    const formData1 = new FormData();
    formData1.append("nom", this.ProduitForm.controls["titre"].value);
    formData1.append("new", "" + this.checked);
    formData1.append("pays", this.ProduitForm.controls["pays"].value);
    formData1.append("nbr_saison", this.ProduitForm.controls["nbr"].value);
    formData1.append(
      "description",
      this.ProduitForm.controls["description"].value
    );
    formData1.append("image", this.ProduitForm.get("image").value);
    formData1.append("videopub", this.ProduitForm.get("video").value);
    formData1.append("type", this.choix);
    formData1.append("Genre", this.ProduitForm.controls["genre"].value);

    this.produit.credentials(formData1).subscribe(
      (res: any) => {
        this.getallproduit();
        this.spinner.hide();
        this.notifier.notify("success", "La création de produit sucées");
        this.ProduitForm.reset();
        setTimeout(() => {
          for (let i = 0; i < this.mots.length; i++) {
            this.affectation(res.id, this.mots[i].id);
          }
        }, 400);
      },

      (err) => {
        this.spinner.hide();
        this.notifier.notify("error", "La création de produit n'est pas crée ");
        console.log(err);
      }
    );
  }
  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ProduitForm.get("image").setValue(file);
    }
  }
  onChange1(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ProduitForm.get("video").setValue(file);
      this.changeimage = true;
    }
  }
  onChange2(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.SaisonForm.get("image").setValue(file);
      this.changevideo = true;
    }
  }
  onChange3(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.EpisodeForm.get("video").setValue(file);
    }
  }

  mots = [];
  add2(event: MatChipInputEvent): void {
    const inputText = event.input;
    const value = event.value;

    if (inputText) {
      inputText.value = "";
    }
  }

  remove2(fruit: any): void {
    const index = this.mots.indexOf(fruit);

    if (index >= 0) {
      this.mots.splice(index, 1);
    }
  }

  openmodal_saison(content) {
    this.saison_bool = true;
    this.episode_bool = false;
    this.modalService.open(content, { size: "lg" });
  }
  openmodal_episode(content) {
    this.saison_bool = false;
    this.episode_bool = true;
    this.modalService.open(content, { size: "lg" });
  }

  choiximage: string;
  image_bool: boolean = true;
  onchange() {
    if (this.choiximage === "imagep") {
      this.image_bool = false;
    } else {
      this.image_bool = true;
    }
  }
  radioChange($event: MatRadioChange) {
    if ($event.value === "imagen") {
      this.image_bool = true;
    } else {
      this.image_bool = false;
    }
  }

  allproduit: any;

  getallproduit() {
    this.http.get(this.url + "allproduit").subscribe((response3) => {
      this.allproduit = response3;

      for (let i = 0; i < this.allproduit.length; i++) {
        this.produits.push({
          id: this.allproduit[i].pk,
          name: this.allproduit[i].fields["nom"],
        });
      }
      this.produits = [...this.produits];
    });
  }
  image: any;
  produit1: any;
  Id_produit: any;
  getproduit(id) {
    this.http.get(this.url + "get_produit?id=" + id).subscribe((response3) => {
      this.produit1 = response3[0];
      this.getsaison(this.produit1.pk);
      this.Id_produit = this.produit1.pk;
      this.image = this.produit1.fields["image"];
    });
  }
  saison: any;
  nbr_saison: number;

  getsaison(id) {
    this.http.get(this.url + "lists?id=" + id).subscribe((response3) => {
      this.saison = response3;
      if (this.saison_bool == true) {
        this.nbr_saison = this.saison.length + 1;
        this.SaisonForm.controls["titre"].setValue(this.nbr_saison);
      } else {
        for (let i = 0; i < this.saison.length; i++) {
          this.saisons.push({
            id: this.saison[i].pk,
            name: this.saison[i].fields["nom"],
          });
        }

        this.saisons = [...this.saisons];
      }
    });
  }

  changeLeagueOwner(event) {
    this.getproduit(event.id);
  }

  async onSubmit1(data) {
    this.spinner.show();
    const formData1 = new FormData();
    let image = "";
    if (this.image_bool == false) {
      image = this.image;
    } else {
      image = this.SaisonForm.get("image").value;
    }

    formData1.append("nom", "Saison " + data.value.titre);
    formData1.append("num", "" + this.nbr_saison);
    formData1.append("produit", this.Id_produit);
    formData1.append("image", image);

    this.SaisonService.credentials(formData1).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.modalService.dismissAll();
        this.SaisonForm.reset();
        this.notifier.notify("success", "La création de saison sucées");
      },

      (err) => {
        this.spinner.hide();
        console.log(err);
        this.notifier.notify("error", "La création de produit n'est pas crée ");
      }
    );
  }

  episode: any;
  nbr_episode: number;

  getepisode(id) {
    this.http.get(this.url + "liste?id=" + id).subscribe((response3) => {
      this.episode = response3;
      this.nbr_episode = this.episode.length + 1;
      this.EpisodeForm.controls["titre"].setValue(this.nbr_episode);
    });
  }

  Idepisode: any;
  changesaison(event) {
    this.Idepisode = event.id;
    this.getepisode(event.id);
  }

  changeproduit(event) {
    this.saisons = [];
    this.getsaison(event.id);
  }

  async onSubmit2(data) {
    this.spinner.show();
    const formData1 = new FormData();
    formData1.append("nom", "Episode " + data.value.titre);
    formData1.append("num", "" + this.nbr_episode);
    formData1.append("saison", this.Idepisode);
    formData1.append("video", this.EpisodeForm.get("video").value);

    this.EpisodeService.credentials(formData1).subscribe(
      (res: any) => {
        this.EpisodeForm.reset();
        this.spinner.hide();
        this.modalService.dismissAll();
        this.notifier.notify("success", "La création de episode sucées");
      },

      (err) => {
        this.spinner.hide();
        console.log(err);
        this.notifier.notify("error", "La création de produit n'est pas crée ");
      }
    );
  }

  allacteurs: any;
  acteurslist = [];
  getallacteurs() {
    this.http.get(this.url + "allacteurs").subscribe((response3) => {
      this.allacteurs = response3;

      for (let i = 0; i < this.allacteurs.length; i++) {
        this.acteurslist.push({
          id: this.allacteurs[i].pk,
          name: this.allacteurs[i].fields["nom"],
        });
      }
      this.acteurslist = [...this.acteurslist];
    });
  }
  changeacteur(event) {
    setTimeout(() => {
      this.ProduitForm.controls["acteurs"].reset();
      this.mots.push({ id: event.id, name: event.name });

      this.deleteMsg(event.id);
      this.acteurslist = [...this.acteurslist];
    }, 200);
  }
  deleteMsg(id: Number) {
    this.acteurslist = this.acteurslist.filter((item) => item.id !== id);
    this.acteurslist = [...this.acteurslist];
  }
  id_acteur_nv: any;
  add_acteur() {
    let nom = this.ProduitForm.controls["nv"].value;

    const formData1 = new FormData();

    if (nom.length > 0) {
      formData1.append("nom", nom);
      formData1.append("image", this.ActeurForm.get("image").value);

      this.acteurservice.credentials(formData1).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.ProduitForm.controls["nv"].reset();
          this.id_acteur_nv = res.id;
          this.mots.push({ id: res.id, name: res.nom });
        },

        (err) => {
          this.spinner.hide();
          console.log(err);
        }
      );
    }
  }

  affectation(Id_produit, Id_acteur) {
    const formData1 = new FormData();
    formData1.append("type_role", "");
    formData1.append("produit", Id_produit);
    formData1.append("acteur", Id_acteur);

    this.affecationservice.credentials(formData1).subscribe(
      (res: any) => {},

      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
  list_produits: any;
  length_produit: any;

  getall_serie(type) {
    this.spinner.show();
    this.http.get(this.url + "listp?type=" + type).subscribe((response3) => {
      this.list_produits = response3;
      this.length_produit = this.list_produits.length;
      this.spinner.hide();
    });
  }

  onChangetype(event) {
    this.getall_serie(event);
  }

  openmodal_update(id, content) {
    this.type_crud = "update";
    this.ProduitForm.reset();
    this.getproduit(id);
    this.getacteurs(id);
    setTimeout(() => {
      this.checked = this.produit1.fields["new"];
      this.ProduitForm.controls["image"].setValue(
        this.produit1.fields["image"]
      );
      this.ProduitForm.controls["video"].setValue(
        this.produit1.fields["videopub"]
      );
      this.ProduitForm.controls["titre"].setValue(this.produit1.fields["nom"]);
      this.ProduitForm.controls["description"].setValue(
        this.produit1.fields["description"]
      );
      this.ProduitForm.controls["pays"].setValue(this.produit1.fields["pays"]);
      this.choix = this.produit1.fields["type"];
      this.ProduitForm.controls["nbr"].setValue(
        this.produit1.fields["nbr_saison"]
      );
      this.choix = this.produit1.fields["type"];
      this.ProduitForm.controls["genre"].setValue(
        this.produit1.fields["Genre"]
      );
    }, 700);

    setTimeout(() => {
      this.modalService.open(content, { size: "lg" });
    }, 1000);
  }
  checkacteur: any;
  getacteurs(id) {
    this.mots = [];
    this.http
      .get(this.url + "getacteur?produit=" + id)
      .subscribe((response3) => {
        this.listacteurs = response3;
        for (let i = 0; i < this.listacteurs.length; i++) {
          this.mots.push({
            id: this.listacteurs[i].pk,
            name: this.listacteurs[i].fields["nom"],
          });
        }
      });
  }

  listacteurs: any;
  getacteurscheck(Id_produit, idacteur) {
    this.http
      .get(
        this.url + "checkacteur?acteur=" + idacteur + "&produit=" + Id_produit
      )
      .subscribe((response3) => {
        this.checkacteur = response3["resultat"];
      });
  }

  update_produit(id_produit) {
    const formData1 = new FormData();
    this.modalService.dismissAll();
    this.spinner.show();

    if (this.changeimage == true) {
      formData1.append("image", this.ProduitForm.get("image").value);
    }
    if (this.changevideo == true) {
      formData1.append("videopub", this.ProduitForm.get("video").value);
    }
    formData1.append("new", "" + this.checked);
    formData1.append("nom", this.ProduitForm.controls["titre"].value);
    formData1.append("pays", this.ProduitForm.controls["pays"].value);
    formData1.append("nbr_saison", this.ProduitForm.controls["nbr"].value);
    formData1.append(
      "description",
      this.ProduitForm.controls["description"].value
    );

    formData1.append("type", this.choix);
    formData1.append("Genre", this.ProduitForm.controls["genre"].value);

    this.produit.update(formData1, id_produit).subscribe(
      (res: any) => {
        this.getallproduit();
        this.spinner.hide();
        this.notifier.notify("success", "La modification de produit sucées");
        this.ProduitForm.reset();
        setTimeout(() => {
          for (let i = 0; i < this.mots.length; i++) {
            setTimeout(() => {
              this.http
                .get(
                  this.url +
                    "checkacteur?acteur=" +
                    this.mots[i].id +
                    "&produit=" +
                    res.id
                )
                .subscribe((response3) => {
                  this.checkacteur = response3["resultat"];
                  if (this.checkacteur == "false") {
                    this.affectation(res.id, this.mots[i].id);
                  }
                });
            }, 400);
          }
        }, 200);
      },

      (err) => {
        this.spinner.hide();
        this.notifier.notify(
          "error",
          "La modification de produit n'est pas crée "
        );
        console.log(err);
      }
    );
  }
  type_crud = "add";
  gestion_produit() {
    if (this.type_crud == "add") {
      this.add_produit();
    } else {
      this.update_produit(this.Id_produit);
    }
  }

  acteurlist: any;
  getacteurById(id) {
    this.http
      .get(this.url + "getacteurbyid?id=" + id)
      .subscribe((response3) => {
        this.acteurlist = response3;
      });
  }

  onChangeacteur(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ActeurForm.get("image").setValue(file);
    }
  }

  checked = false;

  checkCheckBoxvalue(event) {
    this.checked = event.checked;
  }
}
