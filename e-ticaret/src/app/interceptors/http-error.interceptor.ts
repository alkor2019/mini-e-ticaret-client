import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastMessageType, ToastPosition } from '../services/ui/custom-toastr.service';
import { AuthService } from '../services/common/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastService:CustomToastrService,
    private authService:AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(errorResponse =>{

         switch (errorResponse.status) {
           case HttpStatusCode.Unauthorized:
                 this.authService.refreshTokenLogin(localStorage.getItem("refreshToken"))
                // this.toastService.toastInit("Bu sayfada işlem yetkiniz bulunmamaktadır.", "Yetkisiz erişim!", {
                //     messageType:ToastMessageType.Warning,
                //     position:ToastPosition.BottomCenter
                // })
             break;
            case HttpStatusCode.InternalServerError:
              this.toastService.toastInit("Sunucu hatası oluştu en kısa sürede çözümlenecektir.", "Sunucu hatası!", {
                messageType:ToastMessageType.Warning,
                position:ToastPosition.BottomCenter
            })
              break;
         
           default:
            this.toastService.toastInit("Bilinmeyen bir hata meydana geldi", "Hata!", {
              messageType:ToastMessageType.Warning,
              position:ToastPosition.BottomCenter
          })
             break;
         }


      return of(errorResponse);
    }));
  }
}
