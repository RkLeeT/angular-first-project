import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {
  
  constructor(private injector: Injector) { }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message || "Server Error");
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authService = this.injector.get(AuthService)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authService.getToken()}`,
    });

    const clone = req.clone({
      headers: headers
    });

    return next.handle(clone)
    .pipe(
      catchError(this.errorHandler)
    );

  }
  
  
}
