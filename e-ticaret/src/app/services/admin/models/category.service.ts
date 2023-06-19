import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { CategoryList } from 'src/app/contracts/categories/category-list';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
     private httpClientService:HttpClientService
  ) { }

  async getCategories():Promise<CategoryList[]>
  {
      const categories:Observable<CategoryList[]> = this.httpClientService.get<CategoryList[]>({
         controller:"Categories"
      })

     return await firstValueFrom(categories);
  }
}
