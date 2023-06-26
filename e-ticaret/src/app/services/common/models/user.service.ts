import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ResponseModel } from 'src/app/contracts/responses/response';
import { UserLogin } from 'src/app/contracts/users/user-login';
import { User } from 'src/app/contracts/users/user-register';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
     private httpClientService:HttpClientService
  ) { }

   async createUser(user:User):Promise<ResponseModel>
   {
        const result : Observable<ResponseModel | User> = this.httpClientService.post<ResponseModel | User>({
          controller:'Users'
        }, user)
          
      var data = await firstValueFrom(result);
 
      return data as ResponseModel;
   }

   async login(login:UserLogin):Promise<ResponseModel>
   {
        const result : Observable<ResponseModel | User> = this.httpClientService.post<ResponseModel | User>({
          controller:'Users',
          action:'Login'
        }, login)

        var data = await firstValueFrom(result);
    
        return data as ResponseModel;
   }
}
