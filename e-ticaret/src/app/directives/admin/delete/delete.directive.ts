import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyMessageType, AlertifyPosition, CustomAlertifyService } from 'src/app/services/admin/custom-alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
declare let $:any;
@Directive({
  selector: '[appDelete]'
})



export class DeleteDirective {
 
  constructor(
    private elementRef : ElementRef,
    private _renderer : Renderer2,
    private httClientService:HttpClientService,
    private alertify:CustomAlertifyService,
    private dialogService:DialogService
  ) { 
       const img = this._renderer.createElement('img');
       img.setAttribute('src', "../../../../../assets/delete.png");
       img.setAttribute('style', "cursor:pointer");
       img.width= 25;
       img.height= 25;
       this._renderer.appendChild(elementRef.nativeElement, img);
  }
  @Input() id : number;
  @Input() controller:string;
  @Output() callback:EventEmitter<any> = new EventEmitter();
  @HostListener('click')
  async onClick()
  {
      this.dialogService.openDialog({
          componentType:DeleteDialogComponent,
          config:{
             data:DeleteState.Yes
          },
          afterClosedFn:() => {
               // Deleted Action Start
               const td :HTMLTableCellElement =this.elementRef.nativeElement;
 
                this.httClientService.delete({
                  controller:this.controller
                }, this.id)
                .subscribe((result) =>{
                  $(td.parentElement).animate({
                    opacity: 0,
                    left: "+=50",
                    height: "toogle"
                  }, 700, () =>{
                        this.callback.emit();
                        this.alertify.notify("Başarıyla silinmiştir", {
                          messageType:AlertifyMessageType.Success,
                          position:AlertifyPosition.TopRight,
                          dismissOther:true
                        })
                  })
                    
                }, (errorResponse:HttpErrorResponse) =>{
                  this.alertify.notify("Ürün silinirken bir hata oluştu", {
                    messageType:AlertifyMessageType.Error,
                    position:AlertifyPosition.TopRight,
                    dismissOther:true
                })
                })
               // Deleted Action End
          }
      })
      
  }
}
