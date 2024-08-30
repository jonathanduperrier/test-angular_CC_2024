import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { jwtDecode } from "jwt-decode";
import { EncryptService } from '@app/services/auth/encrypt.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  public token:string = '';
  public objToken:any = [];
  public decodedToken:any = [];

  constructor(private router: Router, private encrypt: EncryptService) {}

  ngOnInit() {
    this.token = this.encrypt.decrypt(localStorage.getItem('token'));
    this.objToken = JSON.parse(this.token);
    this.decodedToken = jwtDecode(this.token);
    console.log("token : ");
    console.log(this.token);
    console.log(this.objToken);
    console.log(this.decodedToken);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

