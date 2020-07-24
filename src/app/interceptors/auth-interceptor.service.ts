import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { PagesService } from '../pages/pages.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const OAuth = this.injector.get(PagesService);
    const token = OAuth.obtenerToken();

    let reqClone = req;
    if (req.url === environment.apiToken) {
      reqClone = req.clone({
        setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new HttpParams()
          .set('grant_type', environment.grant_type)
          .set('client_id', environment.client_id)
          .set('client_secret', environment.client_secret)
      });
    } else {
      reqClone = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(reqClone).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          OAuth.updateToken();
          setTimeout(() => {
            // that.messageSuccess = false;
          }, 5000);
          this.router.navigateByUrl('home');
        }
        console.log('Sucedio un error');
        // console.log('Resgistrado en el log file');
        return throwError( err );
      })
    );

  }
}
