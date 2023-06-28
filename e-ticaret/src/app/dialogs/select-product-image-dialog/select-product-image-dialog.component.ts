import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/admin/models/product.service';
import { ProductImage } from 'src/app/contracts/product-image';
import { AlertifyMessageType, AlertifyPosition, CustomAlertifyService } from 'src/app/services/admin/custom-alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypeName } from 'src/app/base/base.component';
import { MatGridTile } from '@angular/material/grid-list';

declare let $:any;


@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit{

       @Output() options:Partial<FileUploadOptions> = {
           accept:".jpg, .jpeg, .png, .gif",
           controller:"Products",
           action:"Upload",
           explanation:"Resimleri sürükleyin veya seçin...",
           queryString:`Id=${this.data}`,
           isAdminPage:true
       }

       url:string
       images:ProductImage[]

      constructor(
        @Inject("baseUrl") private  baseUrl:string,
        private productService:ProductService,
        private alertify:CustomAlertifyService,
        private dialogService:DialogService,
        private ngxSpinner:NgxSpinnerService,
        dialogRef:MatDialogRef<SelectProductImageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,

        ) {
        super(dialogRef);

      }

      async ngOnInit(): Promise<void> {
            this.images = await (await this.productService.readFile(this.data as number)).data
          
            this.url = this.baseUrl.replace("/api", "/")

       }

       async deleteImage(imageId:number, cardElement:any)
       {
           

            this.dialogService.openDialog({
                 componentType:DeleteDialogComponent,
                 config:{
                     data:DeleteState.Yes
                 },
                 afterClosedFn:async () =>{
                  this.ngxSpinner.show(SpinnerTypeName.BallAtom)
                  await this.productService.deleteFile(this.data as number, imageId, (message) =>{
                          this.ngxSpinner.hide(SpinnerTypeName.BallAtom)
                          $(cardElement._element.nativeElement).fadeOut(900, ()=> {
                            this.alertify.notify(message, {
                              messageType:AlertifyMessageType.Warning,
                              dismissOther:true,
                              position:AlertifyPosition.TopRight
                            })
                          })

                    })
                 }
            })

       }



}


export enum SelectProductImageState
{
   Close
}
