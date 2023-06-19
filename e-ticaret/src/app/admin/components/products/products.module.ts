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
import {MatButtonModule} from '@angular/material/button';
import { DeleteDirective } from 'src/app/directives/admin/delete/delete.directive';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    DeleteDirective,
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DialogsModule,
    FileUploadModule,
    MatSelectModule,
    RouterModule.forChild([
      {path:'', component:ProductsComponent}
   ])
  ]
})
export class ProductsModule { }
