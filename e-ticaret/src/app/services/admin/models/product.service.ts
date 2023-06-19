import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { ProductList } from 'src/app/contracts/product-list';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/contracts/product';
import { ProductImageList } from 'src/app/contracts/product-image-list';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClientService:HttpClientService
  ) { }

     create(product:Product, successCbFn?:()=>void, errorCbFn?:(errorMessage:string) => void)
    {
          this.httpClientService.post({
             controller:"Products"
          }, product)
          .subscribe((result) => {
                successCbFn();
          }, (errorResponse:HttpErrorResponse) =>{
            const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
            let message = "";
            _error.forEach((v, index) => {
              v.value.forEach((_v, _index) => {
                message += `${_v}<hr/>`;
              });
            });
                errorCbFn(message)
          })
    }

    async getProducts(page:number= 0, size:number = 5, successCbFn?:()=>void, errorCbFn?:(errorMessage:string)=> void): Promise<{totalCount:number; products:ProductList[]}>
    {
         const promiseData: Promise<{totalCount:number; products:ProductList[]}>  =  this.httpClientService.get
        <{totalCount:number; products:ProductList[]}>({
              controller:"Products",
              queryString:`Page=${page}&Size=${size}`
         }).toPromise()

         promiseData.then(() => {
              successCbFn();
         })
         .catch((errorResponse:HttpErrorResponse)=> {
                errorCbFn(errorResponse.message)
         })

        return await  promiseData
    }

    async readFile(id:number):Promise<ProductImageList[]>
    {
         const data:Observable<ProductImageList[]> =
          this.httpClientService.get<ProductImageList[]>({
              controller:"Products",
              action:"GetProductImages"
          }, id);

          return await firstValueFrom(data)
    }

    async deleteFile(id:number, imageId:number, successCbFn?:()=> void)
    {
        const deletedObservable =this.httpClientService.delete({
           controller:"Products",
           action:"DeleteProductImage",
           queryString:`ImageId=${imageId}`
         }, id)

         await firstValueFrom(deletedObservable);
         successCbFn();
    }
}
