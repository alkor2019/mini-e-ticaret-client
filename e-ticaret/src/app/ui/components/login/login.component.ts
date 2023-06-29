import {SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/app/contracts/users/user-login';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
    loginModel:UserLogin
    constructor(
      private userService:UserService,
      private authService:AuthService,
     private activatedRoute:ActivatedRoute,
     private router:Router,
     private socialAuthService: SocialAuthService
    ) {
      this.socialAuthService.authState.subscribe(async(user:SocialUser) => {
        if(user)
            await  this.userService.googleLogin(user, () => { this.checkAuthAndReturnUrl();} )
   })
      
    }
    ngOnInit(): void {
      
    }



     async login(userNameOrEmail:string, password:string)
    {
          const user:UserLogin  = {userNameOrEmail, password}
          await this.userService.login(user, () => {
            this.checkAuthAndReturnUrl();
          })
    }

  private checkAuthAndReturnUrl() {
    this.authService.identityCheck();
    this.activatedRoute.queryParams.subscribe(params => {
      const returnUrl: string = params["returnUrl"];
      if (returnUrl)
        this.router.navigate([returnUrl]);

      else
        this.router.navigate([""]);
    });
  }
}