import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypeName } from 'src/app/base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{
        constructor(ngxSpinnerService:NgxSpinnerService) {
          super(ngxSpinnerService);
          
        }
        ngOnInit(): void {
            this.showNgxSpinner(SpinnerTypeName.BallClimbingDot);
        }
}
