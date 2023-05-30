import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypeName } from 'src/app/base/base.component';
import { AlertifyMessageType, AlertifyPosition, CustomAlertifyService } from 'src/app/services/admin/custom-alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit{
  constructor(ngxSpinnerService:NgxSpinnerService) {
    super(ngxSpinnerService);
    
  }
  ngOnInit(): void {
      this.showNgxSpinner(SpinnerTypeName.BallAtom)
  }
          
}
