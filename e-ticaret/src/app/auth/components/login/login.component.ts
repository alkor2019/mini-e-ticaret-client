import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/contracts/users/user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
    loginModel:UserLogin
    constructor() {
   
      
    }
    ngOnInit(): void {
      
    }

     login()
    {
      $event.preventDefault();
        console.log() 
        
    }
}
