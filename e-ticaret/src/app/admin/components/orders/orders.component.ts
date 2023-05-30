import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypeName } from 'src/app/base/base.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BaseComponent implements OnInit {
      
      constructor(ngxSpinnerService:NgxSpinnerService) {
        super(ngxSpinnerService);
        
      }
      ngOnInit(): void {
          this.showNgxSpinner(SpinnerTypeName.BallAtom)
      }
}
