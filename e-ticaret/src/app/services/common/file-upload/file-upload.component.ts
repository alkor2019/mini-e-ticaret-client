import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { AlertifyMessageType, AlertifyPosition, CustomAlertifyService } from '../../admin/custom-alertify.service';
import { CustomToastrService, ToastMessageType, ToastPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  
  public files: NgxFileDropEntry[];
  private formData:FormData
  @Input() options:Partial<FileUploadOptions>;
  constructor(
    private httpClienService:HttpClientService,
    private alertify:CustomAlertifyService,
    private toastr:CustomToastrService,
    private dialogService:DialogService
  ) {
    
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.formData = new FormData()
    for (const file of files) {

         (file.fileEntry as FileSystemFileEntry).file((_file:File) => {
                this.formData.append(_file.name, _file, file.relativePath)
         })
    }
    this.dialogService.openDialog({
      componentType:FileUploadDialogComponent,
      config:{
        data:FileUploadDialogState.Yes,
        width:'500px'
      },
      afterClosedFn:async()=>{
           this.httpClienService.post({
            controller:this.options.controller,
            action:this.options.action,
            queryString:this.options.queryString,
            headers:new HttpHeaders({ "responseType": "blob" })
           }, this.formData)
           .subscribe((result) =>{
            const message: string = "Dosyalar başarıyla yüklenmiştir.";

           
            if (this.options.isAdminPage) {
              this.alertify.notify(message,
                {
                  dismissOther: true,
                  messageType: AlertifyMessageType.Success,
                  position: AlertifyPosition.TopRight
                })
            } else {
              this.toastr.toastInit(message, "Başarılı.", {
                messageType: ToastMessageType.Success,
                position: ToastPosition.TopRight
              })
            }
            
           }, (errorResponse:HttpErrorResponse) => {
           const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";
            if (this.options.isAdminPage) {
              this.alertify.notify(message,
                {
                  dismissOther: true,
                  messageType: AlertifyMessageType.Error,
                  position: AlertifyPosition.TopRight
                })
            } else {
              this.toastr.toastInit(message, "Başarılı.", {
                messageType: ToastMessageType.Error,
                position: ToastPosition.TopRight
              })
            }
           })
      }
 })
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
}

export class FileUploadOptions {
    controller?:string;
    action?:string;
    queryString?:string;
    explanation?: string;
    accept?: string;
    isAdminPage?: boolean = false;
}