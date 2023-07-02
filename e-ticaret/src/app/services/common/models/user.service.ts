import { SocialUser } from '@abacritt/angularx-social-login';
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
}
