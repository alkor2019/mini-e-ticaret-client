import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
     urls = [
        {path:'/admin', display:'Dashboard'},
        {path:'products', display:'Product'},
        {path:'categories', display:'Category'},
        {path:'orders', display:'Order'},
        {path:'customers', display:'Customer'}

     ]
}
