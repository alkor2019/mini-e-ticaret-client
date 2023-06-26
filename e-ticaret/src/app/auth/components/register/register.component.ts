import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup,  ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypeName } from 'src/app/base/base.component';
import { User } from 'src/app/contracts/users/user-register';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastMessageType, ToastPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    
     registerForm:UntypedFormGroup

      constructor(
        private formBuilder:UntypedFormBuilder,
        private userService:UserService,
        private toastr:CustomToastrService,
        private ngxService:NgxSpinnerService
      ) {
        
      }
      ngOnInit(): void {
        this.formInit()
      }

      formInit()
      {
           this.registerForm = this.formBuilder.group({
               firstName:["", [
                  Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(50)
               ]],
               lastName:["", [
                  Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(50)
               ]],
               userName:["", [
                  Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(50)
               ]],
               email:["", [
                  Validators.required,
                  Validators.email
               ]],
               password:["", [
                Validators.required,
                Validators.minLength(3)
                ]],
               confirmPassword:["", [
                  Validators.required,
                  Validators.minLength(3)
                  ]],
           },
           {
            validators: this.passwordMatch('password', 'confirmPassword')
          })
           
      }


     async registered(user:User)
      {
         if(this.registerForm.invalid) return;
         this.ngxService.show(SpinnerTypeName.BallAtom);
         const result =   await this.userService.createUser(user)
         console.log(result)
         if(result.succeeded)
          {
            this.ngxService.hide(SpinnerTypeName.BallAtom);
                this.toastr.toastInit(result.message, "Kayıt İşlemi", {
                  messageType:ToastMessageType.Success,
                  position:ToastPosition.TopRight
              })
          }
          else {
            this.ngxService.hide(SpinnerTypeName.BallAtom);
                this.toastr.toastInit(result.message, "Kayıt İşlemi", {
                  messageType:ToastMessageType.Error,
                  position:ToastPosition.TopRight
              })
          }
          
         
      }



   
      // Password Matching
      passwordMatch(password: string, confirmPassword: string): ValidatorFn {
         return (formGroup: AbstractControl): { [key: string]: any } | null => {
           const passwordControl = formGroup.get(password);
           const confirmPasswordControl = formGroup.get(confirmPassword);
     
           if (!passwordControl || !confirmPasswordControl) {
             return null;
           }
     
           if (
             confirmPasswordControl.errors &&
             !confirmPasswordControl.errors.passwordMismatch
           ) {
             return null;
           }
     
           if (passwordControl.value !== confirmPasswordControl.value) {
             confirmPasswordControl.setErrors({ passwordMismatch: true });
             return { passwordMismatch: true };
           } else {
             confirmPasswordControl.setErrors(null);
             return null;
           }
         };
       }


}
