import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient, @Inject("baseUrl") private baseUrl:string) { }
   private url(requestParamerter:Partial<RequestParamerters>):string
   {
        return  `${requestParamerter.baseUrl ? requestParamerter.baseUrl : this.baseUrl}/${requestParamerter.controller}${requestParamerter.action ? `/${requestParamerter.action}`: ""}`;

   }

  get<T>(requestParamerter:Partial<RequestParamerters>, id?:number):Observable<T>
  {
       let url = "";
       url = requestParamerter.fullEndPoint ? requestParamerter.fullEndPoint : `${this.url(requestParamerter)}${id ? `/${id}` : ""}${requestParamerter.queryString ? `?${requestParamerter.queryString}` :""}`

       return this.httpClient.get<T>(url, {headers: requestParamerter.headers, responseType: requestParamerter.responseType as 'json' })
  }

  post<T>(requestParamerter:Partial<RequestParamerters>, body:Partial<T>):Observable<T>
  {
    let url = "";
    url = requestParamerter.fullEndPoint ? requestParamerter.fullEndPoint : `${this.url(requestParamerter)}${requestParamerter.queryString ? `?${requestParamerter.queryString}` :""}`
    return this.httpClient.post<T>(url, body, {headers:requestParamerter.headers})
  }

  put<T>(requestParamerter:Partial<RequestParamerters>, body:Partial<T>):Observable<T>
  {
    let url = "";
    url = requestParamerter.fullEndPoint ? requestParamerter.fullEndPoint : `${this.url(requestParamerter)}${requestParamerter.queryString ? `?${requestParamerter.queryString}` :""}`
    return this.httpClient.put<T>(url, body, {headers:requestParamerter.headers})
  }
  
  delete<T>(requestParamerter:Partial<RequestParamerters>, id:number):Observable<T>
  {
    let url = "";
    url = requestParamerter.fullEndPoint ? requestParamerter.fullEndPoint 
    : `${this.url(requestParamerter)}/${id}`
  
    return this.httpClient.delete<T>(url, {headers:requestParamerter.headers})
  }
}


export class RequestParamerters {
    controller?:string;
    action?:string;
    headers?:HttpHeaders;
    queryString?:string;
    baseUrl?:string;
    fullEndPoint?:string
    responseType?: string = 'json';
}