import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { ProductList } from 'src/app/contracts/product-list';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/contracts/product';
import { ProductImage } from 'src/app/contracts/product-image';
import { Observable, firstValueFrom } from 'rxjs';
import { ResponseModel } from 'src/app/contracts/responses/response';
import { MultipleResponseData } from 'src/app/contracts/responses/multiple-response-data';
import { SingleResponseData } from 'src/app/contracts/responses/single-response-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClientService:HttpClientService
  ) { }

     async create(product:Product, successCbFn?:(message?:string)=>void, errorCbFn?:(errorMessage:string) => void):Promise<void>
    {
         
        const response:Observable<ResponseModel | Product>  =  this.httpClientService.post<ResponseModel | Product> ({
             controller:"Products"
          }, product)
          

          const result =  await firstValueFrom(response) as ResponseModel
          if(result.success)
          {
               successCbFn && successCbFn(result.message);
          }
          else{
              errorCbFn && errorCbFn(result.message)
          }
    }

    async getProducts(page:number= 0, size:number = 5, successCbFn?:(message?:string)=>void, errorCbFn?:(errorMessage:string)=> void): Promise<SingleResponseData<ProductList>>
    {
         const response: Observable<SingleResponseData<ProductList>> = this.httpClientService.get<SingleResponseData<ProductList>>({
              controller:"Products",
              queryString:`Page=${page}&Size=${size}`
         });

         const result = await firstValueFrom(response) as SingleResponseData<ProductList>
         if(result. success)
         {
             successCbFn &&  successCbFn(result.message)
             return result;
         }
         else {
              errorCbFn && errorCbFn(result.message)
              return result;
         }
    }

    async readFile(id:number):Promise<MultipleResponseData<ProductImage>>
    {
         const response:Observable<MultipleResponseData<ProductImage>> =
          this.httpClientService.get<MultipleResponseData<ProductImage>>({
              controller:"Products",
              action:"GetProductImages"
          }, id);

          return await firstValueFrom(response)
    }

    async deleteFile(id:number, imageId:number, successCbFn?:(message?:string)=> void, errorCbFn?:(message?:string)=> void):Promise<void>
    {
        const response:Observable<ResponseModel> = this.httpClientService.delete<ResponseModel>({
           controller:"Products",
           action:"DeleteProductImage",
           queryString:`ImageId=${imageId}`
         }, id)

        const result = await firstValueFrom(response);
        result.success ? (successCbFn && successCbFn(result.message)) : (errorCbFn && errorCbFn(result.message))
    }
}
