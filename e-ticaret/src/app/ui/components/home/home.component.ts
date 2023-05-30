import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypeName } from 'src/app/base/base.component';
import { CustomToastrService, ToastMessageType, ToastPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit{
            constructor(ngxSpinnerService:NgxSpinnerService) {
            super(ngxSpinnerService);
            
            }
      ngOnInit(): void {
            this.showNgxSpinner(SpinnerTypeName.BallClimbingDot);
      }
}
