import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom, Observable } from 'rxjs';
import { SpinnerTypeName } from 'src/app/base/base.component';
import { ResponseModel } from 'src/app/contracts/responses/response';
import { SingleResponseData } from 'src/app/contracts/responses/single-response-data';
import {  Token } from 'src/app/contracts/users/token';
import { UserLogin } from 'src/app/contracts/users/user-login';
import { User } from 'src/app/contracts/users/user-register';
import { CustomToastrService, ToastMessageType, ToastPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
     private httpClientService:HttpClientService,
     private toastService:CustomToastrService,
     private ngxSpinner:NgxSpinnerService,
     
  ) { }

   async createUser(user:User):Promise<ResponseModel>
   {
        const result : Observable<ResponseModel | User> = this.httpClientService.post<ResponseModel | User>({
          controller:'Users'
        }, user)
          
      var data = await firstValueFrom(result);
 
      return data as ResponseModel;
   }

   async login(user:UserLogin, callbackFn?:() => void):Promise<void>
   {
        this.ngxSpinner.show(SpinnerTypeName.BallAtom)
        const response : Observable<SingleResponseData<Token> | UserLogin> = this.httpClientService.post<SingleResponseData<Token> | UserLogin>({
          controller:'Users',
          action:'Login'
        }, user)

        var result = await firstValueFrom(response) as SingleResponseData<Token>;
  
        if(result.success)
         {
             localStorage.setItem("accessToken", result.data.accessToken)  
              
             this.toastService.toastInit(result.message, "Giriş İşlemi", {
                 messageType:ToastMessageType.Success,
                 position:ToastPosition.BottomRight
             })
        
             
         }
         else{
            this.toastService.toastInit(result.message, "Giriş İşlemi", {
              messageType:ToastMessageType.Warning,
              position:ToastPosition.BottomRight
              })
         }
        
          callbackFn();
          this.ngxSpinner.hide(SpinnerTypeName.BallAtom)
   }
}
