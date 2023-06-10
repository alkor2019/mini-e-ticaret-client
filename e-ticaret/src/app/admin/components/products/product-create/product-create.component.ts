import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypeName } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { AlertifyMessageType, AlertifyPosition, CustomAlertifyService } from 'src/app/services/admin/custom-alertify.service';
import { ProductService } from 'src/app/services/admin/models/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent extends BaseComponent{
       @Output() createdProduct: EventEmitter<Product> = new EventEmitter();
       constructor(
        spinner:NgxSpinnerService,
        private productService:ProductService,
        private alertify:CustomAlertifyService
        ) {
        super(spinner);
        
       }


       async create(name:HTMLInputElement, categoryId:HTMLInputElement, price:HTMLInputElement, unitsInStock:HTMLInputElement){
             let product = new Product();
             product.name =name.value;
             product.categoryId = Number(categoryId.value);
             product.price = Number(price.value);
             product.unitsInStock = Number(unitsInStock.value);
           
             this.showNgxSpinner(SpinnerTypeName.BallAtom)
            this.productService.create(product, ()=>{
                    this.hideNgxSpinner(SpinnerTypeName.BallAtom);
                    this.alertify.notify("Ürün başarıyla eklenmiştir", {
                      messageType:AlertifyMessageType.Success,
                      dismissOther:true,
                      position:AlertifyPosition.TopRight
                   })
                   this.createdProduct.emit();
            }, (error) => {
                   this.hideNgxSpinner(SpinnerTypeName.BallAtom);
                   this.alertify.notify(error, {
                      messageType:AlertifyMessageType.Error,
                      dismissOther:true,
                      position:AlertifyPosition.TopRight
                   })
            })
              
       }      

}
