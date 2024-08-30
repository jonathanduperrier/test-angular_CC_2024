import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private encrypt: EncryptService) {}

  isAuthenticated(): boolean {
    const token = this.encrypt.decrypt(localStorage.getItem('token'));
    // Ajoutez ici la logique pour vérifier la validité du token
    return token ? !this.isTokenExpired(token) : false;
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: any = jwtDecode(token);
    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate ? expirationDate < new Date() : false;
  }

  login(token: string): void {
    localStorage.setItem('token', this.encrypt.encrypt(token));
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
