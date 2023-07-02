import { SocialAuthService } from '@abacritt/angularx-social-login';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService, _isAuthenticated } from 'src/app/services/common/authentication.service';
import { CustomToastrService, ToastMessageType, ToastPosition } from 'src/app/services/ui/custom-toastr.service';

export const AuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const router:Router = inject(Router);
  const toastr:CustomToastrService = inject(CustomToastrService);
  const socialAuthService:SocialAuthService = inject(SocialAuthService)
  inject(AuthenticationService).identityCheck()
   
  if(!_isAuthenticated)
  {
       socialAuthService.authState.subscribe(user => {
           user != null && socialAuthService.signOut()
       })
       router.navigate(["login"], {queryParams:{returnUrl:state.url}})
       
       toastr.toastInit("Oturum açmanız gerekiyor", "Yetkisiz erişim!",{
          messageType:ToastMessageType.Warning,
          position:ToastPosition.TopCenter
       })

  }

  return true;
};
