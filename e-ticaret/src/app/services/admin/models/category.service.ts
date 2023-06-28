import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Category } from 'src/app/contracts/categories/category';
import { HttpErrorResponse } from '@angular/common/http';
import { MultipleResponseData } from 'src/app/contracts/responses/multiple-response-data';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
     private httpClientService:HttpClientService
  ) { }

  async getCategories():Promise<MultipleResponseData<Category>>
  {
      const categories:Observable<MultipleResponseData<Category>> = this.httpClientService.get<MultipleResponseData<Category>>({
         controller:"Categories"
      })

     return await firstValueFrom(categories);
  }
}
