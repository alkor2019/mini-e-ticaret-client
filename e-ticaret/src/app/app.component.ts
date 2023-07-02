import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { AuthenticationService } from './services/common/authentication.service';
import { CustomToastrService, ToastMessageType, ToastPosition } from './services/ui/custom-toastr.service';
declare var $:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(
     public authenticationService:AuthenticationService,
     private toastrService:CustomToastrService,
     private router:Router,
     private socialAuthSerivce:SocialAuthService
    
  ) {
    authenticationService.identityCheck();
   
  }
 

  logOut()
  {
       localStorage.removeItem('accessToken');
       this.socialAuthSerivce.authState.subscribe(user => {
          user !=null && this.socialAuthSerivce.signOut();
       })
       this.authenticationService.identityCheck();
       this.router.navigate([""])
       this.toastrService.toastInit("Oturumunuz kapatılmıştır", "Oturum Kapatma",{
          messageType:ToastMessageType.Warning,
          position:ToastPosition.BottomRight
       })
    
  }
   

}

