import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypeName } from 'src/app/base/base.component';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit{
        constructor(ngxSpinnerService:NgxSpinnerService) {
          super(ngxSpinnerService);
          
        }
      ngOnInit(): void {
           this.showNgxSpinner(SpinnerTypeName.BallClimbingDot);
      }

}
