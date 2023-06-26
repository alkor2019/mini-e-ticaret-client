import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';

const routes: Routes = [
    {
       path:'admin', component:LayoutComponent, children:[
          {path:'', component:DashboardComponent},
          {path:'products', loadChildren:()=> import('./admin/components/products/products.module').then(module => module.ProductsModule)},
          {path:'categories', loadChildren:()=> import('./admin/components/categories/categories.module').then(module => module.CategoriesModule)},
          {path:'orders', loadChildren:()=> import('./admin/components/orders/orders.module').then(module => module.OrdersModule)},
          {path:'customers', loadChildren:()=> import('./admin/components/customers/customers.module').then(module => module.CustomersModule)},
       ]
    },

    {
        path:'auth', component:AuthLayoutComponent, children:[
            {path:'login', loadChildren:()=> import('./auth/components/login/login.module').then(module => module.LoginModule)},
            {path:'register', loadChildren:()=> import('./auth/components/register/register.module').then(module => module.RegisterModule)},
        ]
    },


    {path:'', component:HomeComponent},
    {path:'products', loadChildren:()=> import('./ui/components/products/products.module').then(module => module.ProductsModule)},
    {path:'baskets', loadChildren:()=> import('./ui/components/baskets/baskets.module').then(module => module.BasketsModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
