import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login-v2';  
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login-v2';  
import { Socialusers } from '../../Model/Socialusers'  
import { SocialloginService } from '../../Services/sociallogin.service';  
import { Router, ActivatedRoute, Params } from '@angular/router';  
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-documentations',
  templateUrl: './documentations.component.html',
  styleUrls: ['./documentations.component.css']
})
export class DocumentationsComponent implements OnInit {

  response;  
  socialusers=new Socialusers();  
constructor(
  private modalService: NgbModal,
  public OAuth: AuthService,  
  private SocialloginService: SocialloginService,  
  private router: Router  
) { }  

ngOnInit() {  
}  
public socialSignIn(socialProvider: string) {  
  let socialPlatformProvider;  
  if (socialProvider === 'facebook') {  
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
  } else if (socialProvider === 'google') {  
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
  }  

  this.OAuth.signIn(socialPlatformProvider).then(socialusers => {  
    console.log(socialProvider, socialusers);  
    console.log(socialusers);  
    this.Savesresponse(socialusers);  

  });  
}  
Savesresponse(socialusers: Socialusers) {  

  this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {  
    debugger;  
    console.log(res);  
    this.socialusers=res;  
    this.response = res.userDetail;  
    localStorage.setItem('socialusers', JSON.stringify( this.socialusers));  
    console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));  
    this.router.navigate([`/Dashboard`]);  
  })  
}  

show_modal(content)
{
  this.modalService.open(content);
}
}  