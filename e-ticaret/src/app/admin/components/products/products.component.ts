import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypeName } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
      
  @ViewChild(ProductListComponent) listComponents: ProductListComponent;

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

     

  createdProduct() {
    this.listComponents.getProducts();
  }
}
