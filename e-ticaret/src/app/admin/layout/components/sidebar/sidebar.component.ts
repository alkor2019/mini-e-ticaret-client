import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
     urls = [
        {path:'/admin', display:'Dashboard', icon:"space_dashboard"},
        {path:'products', display:'Ürün', icon:'shopping_basket'},
        {path:'categories', display:'Kategori', icon:'shopping_basket'},
        {path:'orders', display:'Sipariş', icon:'shopping_basket'},
        {path:'customers', display:'Müşteri', icon:'shopping_basket'}

     ]
}
