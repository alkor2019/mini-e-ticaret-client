import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog:MatDialog
  ) { }
  openDialog(options:Partial<DialogParamerters>):void
  {
      const dialogRef =  this.dialog.open(options.componentType, options.config)
      dialogRef.afterClosed().subscribe((result) =>{
          if(result == options.config.data)
              options.afterClosedFn();
      })
  }
}

export class DialogParamerters
{
     componentType:ComponentType<any>;
     config?:MatDialogConfig<any>
     afterClosedFn:()=>void;
}
