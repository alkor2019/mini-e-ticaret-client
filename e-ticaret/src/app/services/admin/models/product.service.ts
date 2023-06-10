import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { ProductList } from 'src/app/contracts/product-list';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/contracts/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClientService:HttpClientService
  ) { }
    
    async create(product:Product, successCbFn?:()=>void, errorCbFn?:(errorMessage:string) => void)
    {
          this.httpClientService.post({
             controller:"Products"
          }, product)
          .subscribe(() => {
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
}
