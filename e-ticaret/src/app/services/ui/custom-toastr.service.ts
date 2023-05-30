import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastrService:ToastrService) { }

   toastInit(message:string, title:string, options:Partial<ToastOptions>)
   {
        this.toastrService[options.messageType](message, title, {
           positionClass:options.position
        })
   }

}
export class ToastOptions
{
    messageType:ToastMessageType = ToastMessageType.Info;
    position:ToastPosition = ToastPosition.TopCenter;
}
export enum ToastMessageType
{
    Info = "info",
    Success = "success",
    Warning = "warning",
    Error = "error"
}

export enum ToastPosition
{
     TopCenter = "toast-top-center",
     TopLeft = "toast-top-left",
     TopRight = "toast-top-right",
     BottomCenter = "toast-bottom-center",
     BottomLeft = "toast-bottom-left",
     BottomRight = "toast-bottom-right",
     TopFullWidth = "toast-full-width",
     BottomFullWidth = "toast-full-width"
}