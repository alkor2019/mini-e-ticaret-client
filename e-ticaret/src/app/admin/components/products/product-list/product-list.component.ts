import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypeName } from 'src/app/base/base.component';
import { ProductList } from 'src/app/contracts/product-list';
import { AlertifyMessageType, AlertifyPosition, CustomAlertifyService } from 'src/app/services/admin/custom-alertify.service';
import { ProductService } from 'src/app/services/admin/models/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseComponent implements OnInit{
  displayedColumns: string[] = ['name', 'price', 'unitsInStock', 'categoryId'];
  dataSource : MatTableDataSource<ProductList> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService:ProductService,
    spinner:NgxSpinnerService,
    private alertify:CustomAlertifyService
  ) {
    super(spinner)
  }
  async ngOnInit() {
      await this.getProducts()
  }

  async getProducts()  {
        this.showNgxSpinner(SpinnerTypeName.BallAtom)
        let page = this.paginator ? this.paginator.pageIndex : 0;
        let size = this.paginator ? this.paginator.pageSize : 5;
       const data = await this.productService.getProducts(page, size, () => {
          // Success function 
          this.hideNgxSpinner(SpinnerTypeName.BallAtom);
       }, (errorMessage)=> {
             this.alertify.notify(errorMessage, {
               messageType:AlertifyMessageType.Error,
               position:AlertifyPosition.TopRight,
               dismissOther:true
             });
             this.hideNgxSpinner(SpinnerTypeName.BallAtom);
       })

       this.dataSource = new MatTableDataSource<ProductList>(data.products)
       this.paginator.length = data.totalCount;
   }

   async pageChanged()
   {
      await  this.getProducts();
   }

}
