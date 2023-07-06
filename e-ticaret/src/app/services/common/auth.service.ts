import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom, Observable } from 'rxjs';
import { SpinnerTypeName } from 'src/app/base/base.component';
import { SingleResponseData } from 'src/app/contracts/responses/single-response-data';
import { Token } from 'src/app/contracts/users/token';
import { UserLogin } from 'src/app/contracts/users/user-login';
import { CustomToastrService, ToastMessageType, ToastPosition } from '../ui/custom-toastr.service';
import { AuthenticationService } from './authentication.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClientService:HttpClientService,
    private toastService:CustomToastrService,
    private ngxSpinner:NgxSpinnerService,
    private authenticationService:AuthenticationService
    
  ) { }

  
    async internalLogin(user:UserLogin, callbackFn?:()=> void):Promise<void>
    {
        this.ngxSpinner.show(SpinnerTypeName.BallAtom)
        const response:Observable<SingleResponseData<Token> | UserLogin> = this.httpClientService.post<SingleResponseData<Token> | UserLogin>({
          controller:'Auth',
          action:'Login'
        }, user)

        var result = await firstValueFrom(response) as SingleResponseData<Token>;
        await this.loginAction(result, ()=> callbackFn());
        this.ngxSpinner.hide(SpinnerTypeName.BallAtom)
    }

    async refreshTokenLogin(refreshToken:string)
    {
      this.ngxSpinner.show(SpinnerTypeName.BallAtom)
      const response:Observable<SingleResponseData<Token> | any> = this.httpClientService.post<SingleResponseData<Token> | any>({
        controller:'Auth',
        action:'RefreshTokenLogin'
      }, {refreshToken:refreshToken})

      var result = await firstValueFrom(response) as SingleResponseData<Token>;
      if(result.success)
      {
           localStorage.setItem("accessToken", result.data.accessToken)
           localStorage.setItem("refreshToken", result.data.refreshToken)
      }
      this.ngxSpinner.hide(SpinnerTypeName.BallAtom)
    }



    async externalLogin(user:SocialUser, isErrorSignOutFn:()=> void, callbackFn?:() => void):Promise<void>
    {
         
        
         this.ngxSpinner.show(SpinnerTypeName.BallAtom)
         const response : Observable<SingleResponseData<Token> | SocialUser> = this.httpClientService.post<SingleResponseData<Token> | SocialUser>({
           controller:'Auth',
           action:`${user.provider}-login`.toLocaleLowerCase()
         }, user)
 
         let result = await firstValueFrom(response) as SingleResponseData<Token>;
         let actionResult =   await this.loginAction(result, () => callbackFn());
         if(!actionResult.success) 
         {
             isErrorSignOutFn()
         }
          this.ngxSpinner.hide(SpinnerTypeName.BallAtom)
    }

       



  private async loginAction(result: SingleResponseData<Token>, callbackFn?:() => void):Promise<SingleResponseData<Token>> {
        if (result.success) {
          localStorage.setItem("accessToken", result.data.accessToken);
          localStorage.setItem("refreshToken", result.data.refreshToken)
          this.toastService.toastInit(result.message, "Başarılı giriş işlemi", {
              messageType:ToastMessageType.Success,
              position:ToastPosition.TopRight,
            
            })

        }
        else {
            this.toastService.toastInit(result.message, "Başarısız giriş işlemi", {
              messageType:ToastMessageType.Error,
              position:ToastPosition.TopRight,
            
            })
        }
        this.authenticationService.identityCheck();
        callbackFn()
        return result;
  }

   
     
}
