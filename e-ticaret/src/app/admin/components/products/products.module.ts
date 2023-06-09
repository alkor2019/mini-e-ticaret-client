import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ProductListComponent } from './product-list/product-list.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProductCreateComponent } from './product-create/product-create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild([
      {path:'', component:ProductsComponent}
   ])
  ]
})
export class ProductsModule { }
