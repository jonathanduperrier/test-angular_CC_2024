import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONNEMENT } from '@environments/environment';
import { User } from '@app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccessDbService {
  private jsonUrl:string = 'assets/db.json';
  private userUrl:string = ENVIRONNEMENT.baseUrl + ENVIRONNEMENT.urls.users;

  constructor(private http: HttpClient) { }

  public getData(): Observable<any>{
    return this.http.get<any>(this.jsonUrl);
  }

  public addUser(user:User){
    return this.http.post<User>(this.userUrl, user);
  }

}
