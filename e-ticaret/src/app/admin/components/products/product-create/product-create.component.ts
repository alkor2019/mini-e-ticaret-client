import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypeName } from 'src/app/base/base.component';
import { CategoryList } from 'src/app/contracts/categories/category-list';
import { Product } from 'src/app/contracts/product';
import { AlertifyMessageType, AlertifyPosition, CustomAlertifyService } from 'src/app/services/admin/custom-alertify.service';
import { CategoryService } from 'src/app/services/admin/models/category.service';
import { ProductService } from 'src/app/services/admin/models/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent extends BaseComponent implements OnInit{
       @Output() createdProduct: EventEmitter<Product> = new EventEmitter();

       categories:CategoryList[]

       constructor(
        spinner:NgxSpinnerService,
        private productService:ProductService,
        private categoryService:CategoryService,
        private alertify:CustomAlertifyService
        ) {
        super(spinner);

       }

      async ngOnInit() {
            this.categories = await this.categoryService.getCategories();

       }



        create(name:HTMLInputElement, slctCategory:any, price:HTMLInputElement, unitsInStock:HTMLInputElement){
             let product = new Product();
             product.name =name.value;
             product.categoryId = Number(slctCategory._value);
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
