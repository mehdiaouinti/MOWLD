import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { RouterModule } from '@angular/router';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { MatTabsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import {
	MatAutocompleteModule,
	MatFormFieldModule,
	MatInputModule,
	MatSliderModule,
  MatSelectModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
  MatNativeDateModule,
	MatChipsModule,
	MatPaginatorModule,
  MatRadioModule,
	MatSnackBarModule,
	MatStepperModule,
	MatTableModule,
	MatTooltipModule,
	MatGridListModule,
	MatButtonToggleModule,
	MatBottomSheetModule,
	MatExpansionModule,
	MatTreeModule,


} from '@angular/material';
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from './Section/header/header.component';
import { BarleftComponent } from './Section/barleft/barleft.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { AfficheplayerComponent } from './Section/afficheplayer/afficheplayer.component';
import { AffichescrollerComponent } from './Section/affichescroller/affichescroller.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardscrollerComponent } from './Section/cardscroller/cardscroller.component';
import { HomeComponent } from './home/home.component';
import { SportsComponent } from './sports/sports.component';
import { DocumentationsComponent } from './documentations/documentations.component';
import { DescriptionProjetComponent } from './description-projet/description-projet.component';
import { AuthService, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login-v2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlyrModule } from 'ngx-plyr';
import { EpisodeComponent } from './episode/episode.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FavoriteComponent } from './favorite/favorite.component';
import { ProduitComponent } from './produit/produit.component';
import { CompteComponent } from './compte/compte.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooPipe } from './filter/foo.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
export function socialConfigs() {  
    const config = new AuthServiceConfig(  
      [  
        {  
          id: FacebookLoginProvider.PROVIDER_ID,  
          provider: new FacebookLoginProvider('2578932075570489')  
        },  
        {  
          id: GoogleLoginProvider.PROVIDER_ID,  
          provider: new GoogleLoginProvider('948166528533-g8ul3ei8mivuc7kntoluhf9osggm9l08.apps.googleusercontent.com')  
        }  
      ]  
    );  
    return config;  
  } 
  const customNotifierOptions: NotifierOptions = {
    position: {
      horizontal: {
        position: 'right',
        distance: 20
      },
      vertical: {
        position: 'top',
        distance: 20,
        gap: 20
      }
    },
    theme: 'material',
    behaviour: {
      autoHide: 5000,
      onClick: 'hide',
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4
    },
    animations: {
      enabled: true,
      show: {
        preset: 'slide',
        speed: 300,
        easing: 'ease'
      },
      hide: {
        preset: 'fade',
        speed: 300,
        easing: 'ease',
        offset: 50
      },
      shift: {
        speed: 300,
        easing: 'ease'
      },
      overlap: 150
    }
  };

@NgModule({
  declarations: [
    FooPipe,
    AccueilComponent,
    HeaderComponent,
    BarleftComponent, 
    AfficheplayerComponent,
    AffichescrollerComponent, 
    CardscrollerComponent, 
    HomeComponent, 
    SportsComponent, 
    DocumentationsComponent, 
    DescriptionProjetComponent, 
    EpisodeComponent, 
    FavoriteComponent, 
    ProduitComponent, 
    CompteComponent],

  imports: [
    CommonModule,
    MatToolbarModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatSidenavModule,
    MatTabsModule,
    NgxStarRatingModule,
    DragScrollModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatChipsModule,
    Ng2SearchPipeModule,
    MatPaginatorModule,
    MatSnackBarModule,
    NgSelectModule,
    MatRadioModule,
    MatStepperModule,
    NgxSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    NgxPaginationModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatTreeModule,
    NgbModule,
    BrowserAnimationsModule,
    MatListModule,
    RouterModule,
    PlyrModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
			{
				path: '',
				redirectTo: 'accueil',
				pathMatch: 'full'
			},
			
            
				
						{
							path: 'accueil',
							component: AccueilComponent
											
						},
               
                        {
							path: 'produits/:type',
							component: ProduitComponent
											
						},
                        {
							path: 'detailproduit/:id',
							component: DescriptionProjetComponent
											
						},
                        {
							path: 'episode/:id/:id1',
							component: EpisodeComponent
											
						},
            {
							path: 'favorite',
							component: FavoriteComponent
											
						},
            {
							path: 'compte',
							component: CompteComponent
											
						},

     
		
          
        ]),
    
  ],
  exports : [
      HomeComponent,
      

  
  ] ,
  providers: [  
    DatePipe,
    AuthService,  
    {  
      provide: AuthServiceConfig,  
      useFactory: socialConfigs  
    }  
  ], 
  entryComponents: [DocumentationsComponent],
  
})
export class HomeModule { }
