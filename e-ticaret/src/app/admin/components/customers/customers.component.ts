import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypeName } from 'src/app/base/base.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent  extends BaseComponent implements OnInit{

    constructor(ngxSpinnerService:NgxSpinnerService) {
      super(ngxSpinnerService);
      
    }
    ngOnInit(): void {
        this.showNgxSpinner(SpinnerTypeName.BallAtom)
    }
}
