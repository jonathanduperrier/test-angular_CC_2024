import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONNEMENT } from '@environments/environment';
import { Router } from '@angular/router';
import { EncryptService } from '@app/services/auth/encrypt.service';
import { User } from '@app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccessDbService {
  private jsonUrl:string = 'assets/db.json';
  private loginURL:string = ENVIRONNEMENT.baseUrl + ENVIRONNEMENT.urls.login;
  private registerUrl:string = ENVIRONNEMENT.baseUrl + ENVIRONNEMENT.urls.register;
  private transactionsUrl:string = ENVIRONNEMENT.baseUrl + ENVIRONNEMENT.urls.transactions;

  constructor(
    private http: HttpClient,
    private router: Router,
    private encrypt: EncryptService,
  ) { }

  public getData(): Observable<any>{
    return this.http.get<any>(this.jsonUrl);
  }

  public loginUser(user:any){
    this.http.post<any>(this.loginURL, user).subscribe(
      (returnValue) => {
        localStorage.setItem('token', this.encrypt.encrypt(JSON.stringify(returnValue)));
        this.router.navigate(['/user']);
      }
    );
  }

  public addUser(user:any){
    return this.http.post<any>(this.registerUrl, user).subscribe(
      (returnValue) => {
        this.router.navigate(['/login']);
      }
    );
  }
  
}
