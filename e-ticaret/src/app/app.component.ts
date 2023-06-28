import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastMessageType, ToastPosition } from './services/ui/custom-toastr.service';
declare var $:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'e-ticaret';
  constructor(
     public authService:AuthService,
     private toastrService:CustomToastrService,
     private router:Router
  ) {

    
  }
   ngOnInit(): void {
    this.authService.identityCheck();
   }

  logOut()
  {
       localStorage.removeItem('accessToken');
       this.authService.identityCheck();
       this.router.navigate([""])
       this.toastrService.toastInit("Oturumunuz kapatılmıştır", "Oturum Kapatma",{
          messageType:ToastMessageType.Warning,
          position:ToastPosition.BottomRight
       })
  }
   

}

