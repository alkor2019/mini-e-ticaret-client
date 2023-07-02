import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/app/contracts/users/user-login';
import { AuthService } from 'src/app/services/common/auth.service';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
    loginModel:UserLogin
    loginForm:FormGroup

    
    constructor(
      private userService:UserService,
      private authenticationService:AuthenticationService,
      private authService:AuthService,
     private activatedRoute:ActivatedRoute,
     private router:Router,
     private socialAuthService: SocialAuthService,
     private formBuilder:FormBuilder
    ) {
      this.socialAuthService.authState.subscribe(async(user:SocialUser) => {
        
          if(user != null)
          { 
           
              await  this.authService.externalLogin(user, 
                () => socialAuthService.signOut(), 
                () =>  this.checkAuthAndReturnUrl())
            
          }
   })
      
    }
    ngOnInit(): void {
      this.loginFormInit()
    }

    loginFormInit(){
         this.loginForm = this.formBuilder.group({
              userNameOrEmail:["", [Validators.required]],
              password:["", 
              [Validators.required,
              Validators.minLength(3)]
            ]
         })
    }

    async login(user:UserLogin)
    {
        await this.authService.internalLogin(user, () => this.checkAuthAndReturnUrl());
    }

    facebookLogin = ()=> this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);


  private checkAuthAndReturnUrl() {
    this.authenticationService.identityCheck();
    this.activatedRoute.queryParams.subscribe(params => {
      const returnUrl: string = params["returnUrl"];
      if (returnUrl)
        this.router.navigate([returnUrl]);

      else
        this.router.navigate([""]);
    });
  }
}
