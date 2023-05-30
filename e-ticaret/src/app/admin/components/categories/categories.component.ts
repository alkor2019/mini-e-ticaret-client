import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypeName } from 'src/app/base/base.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BaseComponent implements OnInit {
       
        constructor(ngxSpinner:NgxSpinnerService) {
          super(ngxSpinner);
          
        }
        ngOnInit(): void {
           this.showNgxSpinner(SpinnerTypeName.BallAtom)
        }
}
