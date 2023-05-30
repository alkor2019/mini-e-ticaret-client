import { Injectable } from '@angular/core';
declare var alertify:any
@Injectable({
  providedIn: 'root'
})
export class CustomAlertifyService {

  constructor() { }
  notify(message:string, options:Partial<AlertifyOptions>){
        alertify.set("notifier", 'position', options.position);
        alertify.set("notifier", 'delay', options.delay)
        let msj = alertify[options.messageType](message)
        if(options.dismissOther)
          msj.dismissOthers();
  }
   dismissAll() {
       alertify.dismissAll();
   }
}

export class AlertifyOptions
{
      messageType:AlertifyMessageType = AlertifyMessageType.Message;
      position:AlertifyPosition = AlertifyPosition.TopCenter;
      delay:number = 3;
      dismissOther:boolean = false;
}
export enum AlertifyMessageType
{
      Error="error",
      Success ="success",
      Warning = "warning",
      Notify = "notify",
      Message = "message"
}

export enum AlertifyPosition
{
    TopCenter = "top-center",
    TopLeft = "top-left",
    TopRight = "top-right",
    BottomCenter = "bottom-center",
    BottomLeft = "bottom-left",
    BottomRight = "bottom-right"
}