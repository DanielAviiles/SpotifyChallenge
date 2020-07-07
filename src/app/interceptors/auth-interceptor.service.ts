import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PagesService } from '../pages/pages.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const OAuth = this.injector.get(PagesService);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const reqClone = req.clone({
      headers,
      setHeaders: {
        authorization: `Bearer ${ OAuth.getToken() }`
      }
    });
    /* return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    ); */

    return next.handle(reqClone).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/home');
        }
        console.log('Sucedio un error');
        console.log('Resgistrado en el log file');
        console.warn(err);
        return throwError( err );
      })
    );
  }

  /* manejarError(error: HttpErrorResponse) {
    console.log('Sucedio un error');
    console.log('Resgistrado en el log file');
    console.warn(error);
    return throwError('Error Personalizado');
  } */
}
