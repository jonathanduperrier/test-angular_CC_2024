import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { jwtDecode } from "jwt-decode";
import { DomSanitizer, SafeHtml, SafeScript } from '@angular/platform-browser';
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
  public lastName:string = '';
  public firstName:string = '';
  public eMail:string = '';
  public SafeHtmlUserInfo!: SafeHtml;

  constructor(private router: Router, private encrypt: EncryptService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.token = this.encrypt.decrypt(localStorage.getItem('token'));
    this.objToken = JSON.parse(this.token);
    this.decodedToken = jwtDecode(this.token);
    this.firstName = this.objToken.user.first;
    this.lastName = this.objToken.user.last;
    this.eMail = this.decodedToken.email;

    this.SafeHtmlUserInfo = this.sanitizer.bypassSecurityTrustHtml('\
    <ul>\
    <li><strong>Nom : </strong>\
    '+ this.lastName +'</li>\
    <li><strong>Prénom : </strong>\
    '+ this.firstName +'</li>\
    <li><strong>E-Mail : </strong>\
    '+ this.eMail +'</li>\
    </ul>');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

