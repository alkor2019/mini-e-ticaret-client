import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastMessageType, ToastPosition } from 'src/app/services/ui/custom-toastr.service';

export const AuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const router:Router = inject(Router);
  const toastr:CustomToastrService = inject(CustomToastrService);
  if(!_isAuthenticated)
  {
       router.navigate(["login"], {queryParams:{returnUrl:state.url}})
       toastr.toastInit("Oturum açmanız gerekiyor", "Yetkisiz erişim!",{
          messageType:ToastMessageType.Warning,
          position:ToastPosition.TopCenter
       })
  }

  return true;
};
