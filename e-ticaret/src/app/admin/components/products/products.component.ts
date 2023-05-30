import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypeName } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
      constructor(ngxSpinnerService:NgxSpinnerService, private httpClientService: HttpClientService) {
        super(ngxSpinnerService);
        
      }
      ngOnInit(): void {
          this.showNgxSpinner(SpinnerTypeName.BallAtom);
          this.httpClientService.get<Product[]>({
              controller:"Products"
          })
          .subscribe(res => console.log(res))
      }
}
