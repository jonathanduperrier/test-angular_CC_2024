import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EncryptService } from '@app/services/auth/encrypt.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private encrypt: EncryptService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string | null = this.getToken();

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(cloned).pipe(
        catchError(error => {
          // Handle errors here
          console.error('Error in request:', error);
          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }

  private getToken(): string | null {
    let token = this.encrypt.decrypt(localStorage.getItem('token'));
    if (token) {
      let objToken = JSON.parse(token);
      return objToken.accessToken;
    }
    return null;
  }
}
