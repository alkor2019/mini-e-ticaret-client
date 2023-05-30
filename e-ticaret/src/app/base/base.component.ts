import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
     
       constructor(private ngxSpinner: NgxSpinnerService) {}
       showNgxSpinner(spinnerTypeName:SpinnerTypeName = SpinnerTypeName.BallAtom, delay:number=1500)
       {
             this.ngxSpinner.show(spinnerTypeName);
             setTimeout(() => {
              this.ngxSpinner.hide(spinnerTypeName)
             }, delay);
       }
}


export enum SpinnerTypeName{
   BallScaleMultiple ="s1",
   BallClimbingDot = "s2",
   BallAtom = "s3"
}